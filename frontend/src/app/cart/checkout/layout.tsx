"use client";

import React, { useState } from "react";
import { AddressSection } from "./checkout-components/AddressSection";
import OrderSummary from "./checkout-components/orderdetails/OrderDetails";
import AddDeliveryAddressContainer from "./add-address/page";
import EditAddressContainer from "./edit-address/page";
import { useRouter } from "next/navigation";

type PageType = "address-section" | "add-address" | "edit-address";

interface CheckoutProps {
  selectedPage: PageType;
  deliveryAddressId: string | null;
}

export default function Checkout({ selectedPage: initialPage, deliveryAddressId: initialAddressId }: CheckoutProps) {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState<PageType>(initialPage);
  const [deliveryAddressId, setDeliveryAddressId] = useState<string | null>(initialAddressId);

  const handleSelectPage = (page: PageType, addressId?: string) => {
    setSelectedPage(page);
    if (addressId) {
      setDeliveryAddressId(addressId);
    }
    router.push(`?page=${page}${addressId ? `&addressId=${addressId}` : ""}`);
  };

  const renderContent = () => {
    switch (selectedPage) {
      case "add-address":
        return <AddDeliveryAddressContainer handleSelectPage={handleSelectPage} />;
      case "edit-address":
        return <EditAddressContainer handleSelectPage={handleSelectPage} deliveryAddressId={deliveryAddressId} />;
      default:
        return <AddressSection handleSelectPage={handleSelectPage} />;
    }
  };

  return (
    <div className="min-h-screen mt-[8rem]">
      <div className="max-[1479px]:justify-between bg-white rounded-lg max-[1479px]:p-0 max-[1250px]:flex-col max-[524px]:w-[85%] flex items-start gap-[1rem] mx-auto w-[75%]">
        <div className="w-[52rem] max-[524px]:w-[100%] max-[1125px]:w-[77vw] max-[699px]:w-[75vw]">{renderContent()}</div>
        <OrderSummary />
      </div>
    </div>
  );
}
