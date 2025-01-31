'use client';

import { useState } from 'react';
// import CartSummary from './SingleProducts';
// import FrequentlyBought from './page'
import SingleProducts from './page';

const FrequentlyBoughtContainer = () => {
    const [selectedItems, setSelectedItems] = useState<number>(0);
    const [selectedCount, setSelectedCount] = useState<number>(0);

    // Data for the items
    const products = [
        {
            image: "/images/ProductsImage/Comb.jpg",
            name: "Egate O9 Pro Gold (12000 lm / Remote Controller) Fully Automatic",
            price: 25990,
            discountPrice: 45990,
            rating: 12,
            ratingCount: 12,
        },
        {
            image: "/images/ProductsImage/Cup.jpg",
            name: "DEV LITE 100 INCH D EYELET SCREEN 7.25FTX 5FT Projector Screen",
            price: 563,
            discountPrice: 990,
            rating: 3798,
            ratingCount: 4,
        },
        {
            image: "/images/ProductsImage/Razor.jpg",
            name: "techut 1 +1 1ft-2ft Wall Mount/ Ceiling Mount (Iron) Projector Stand",
            price: 665,
            discountPrice: 1000,
            rating: 1224,
            ratingCount: 4,
        },
    ];

    const handleCheckboxChange = (price: number, isChecked: boolean) => {
        setSelectedItems((prevItems) => {
            const newPrice = isChecked ? prevItems + price : prevItems - price;
            setSelectedCount(isChecked ? selectedCount + 1 : selectedCount - 1);
            return newPrice;
        });
    };

    return (
        <div className="py-6">
            <div className="bg-white rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">Frequently Bought Together</h1>
                <div className="flex space-x-4 lg:space-x-0 min-[1590px]:space-x-4 gap-[2%] justify-between max-[1590px]:flex-col">
                    {/* {products.map((product, index) => (
                        <FrequentlyBought
                            key={index}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            discountPrice={product.discountPrice}
                            rating={product.rating}
                            ratingCount={product.ratingCount}
                            onCheckboxChange={handleCheckboxChange}
                        />
                    ))} */}
                    
                </div>
                <SingleProducts />
                {/* <CartSummary totalPrice={selectedItems} itemCount={selectedCount} /> */}
            </div>
        </div>
    );
};

export default FrequentlyBoughtContainer;
