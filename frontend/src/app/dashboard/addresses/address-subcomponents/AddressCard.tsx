import { FaEllipsisV } from "react-icons/fa";

export default function AddressCard({ name, phone, address, pincode, tag }) {
  return (
    <div className="border rounded-md p-4 shadow-sm flex justify-between items-start">
      <div className="space-y-2">
        {tag && (
          <span className="bg-gray-light text-gray-medium text-xs px-2 py-1 rounded-md mb-2 inline-block">
            {tag}
          </span>
        )}
        <p className="font-semibold flex gap-5">
          {name} <span className="font-normal text-gray-dark">{phone}</span>
        </p>
        <p className="text-sm text-gray-medium">
          {address} - <span className="font-semibold">{pincode}</span>
        </p>
      </div>
      <button className="text-gray-medium hover:text-gray-dark">
        <FaEllipsisV />
      </button>
    </div>
  );
}
