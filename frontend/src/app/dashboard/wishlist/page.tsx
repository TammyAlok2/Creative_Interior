'use client';

// components/WishlistContainer.tsx
import React from 'react';
import Wishlist from './WishList';
import DashboardLayout from '../DashboardLayout';
// import Dashboard from '../Dashboard';

const wishlistTitle = {
    title: "My Wishlist"
}

const WishlistContainer: React.FC = () => {
  return (
    <DashboardLayout>
    <div className="pb-[1rem]">
    <div className='mb-[4rem] box-shadow rounded-xl p-2 border overflow-hidden flex gap-[2rem] min-[280px]:flex-col lg:flex-row max-lg:w-[100%]'>
      {/* <Dashboard /> */}
      <Wishlist wishlistTitle={wishlistTitle} />
    </div>
    </div>
    </DashboardLayout>
  );
}

export default WishlistContainer;
