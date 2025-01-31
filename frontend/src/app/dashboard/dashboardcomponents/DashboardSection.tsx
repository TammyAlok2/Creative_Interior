import DashboardItem from "./DashboardItem";

export default function DashboardSection({ title, items }) {
  return (
    <div className="mb-6 border-b pb-3">
      {/* Title Section */}
      <div className="font-semibold text-lg flex gap-3 items-center mb-4">
        {title}
      </div>

      {/* Items List Section */}
      <ul className="space-y-2 ml-[1.7rem]">
        {items.map((item, index) => (
          <DashboardItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
}
