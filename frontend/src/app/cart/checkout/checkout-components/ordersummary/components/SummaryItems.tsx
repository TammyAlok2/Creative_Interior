import { OrderDetailsType } from '@/data/OrderDetails';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

interface SummaryItemsProps {
    OrderDetailsData: any;
}

const SummaryItems: React.FC<SummaryItemsProps> = ({ OrderDetailsData }) => {
//console.log(OrderDetailsData,'this is summary items ')
    return (
        <div>
            {OrderDetailsData?.map((item:any, index:number) => (
    
                <div key={index} className="flex justify-between items-start py-2">
                     <Link href={`/singleproduct/${item?.product?._id}`}>
                    <div className='flex gap-2'>
                        <Image width={55} height={55} src={item?.product?.images[0]?.secure_url} className="rounded-lg" alt='product-image' />
                        <div className='flex flex-col justify-around'>
                            <h3 className="font-semibold opacity-[.9] text-gray-medium text-sm">{item
                            ?.product?.name}</h3>
                            <p className="text-sm text-gray-medium opacity-[.9]">Qty : {item?.quantity}</p>
                        </div>
                    </div>
                    </Link>
                    <p className="font-bold text-xl text-gray-medium">₹{item?.product?.price}</p>
                </div>
            ))}
        </div>
    );
};

export default SummaryItems;
