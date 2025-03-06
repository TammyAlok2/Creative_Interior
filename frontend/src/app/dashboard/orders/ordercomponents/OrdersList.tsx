import React, { useEffect, useState } from 'react';
import { useOrderStore } from "@/stores/orderStore";
import OrderItem from "./OrderItem";
import Link from "next/link";
import Image from "next/image";

const OrdersList = () => {
  const { fetchOrders, orders } = useOrderStore();
  const [displayCount, setDisplayCount] = useState(10);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetchOrders();
      
    };
    fetchOrder();
  }, [fetchOrders]);

  const totalOrders = orders?.orders?.reduce((total, order) => 
    total + (order.orderItems?.length || 0), 0) || 0;

  const getVisibleOrders = () => {
    let shownOrders = [];
    let count = 0;

    for (const order of orders?.orders || []) {
      const orderItems = order.orderItems || [];
      for (const orderItem of orderItems) {
        if (count >= displayCount) break;
        
        shownOrders.push({
          order,
          orderItem,
          count: count++
        });
      }
      if (count >= displayCount) break;
    }

    return shownOrders;
  };

  const handleViewToggle = () => {
    setDisplayCount(prev => 
      prev === 10 ? totalOrders : 10
    );
  };

  // console.log("orders", orders);

  return (
    <div className="rounded-lg">
      {/* Empty state */}
      <div className="flex items-center justify-center">
        {(!orders?.orders || orders.orders.length === 0) && (
          <Image 
            width={600} 
            height={600} 
            src={"/images/cart/cartbackgroundgif.gif"} 
            alt="cartbackground gif" 
          />
        )}
      </div>

      {/* Orders list */}
      {getVisibleOrders().map(({ order, orderItem, count }) => {
        console.log("ya bro:", order)
        const mappedItem = {
          ...orderItem,
          images: [orderItem.photo],
          color: "Default",
          status: orderItem.orderStatus,
          statusColor: getStatusColor(orderItem.orderStatus),
          date: new Date(orderItem.orderDate).toLocaleDateString(),
          order: order.status,
          orderId: order._id,
          orderItemId: orderItem._id,
          price: order?.total,
        };

        return (
          <Link
            key={`${mappedItem.orderItemId}-${count}`}
            href={{
              pathname: `/dashboard/order/${mappedItem.orderId}`,
              query: { orderItemId: mappedItem.orderItemId },
            }}
          >
            <OrderItem item={mappedItem} />
          </Link>
        );
      })}

      {/* View More/Less button */}
      {totalOrders > 10 && (
        <div className="flex justify-center mt-4 mb-6">
          <button
            onClick={handleViewToggle}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {displayCount === 10 ? 'View More' : 'View Less'}
          </button>
        </div>
      )}
    </div>
  );
};

// Helper function to map status to colors
const getStatusColor = (status) => {
  switch (status) {
    case 'Processing':
      return 'yellow-500';
    case 'Confirmed':
      return 'blue-500';
    case 'Shipped':
      return 'purple-500';
    case 'Delivered':
      return 'green-500';
    case 'Cancelled':
      return 'red-500';
    default:
      return 'gray-500';
  }
};

export default OrdersList;