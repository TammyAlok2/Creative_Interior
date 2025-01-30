import React from 'react';
import SummaryHeader from './components/SummaryHeader';
import SummaryItems from './components/SummaryItems';
import SummaryFooter from './components/SummaryFooter';
import { OrderDetailsType } from '@/data/OrderDetails';
import { useCartStore } from '@/stores/cartStore';

interface OrderSummaryProps {
  isOpen: boolean;
  toggleSummary: () => void;
  OrderDetailsData: OrderDetailsType[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ isOpen, toggleSummary, OrderDetailsData }) => {
const {items} = useCartStore()

  return (
    <div
      className={`w-full h-full bg-white transform transition-transform max-sm:w-[100%]`}
      onClick={(e) => e.stopPropagation()}
    >
      <SummaryHeader toggleSummary={toggleSummary}  OrderDetailsData={items} />
      <div className="">
        <SummaryItems OrderDetailsData={items} />
        {/* <SummaryFooter OrderDetailsData={items}/> */}
      </div>
    </div>
  );
};

export default OrderSummary;
