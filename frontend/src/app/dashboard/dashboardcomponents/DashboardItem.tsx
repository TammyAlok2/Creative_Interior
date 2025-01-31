import Link from "next/link";

export default function DashboardItem({ item }) {
  return (
    <Link href={item.href || "#"} passHref>
      <li className="flex items-center justify-between py-2 px-3 hover:bg-gray-light rounded-lg cursor-pointer">
        <div className="flex items-center space-x-3">
          <span>{item?.label}</span>
        </div>
      </li>
    </Link>
  );
}
