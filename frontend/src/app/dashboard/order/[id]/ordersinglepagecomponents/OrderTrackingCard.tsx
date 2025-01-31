import Image from "next/image";
import OrderStatusStep from "./OrderStatusStep"
import Link from "next/link";
import OrderCancellation from "./OrderCancellation";

export default function OrderTrackingCard({ orderDetails }: any) {
  const productData = orderDetails?.productId;

  // Dynamic order statuses
  const orderStatuses = [
    { status: "Order Placed", date: orderDetails?.placedDate || "N/A" },
    { status: "Processing", date: orderDetails?.processingDate || "N/A" },
    { status: "Out for Delivery", date: orderDetails?.deliveryDate || "N/A" },
    { status: "Delivered", date: orderDetails?.deliveredDate || "N/A" },
  ];
  // console.log("orderDetails hai: ", orderDetails)

  // Determine current status
  const currentStatusIndex = orderStatuses.findIndex(
    (status) => status.status === orderDetails?.orderStatus
  );

  return (
    <div className="rounded-lg lg:w-[45rem] 2xl:w-[52rem] max-[1001px]:w-full bg-white box-shadow p-[1rem] hover:scale-[1.02] transition-all duration-300 ease-in-out border">
      <div className="flex flex-col gap-4 items-start justify-between bg-white rounded-lg max-[976px]:flex-col">
      <Link href={`/wallpaper/multiple/${productData?._id}`}>
        <div className="flex gap-4 items-start">
          {productData?.images?.[0]?.secure_url ? (
            <Image
              src={productData.images[0].secure_url}
              width={100}
              height={100}
              alt={productData.name || "Product Image"}
              className="rounded-md object-cover w-[5rem] h-[5rem]"
            />
          ) : (
            <div className="w-[100px] h-[100px] bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          )}
          <div>
            <h2 className="font-semibold text-lg text-gray-800">
              {productData?.name || "Product Image"}
            </h2>
            {/* <p className="text-gray-mediumLight text-sm">
              Color: {productData?.color || "N/A"}
            </p>
            <p className="text-gray-medium text-sm">
              Seller: {productData?.seller || "N/A"}
            </p> */}
            <p className="font-bold text-lg mt-2">₹{productData?.price}</p>
          </div>
        </div>
        </Link>

        {/* Order Status Steps */}
        <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 max-sm:gap-0 sm:gap-0 px-4 py-6">
          {orderStatuses.map((status, index) => (
            <OrderStatusStep
              key={index}
              status={status.status}
              date={status.date}
              color={index < currentStatusIndex ? "green" : "gray"}
              isCurrent={index === currentStatusIndex}
            />
          ))}
        </div>
        </div>
      </div>

      {/* Order Cancellation */}
      <OrderCancellation orderDetails={orderDetails} />
    </div>
  );
}
