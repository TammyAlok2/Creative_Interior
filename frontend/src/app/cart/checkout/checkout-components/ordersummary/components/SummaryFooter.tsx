import { OrderDetailsType } from '@/data/OrderDetails';

import React from 'react';

interface SummaryFooterProps{
    OrderDetailsData: any;
}

const SummaryFooter:React.FC<SummaryFooterProps> = ({OrderDetailsData}) => {
//console.log(OrderDetailsData)
const total = OrderDetailsData?.reduce((acc:number, item:any) => acc + item?.product?.price * item?.quantity, 0);
const totalAmount = { label: 'Total Amount', value: total, style: 'text-purple-500' };
 
const summaryData = [
  { label: 'Products Total', value: '₹'+ total, style: '' },
  { label: 'Applied Coupon', value: '₹0', style: '' },
  { label: 'Shipping Charges', value: 'Free', style: 'text-green-500' },
];


 return (
    <div className="mt-5">
      {summaryData.map((item, index) => (
        <div key={index} className="flex text-gray-medium justify-between items-center py-2">
          <p className="font-medium">{item.label}</p>
          <p className={`font-semibold ${item.style}`}>{item.value}</p>
        </div>
      ))}
      <div className="flex justify-between w-full absolute bottom-6 rounded-xl items-center p-4 mr-2 bg-low_primary">
        <p className="text-lg font-bold">  {totalAmount.label}</p>
        <p className={`text-lg mr-8 font-bold   ${totalAmount.style}`}> ₹ {totalAmount.value}</p>
      </div>
    </div>
  );
};

export default SummaryFooter;
