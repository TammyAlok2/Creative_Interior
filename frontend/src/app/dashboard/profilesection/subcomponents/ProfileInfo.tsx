'use client';

import { useAuthStore } from "@/stores/authStore";
import ContactInfo from "./ContactInfo";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfileInfo = () => {
    const css = {
        label: "block text-sm text-gray-medium mb-2",
        input: "w-full p-2 border outline-0 rounded",
        error: "text-red-500 text-sm mt-1",
    };

    const { user, fetchUserDetails, isLoggedIn, updateUserProfile } = useAuthStore();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
    });

    const [errors, setErrors] = useState({ phoneNumber: "" });

    useEffect(() => {
        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                phoneNumber: user.phoneNumber || "",
            });
        }
    }, [user]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Validate phone number
        if (name === "phoneNumber") {
            const isValid = /^\d{0,10}$/.test(value); // Only allow up to 10 digits
            if (!isValid) {
                setErrors((prev) => ({ ...prev, phoneNumber: "Phone number must contain only digits." }));
                return;
            } else if (value.length > 0 && value.length < 10) {
                setErrors((prev) => ({ ...prev, phoneNumber: "Phone number must be exactly 10 digits." }));
            } else {
                setErrors((prev) => ({ ...prev, phoneNumber: "" }));
            }
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (errors.phoneNumber) {
            console.error("Validation errors exist.");
            return;
        }

        try {
            const response = await updateUserProfile(formData);
            if (response) {
                setIsEditing(false);
                fetchUserDetails(); // Refresh user details after successful update
                toast.success('User data updated successfully');
            } else {
                console.error("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };

    return (
        <div className="p-4 border-b w-[80%]">
            <div className="flex gap-[1rem] items-center">
                <h2 className="text-[1.7rem] font-semibold mb-4">Personal Information</h2>
            </div>
            {isLoggedIn && user ? (
                <div className="flex flex-col items-start gap-[1rem]">
                    <div className="w-[80%] max-[562px]:w-[100%]">
                        <div>
                            <label className={css.label}>User Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name as string || formData.name}
                                className={css.input}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                    </div>

                    <ContactInfo css={css} user={user} formData={formData} handleInputChange={handleInputChange} isEditing={isEditing} errors={errors} />

                    <button
                        onClick={isEditing ? handleSave : handleEditToggle}
                        className={`${isEditing ? 'bg-medium_primary': 'bg-primary'} text-white px-[2rem] py-2 rounded mt-4`}
                    >
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                </div>
            ) : (
                <h1>Loading please wait...</h1>
            )}
        </div>
    );
};

export default ProfileInfo;