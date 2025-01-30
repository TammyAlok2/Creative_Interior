export default function StatusBadge({ status }) {
    const statusColors = {
      Delivered: "text-green-600",
      Cancelled: "text-red-600",
      "On the way": "text-blue-600",
      Returned: "text-yellow-600",
    };
  
    return <span className={`font-semibold opacity-[.8] ml-7 mt-1 max-[763px]:text-[.95rem] max-[763px]:font-semibold max-[763px]:text-gray-medium max-[763px]:ml-0 ${statusColors[status]}`}>{status.toUpperCase()}</span>;
  }
  