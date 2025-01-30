'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import Link from 'next/link';

interface CartItemProps {
  image: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  onDelete: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  image,
  name,
  description,
  price,
  quantity,
  onQuantityChange,
  onDelete,
}) => {
  const handleDecrease = () => onQuantityChange(quantity - 1);
  const handleIncrease = () => onQuantityChange(quantity + 1);

  return (
    <div className="flex gap-[1rem] border max-[787px]:flex-col max-[788px]:items-start lg:flex-row justify-between items-center p-4 border-b box-shadow rounded-xl">
      <Link href={`/singleproduct/${id}`}>
      <div className="flex items-center space-x-4 mb-4 lg:mb-0">
      <Image
          width="100"
          height="100"
          src={image}
          alt={name}
          className="h-24 w-24 object-cover rounded-lg"
        />
      
        <div className="flex flex-col">
          <h3 className="font-semibold">{name}</h3>
          <div>
          {/* <p className="text-sm">{description}</p> */}
          <p className="text-sm max-[1606px]:hidden">{description.slice(0,180)}...</p>
          <p className="text-sm max-[1607px]:block min-[1607px]:hidden max-[1267px]:hidden">{description.slice(0,100)}...</p>
          <p className="text-sm max-[1268px]:block min-[1268px]:hidden max-[1145px]:hidden">{description.slice(0,70)}...</p>
          <p className="text-sm max-[1146px]:block min-[1146px]:hidden max-[609px]:hidden">{description.slice(0,40)}...</p>
          <p className="text-sm max-[610px]:block min-[610px]:hidden">{description.slice(0,40)}...</p>
          </div>
        </div>
      </div>
      </Link>
      <div className="flex gap-4 items-center">
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 bg-gray-200 text-sm rounded"
            onClick={handleDecrease}
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            className="px-3 py-1 bg-gray-200 text-sm rounded"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <p className="font-semibold text-lg w-[4rem]">₹{price.toFixed(2)}</p>
        <button
          onClick={onDelete}
          className="ml-4 text-red-500 text-sm hover:text-red-700"
        >
          <MdDelete className="text-[1.5rem] hover:text-[2rem] hover:p-[.2rem] hover:text-red hover:bg-gray-100 rounded-2xl" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
