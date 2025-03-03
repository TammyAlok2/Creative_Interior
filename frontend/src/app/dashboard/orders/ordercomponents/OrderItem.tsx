import Image from "next/image";
import StatusBadge from "./StatusBadge";
import { TbPointFilled } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";
import { FiChevronRight } from "react-icons/fi";

export default function OrderItem({ item }) {
  
  return (
    <div className="box-shadow border max-[763px]:flex-col max-[763px]:gap-1 hover:scale-[1.01] rounded-lg p-4 flex items-start gap-4 bg-white justify-between transition-all duration-300 ease-in-out mb-4">
      {/* Image */}
      <div className="w-[40rem] max-[763px]:w-full max-2xl:w-[26rem] min-2xl:w-[29rem] max-[543px]:w-full flex-shrink-0 flex gap-[1rem]">
        <div className="w-[8rem] h-[6rem]">
        <Image width="100" height="100" src={item?.productId?.images[0]?.secure_url} alt={item.name} className="object-cover rounded-lg h-full w-full scale-[0.8]" />
        </div>
        <div className="lg:flex-col w-full max-2xl:flex-col max-2xl:gap-[0rem] flex justify-around">
          <div className="w-full max-[763px]:flex max-[763px]:items-center max-[763px]:justify-between">
            <div>
            <h1 className="font-semibold text-lg mb-1">
              {/* <p className=" 2xl:inline">{item?.productId?.name}</p> */}
              <p className="max-[763px]:hidden">{item?.productId?.description?.slice(0, 30) + "..."}</p>

              <div className="max-[764px]:block min-[763px]:hidden">
                <div className="flex gap-1 items-center">
          <TbPointFilled className={`text-[1.2rem] relative top-[0.1rem] text-${item.statusColor}`} />
              <StatusBadge status={item.orderStatus} />  
                </div>
              <p className="max-[560px]:hidden">{item?.productId?.description?.slice(0, 30) + "..."}</p>
              <p className="max-[560px]:block max-[763px]:hidden">{item?.productId?.description?.slice(0, 16) + "..."}</p>
        <div className="flex gap-[.5rem] items-center">
          <p className=
          "mt-1 font-semibold text-[1rem] text-gray-medium">{item.date}</p>
        </div>

              </div>
              {/* <p className="max-[450px]:block min-[450px]:hidden">{item?.productId?.description.slice(0, 20) + "..."}</p> */}
            </h1>
            <p className="text-gray-500 text-sm max-[763px]:hidden">Quantity: {item.quantity}</p>
            </div>
            <div className="min-[763px]:hidden text-[2rem]"><FiChevronRight /></div>
          </div>
          <p className="text-gray-800 font-semibold mt-1 max-[763px]:hidden">₹{item?.productId?.price}</p>
        </div>
      </div>

      {/* Order Details */}


      {/* Status */}
      <div className="text-sm text-gray-medium w-[20%] flex flex-col gap-[0.2rem] max-[763px]:w-full">
        <div className="max-[763px]:hidden">
        <StatusBadge status={item.orderStatus} />
        </div>
        <div className="flex gap-[.5rem] items-center max-[763px]:hidden">
          <TbPointFilled className={`text-[1.2rem] relative top-[0.1rem] text-${item.statusColor}`} />
          <p className="mt-1 font-semibold text-[1.1rem]">{item.date}</p>
        </div>
        {item.orderStatus === "Delivered" && (
          <button className="text-blue-dark flex items-center gap-3 text-start mt-2 hover:underline">
            <FaStar className="text-[1.1rem]" /> Rate & Review Product
          </button>
        )}
      </div>
    </div>
  );
}
