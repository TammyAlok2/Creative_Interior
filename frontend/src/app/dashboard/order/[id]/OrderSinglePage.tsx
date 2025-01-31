"use client";

import { useState, useEffect, useRef } from "react";
import OrderTrackingCard from "./ordersinglepagecomponents/OrderTrackingCard";
import DeliveryDetails from "./ordersinglepagecomponents/delivery-details/DeliveryDetails";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import ViewBreakup from "./ordersinglepagecomponents/delivery-details/components/ViewBreakup";
import { useParams, useSearchParams } from "next/navigation";
import { useOrderStore } from "@/stores/orderStore";
import { jsPDF } from "jspdf"; // for PDF download functionality
import html2canvas from "html2canvas";

export default function OrderSinglePage() {
  const printRef = useRef<HTMLDivElement>(null);
  const { id: orderId } = useParams() as { id: string };
  const searchParams = useSearchParams();
  const orderItemId = searchParams.get("orderItemId");

  const { fetchProductsByOrders, fetchOrderById } = useOrderStore();
  const [isBreakupVisible, setIsBreakupVisible] = useState(false);
  // console.log("fetchProductsByOrders total data: ", fetchProductsByOrders);

  const [orderDetails, setOrderDetails] = useState<any>(null);
  // console.log('orderDetails data getting: ', orderDetails.productId)
  const [allOrders, setAllOrders] = useState<any>(null);
  // Order details state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //pdf download
  // Download the page content as PDF
  
  // const handleDownload = async () => {
  //   if (printRef.current) {
  //     const content = printRef.current;

  //     // Convert content to canvas using html2canvas
  //     const canvas = await html2canvas(content, {
  //       scale: window.devicePixelRatio,
  //       useCORS: true, // Ensures external images are loaded
  //     });

  //     const imgData = canvas.toDataURL("image/png");

  //     // Define A4 page size in points (72 DPI)
  //     const a4Width = 595.28; // A4 width in points
  //     const a4Height = 841.89; // A4 height in points
  //     const padding = 20; // Padding around content

  //     // Get the content dimensions
  //     const contentWidth = canvas.width;
  //     const contentHeight = canvas.height;

  //     // Calculate scale factor to fit the content within A4 page dimensions (with padding)
  //     const scaleFactor = Math.min(
  //       (a4Width - 2 * padding) / contentWidth,
  //       (a4Height - 2 * padding) / contentHeight
  //     );

  //     // Adjust the content size to fit within A4
  //     const scaledWidth = contentWidth * scaleFactor;
  //     const scaledHeight = contentHeight * scaleFactor;

  //     // Create a jsPDF instance for A4 format
  //     const pdf = new jsPDF({
  //       orientation: "portrait",
  //       unit: "pt",
  //       format: "a4",
  //     });

  //     // Add the content image to the PDF, scaled, centered, and with padding
  //     pdf.addImage(imgData, "PNG", padding, padding, scaledWidth, scaledHeight);

  //     // Save the PDF with content properly scaled and padded
  //     pdf.save("order-details.pdf");
  //   }
  // };

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId || !orderItemId) return;

      try {
        setLoading(true);
        const data = await fetchProductsByOrders(orderId, orderItemId);
        // console.log(data);
        setOrderDetails(data); // Update order details
      } catch (err: any) {
        console.error("Error fetching order details:", err.message);
        setError("Failed to fetch order details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, orderItemId]);

  // Fetch all orders
  useEffect(() => {
    const fetchOrdersDetails = async () => {
      if (!orderId || !orderItemId) return;

      try {
        setLoading(true);
        const data = await fetchOrderById(orderId);
        // console.log(data);
        setAllOrders(data); // Update order details
      } catch (err: any) {
        console.error("Error fetching order details:", err.message);
        setError("Failed to fetch order details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersDetails();
  }, [orderId, orderItemId]);

  if (loading) {
    return (
      <div className="py-[8rem] text-center">Loading order details...</div>
    );
  }

  if (error) {
    return <div className="py-[8rem] text-center text-red-500">{error}</div>;
  }

  // console.log("orderDetails: ", orderDetails)

  const handleBreakupVisible = (visibility: boolean) => {
    setIsBreakupVisible(visibility);
  };

  return (
    <div className="py-[8rem]">
      <div className="w-[88%] mx-auto">
        {/* Breadcrumb */}
        <div className="font-semibold text-orange-orange500 mb-4 flex items-center gap-2">
          <Link href={"/"}>
            <AiFillHome className="text-[1.2rem] hover:opacity-[0.8] mt-[-.3rem] text-gray-medium" />
          </Link>{" "}
          &gt; <Link href={"/dashboard/profilesection"}>My Account</Link> &gt;{" "}
          <Link href={"/dashboard/orders"}>My Orders</Link> &gt;
        </div>

        {/* Main Container */}
        <div className="rounded-lg flex gap-[2rem] max-[1000px]:flex-col items-start">
          {/* Grid for Address and Rewards */}
          <OrderTrackingCard orderDetails={orderDetails || {}} />

          {/* Order Details */}
          <div className="bg-white gap-6 p-[1rem] w-[35rem] max-[637px]:w-full rounded-lg max-[594px]:w-[100%] box-shadow hover:scale-[1.02] border transition-all duration-300 ease-in-out relative">
            <DeliveryDetails
              allOrders={allOrders || {}}
              handleBreakupVisible={()=>handleBreakupVisible}
              orderDetails={orderDetails || {}}
              // handleDownload={handleDownload}
              printRef={printRef}
            />

              {/* // <div className="top-0 left-0 relative w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"> */}
              {/* // ref={modalRef} // Attach the ref to the modal container */}
              {/* </div> */}
            {isBreakupVisible && (
              <div
              className="absolute w-full top-0 left-0 bg-white p-6 rounded-lg shadow-lg h-full"
              >
                <ViewBreakup handleBreakupVisible={handleBreakupVisible} allOrders={allOrders} />
              </div>
            )}
          </div>


        </div>
      </div>
    </div>
  );
}
