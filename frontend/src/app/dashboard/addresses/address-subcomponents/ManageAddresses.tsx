"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AddressSection } from "@/app/cart/checkout/checkout-components/AddressSection";
import AddDeliveryAddressContainer from "@/app/cart/checkout/add-address/page";
import EditDeliveryAddressContainer from "@/app/cart/checkout/edit-address/page";

type PageType = "address-section" | "add-address" | "edit-address";

interface CssStyles {
  boxShadow: string;
}

interface CssOuterLayer {
  addDeliveryAddressCss: CssStyles;
  EditDeliveryAddressCss: CssStyles;
}

type HandleSelectPageType = (page: PageType, addressId?: string) => void;

export default function ManageAddresses() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPage, setSelectedPage] = useState<PageType>("address-section");
  const [deliveryAddressId, setDeliveryAddressId] = useState<string | null>(null);

  // Initialize state based on the search parameter
  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam === "add-address" || pageParam === "edit-address" || pageParam === "address-section") {
      setSelectedPage(pageParam);
    }
  }, [searchParams]);

  // Handle page changes and update the search parameter
  const handleSelectPage: HandleSelectPageType = (page, addressId) => {
    setSelectedPage(page);
    setDeliveryAddressId(addressId ?? null);
    router.push(`?page=${page}`);
  };

  // const cssOuterLayer: CssOuterLayer = {
  //   addDeliveryAddressCss: {
  //     boxShadow: "none",
  //   },
  //   EditDeliveryAddressCss: {
  //     boxShadow: "none",
  //   },
  // };

  // Render content dynamically based on the selected page
  const renderContent = () => {
    switch (selectedPage) {
      case "add-address":
        return (
          <AddDeliveryAddressContainer
            handleSelectPage={handleSelectPage}
            // cssOuterLayer={cssOuterLayer}
          />
        );
      case "edit-address":
        return (
          <EditDeliveryAddressContainer
            handleSelectPage={handleSelectPage}
            deliveryAddressId={deliveryAddressId}
            // cssOuterLayer={cssOuterLayer}
          />
        );
      case "address-section":
      default:
        return <AddressSection handleSelectPage={handleSelectPage} />;
    }
  };

  return (
    <div className="box-shadow border p-[2rem] rounded-xl w-full">
      <div className="max-[1479px]:justify-between bg-white rounded-lg max-[1479px]:p-0 max-[1250px]:flex-col flex items-start gap-[1rem]">
        <div className="max-[992px]:w-full">{renderContent()}</div>
      </div>
    </div>
  );
}
