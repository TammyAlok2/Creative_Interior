'use client';

// components/WishlistContainer.tsx
import React from 'react';
import Wishlist from './WishList';

const wishlistTitle = {
    title: "My Wishlist"
}

const WishlistContainer: React.FC = () => {
  return (
    <div className='mt-[10rem] mb-[4rem]'>
      <Wishlist wishlistTitle={wishlistTitle} />
    </div>
  );
}

export default WishlistContainer;
