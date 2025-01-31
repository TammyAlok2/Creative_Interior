export default function OrderCancellation({ orderDetails }) {
  const formatOrderDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const hours = date.getHours() % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';
    const ordinal = (n) => ['th', 'st', 'nd', 'rd'][(n % 10 > 3 || ~~(n % 100 / 10) === 1) ? 0 : n % 10];
    
    return `${dayOfWeek}, ${dayOfMonth}${ordinal(dayOfMonth)} ${month} · ${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="text-gray-medium bg-gray-low p-3 rounded-md border-l-4 border-gray-thin mt-[1rem]">
      <p>Your Order is {orderDetails.orderStatus}</p>
      <p className="text-gray-mediumLight text-sm mt-1">{formatOrderDate(orderDetails.orderDate)}</p>
    </div>
  );
}
