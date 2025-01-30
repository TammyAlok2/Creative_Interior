"use client";
import React, { useState } from "react";
import { useAddressStore } from "@/stores/addressStore";
import FormSection from "./FormSection";
import Button from "./Button";
import FormField from "./FormField";
import { Checkbox } from "@/components/ui/checkbox";
import { set } from "react-hook-form";
import { AddressSectionProps } from "../../checkout-components/AddressSection";
import CancelButton from "./CancelButton";
import toast from "react-hot-toast";

// interface FormData {
//   name: string;
//   mobileNumber: string;
//   pinCode: string;
//   address: string;
//   locality: string;
//   landmark: string;
//   district: string;
//   city: string;
//   state: string;
//   isDefault: boolean;
// }

// interface ValidationErrors {
//   [key: string]: string;
// }

// interface AddressData {
//   name: string;
//   mobileNumber: number;
//   pinCode: number;
//   address: string;
//   locality: string;
//   landmark?: string;
//   district?: string;
//   city: string;
//   state: string;
//   isDefault: boolean;
//   user?: string; // Add this property
// }

// @ts-ignore
const AddDeliveryAddress = ({ handleSelectPage }) => {
  const { addAddress } = useAddressStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialFormData = {
    name: "",
    mobileNumber: "",
    pinCode: "",
    address: "",
    locality: "",
    landmark: "",
    district: "",
    city: "",
    state: "",
    isDefault: false,
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [errors, setErrors] = useState({});
  // console.log(formData)

  // Handle text input validation
  const handleTextInput = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Handle number input validation
  const handleNumberInput = (field) => (e) => {
    const value = e.target.value;
    if (
      /^\d*$/.test(value) &&
      value.length <= (field === "mobileNumber" ? 10 : 6)
    ) {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "name",
      "mobileNumber",
      "pinCode",
      "address",
      "locality",
      "city",
      "state",
    ];

    requiredFields.forEach((field) => {
      if (typeof formData[field] === "string" && !formData[field].trim())
        newErrors[field] = "This field is required";
    });

    if (formData.name && formData.name.length < 2)
      newErrors.name = "Name must be at least 2 characters long";
    if (formData.mobileNumber && formData.mobileNumber.length !== 10)
      newErrors.mobileNumber = "Mobile number must be exactly 10 digits";
    if (formData.pinCode && formData.pinCode.length !== 6)
      newErrors.pinCode = "PIN code must be exactly 6 digits";
    if (formData.address && formData.address.length < 10)
      newErrors.address = "Address must be at least 10 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validateForm()) return;
    // console.log(formData)
    setIsSubmitting(true);

    try {
      const addressData = {
        ...formData,
        mobileNumber: parseInt(formData.mobileNumber),
        pinCode: parseInt(formData.pinCode),
      };
      // console.log("form data: ", addressData)

      const response = await addAddress(addressData);
      // console.log(response);
      if (response) {
        toast.success("Address added successfully!");
        setFormData(initialFormData);
      }
    } catch (error) {
      // console.error("Error adding address:", error);
      toast.error("Failed to add address. Please try again.");
    } finally {
      setIsSubmitting(false);
      handleSelectPage("address-section");
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-3xl box-shadow border">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 max-[524px]:text-[1.2rem]">
        Add Delivery Address
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSection>
          <FormField
            label="Name"
            value={formData.name}
            onChange={handleTextInput("name")}
            error={errors.name}
            disabled={isSubmitting}
            required
          />

          <div className="grid grid-cols-2 max-[524px]:grid-cols-1 max-[524px]:gap-0 gap-4">
            <FormField
              label="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleNumberInput("mobileNumber")}
              error={errors.mobileNumber}
              disabled={isSubmitting}
              required
            />
            <FormField
              label="Pincode"
              value={formData.pinCode}
              onChange={handleNumberInput("pinCode")}
              error={errors.pinCode}
              disabled={isSubmitting}
              required
            />
          </div>

          <FormField
            label="Address"
            value={formData.address}
            onChange={handleTextInput("address")}
            error={errors.address}
            disabled={isSubmitting}
            required
          />

          <div className="grid grid-cols-2 gap-4 max-[524px]:grid-cols-1 max-[524px]:gap-0">
            <FormField
              label="Locality"
              value={formData.locality}
              onChange={handleTextInput("locality")}
              error={errors.locality}
              disabled={isSubmitting}
              required
            />
            <FormField
              label="Landmark (Optional)"
              value={formData.landmark}
              onChange={handleTextInput("landmark")}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 max-[524px]:grid-cols-1 max-[524px]:gap-0">
            <FormField
              label="City"
              value={formData.city}
              onChange={handleTextInput("city")}
              error={errors.city}
              disabled={isSubmitting}
              required
            />
            {/* <FormField
              label="District (Optional)"
              value={formData.district}
              onChange={handleTextInput("district")}
              disabled={isSubmitting}
            /> */}
            <FormField
              label="State"
              value={formData.state}
              onChange={handleTextInput("state")}
              error={errors.state}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={formData.isDefault}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, isDefault: !!checked }))
              }
              disabled={isSubmitting}
              className="text-white active:bg-medium_primary ml-[.2rem] rounded-[.3rem] w-[1.2rem] h-[1.2rem]"
            />
            <label>Make this my default address</label>
          </div>
        </FormSection>

        <div className="flex justify-between pt-6 border-t gap-6">
          <CancelButton handleSelectPage={handleSelectPage} />
          <Button
            text={isSubmitting ? "Saving..." : "Save Address"}
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default AddDeliveryAddress;
