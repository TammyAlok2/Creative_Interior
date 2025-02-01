'use client';
import React, { useState } from 'react';
import CartItem from './cartcomponents/CartItem';
import CartSummary from './cartcomponents/cartSummary';
import { useCartStore, useCartSync } from '@/stores/cartStore';
import Image from 'next/image';

const CartPage: React.FC = () => {
  const [salesTax] = useState<number>(0);
  
  const { items, updateItemQuantity, removeItem } = useCartStore((state) => state);
  
  // console.log(items);

  const handleQuantityChange = (id: any, newQuantity: number) => {
    const safeQuantity = Math.max(newQuantity, 1);
    updateItemQuantity(id, safeQuantity);
  };

  const handleDelete = (id: any) => {
    removeItem(id);
  };

  // Filter out items with null products and calculate subtotal
  const validItems = items.filter(item => item.product != null);
  const subtotal = validItems.reduce(
    (total, item) => total + (item.product?.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="w-[90%] min-[1426px]:w-[85%] min-[1600px]:w-[80%] mx-auto p-6 space-y-8 lg:flex lg:space-x-8">
      <div className="w-full lg:w-3/4">
        <h2 className="text-3xl font-semibold mb-6">
          Your Cart ({validItems.length} items)
        </h2>
        <div className="bg-white rounded-md space-y-[1rem]">
          {validItems.map((item:any) => {
            // Early return if product is null
            if (!item.product) {
              return null;
            }

            const {
              id,
              product: {
                _id,
                name = '',
                images = [],
                description = '',
                price = 0,
              },
              quantity = 1,
            } = item;

            return (
              <CartItem
                key={_id}
                id = {_id}
                image={images[0]?.secure_url || ''}
                name={name}
                description={description}
                price={price * quantity}
                quantity={quantity}
                onQuantityChange={(newQuantity) =>
                  handleQuantityChange(_id, newQuantity)
                }
                onDelete={() => handleDelete(_id)}
              />
            );
          })}
          
          {validItems.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Image width={400} height={400} src={"/images/cart/empty-cart.gif"} alt='Empty cart...' className='w-[20rem] mx-auto' />
              <h1 className='font-bold text-2xl'>Your Cart is Empty!</h1>
            </div>
          )}
        </div>
      </div>
      <div className="max-[613px]:w-full min-[613px]:w-[64%] lg:w-[40%]">
        <CartSummary subtotal={subtotal} salesTax={salesTax} />
      </div>
    </div>
  );
};

export default CartPage;