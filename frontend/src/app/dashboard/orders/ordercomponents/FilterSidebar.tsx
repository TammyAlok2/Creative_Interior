'use client';
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { GiTireIronCross } from "react-icons/gi";
import Image from "next/image";
import { useOrderStore } from "@/stores/orderStore";

interface FilterSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function FilterSidebar({ isOpen, toggleSidebar }: FilterSidebarProps) {
  const { fetchOrders } = useOrderStore();
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  // Define your status options
  const orderStatuses = ["Processing", "Shipped", "Delivered", "Cancelled","Pending"];

  const handleStatusChange = async (status: string) => {
    let newSelectedStatus;
    if (selectedStatus.includes(status)) {
      // If status is already selected, remove it
      newSelectedStatus = selectedStatus.filter(s => s !== status);
    } else {
      // If status is not selected, add it
      newSelectedStatus = [...selectedStatus, status];
    }
    
    setSelectedStatus(newSelectedStatus);

    if (newSelectedStatus.length > 0) {
      // If we have selected statuses, fetch filtered orders
      await fetchOrders(newSelectedStatus.join(','));
    } else {
      // If no status is selected, fetch all orders
      await fetchOrders();
    }
  };

  return (
    <div>
      <div className={`fixed border top-0 left-0 h-full w-[18rem] hover:scale-[1.01] bg-white p-4 box-shadow z-50 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:relative lg:translate-x-0 lg:box-shadow lg:rounded-xl lg:h-auto`}>
        <button
          onClick={toggleSidebar}
          className="absolute top-8 right-4 p-2 box-shadow rounded-full hover:bg-gray-300 lg:hidden"
          aria-label="Close sidebar"
        >
          <GiTireIronCross />
        </button>
        <Image 
          width="150" 
          height="150" 
          src="/images/logo/Bomboo-World.png" 
          alt="Logo" 
          className="min-[993px]:hidden ml-[-2rem] mb-3" 
        />
        <h2 className="text-lg font-bold mb-4 border-b pb-4">Filters</h2>
        <div className="mb-6">
          <h3 className="font-semibold text-gray-dark text-[0.95rem]">Order Status</h3>
          <ul className="space-y-2 mt-2 border-b pb-5">
            {orderStatuses.map((status) => (
              <li key={status} className="flex items-center">
                <Checkbox 
                  checked={selectedStatus.includes(status)}
                  onCheckedChange={() => handleStatusChange(status)}
                  className="mr-2 w-[1.2rem] h-[1.2rem] rounded-[0.3rem] text-white data-[state=checked]:bg-orange-orange500 border-gray-thin" 
                />
                <label className="font-thin text-[0.90rem]">{status}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}