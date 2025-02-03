import { useCartStore } from "@/stores/cartStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlinePlaylistRemove } from "react-icons/md";

interface ProductItemProps {
  product: any;
  // id: any;
  // image: string; // Correct prop name
  // name: string;
  // price: any;
  // description: any;
  // rating: any;
  onDelete: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  // id,
  // image, // Corrected to use wishlisting
  // name,
  // price,
  // description,
  // rating,
  onDelete
}) => {

  
  const { _id, images, name, price, description, rating} = product;
  // Use fallback values if prices are undefined or null
  const formattedOriginalPrice = price ? price.toFixed(2) : "0.00";

  const addItemToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = async () => {
    await addItemToCart(product);
    await onDelete();
  };

  return (
    <div className="flex items-center justify-between border-b py-4 max-[534px]:flex-col max-[534px]:items-start sm:flex-row max-[534px]:gap-[1rem]">
      <div className="flex items-center max-[1562px]:w-[80%] max-[1146px]:w-[70%] space-x-4 max-[534px]:flex-row-reverse max-[534px]:space-x-0 max-[534px]:justify-between max-[534px]:w-full w-[88%]">
        <button className="text-gray-dark hover:bg-gray-100 p-[.2rem] rounded-full hover:border text-[1.9rem] hover:text-red" onClick={onDelete}>
          <MdOutlinePlaylistRemove />
        </button>
        <div className="flex items-center space-x-4">
        <Image
          width="100"
          height="100"
        src={images && images.length > 0 ? images[0].secure_url : '/placeholder-image.png'} // Use wishlisting here
          alt={name}
          className="h-24 w-24 object-cover rounded-lg"
        />
        <div>
        <Link href={`/wallpaper/multiple/${_id}`}><h3 className="font-semibold">{name||''}</h3></Link>
          <p className="max-[1606px]:hidden">{description.slice(0,180)}...</p>
          <p className="max-[1607px]:block min-[1607px]:hidden max-[1267px]:hidden">{description.slice(0,100)}...</p>
          <p className="max-[1268px]:block min-[1268px]:hidden max-[1145px]:hidden">{description.slice(0,70)}...</p>
          <p className="max-[1146px]:block min-[1146px]:hidden max-[609px]:hidden">{description.slice(0,40)}...</p>
          <p className="max-[610px]:block min-[610px]:hidden">{description.slice(0,10)}...</p>
          <p className="text-gray-500">
            <span>₹{formattedOriginalPrice || '1000'}</span>
          </p>
        </div>
        </div>
      </div>
      <button className="bg-orange-orange500 hover:opacity-[0.9] text-white py-2 px-4 rounded" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};



export default ProductItem;
