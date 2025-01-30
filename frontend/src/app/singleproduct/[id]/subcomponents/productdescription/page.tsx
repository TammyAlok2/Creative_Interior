// pages/index.js
import ProductDescription from './ProductDescription';
import ProductSpecifications from '../specification/page';
import FrequentlyBoughtContainer from '../frequentlybought/FrequentlyBought';
import RatingReviewContainer from '../ratings_and_reviews/page';
import { products } from '@/data/ProductData';
import { Product } from '@/types/ProductCard';
import RatingsContainer from '../ratings/page';

const SingleCardDescriptionData = [
    {
        title: "Innovative Cleaning Solution",
        description: "Experience superior cleaning with our premium brush, conveniently packed to ensure hygiene and ease of use. Perfect for daily needs and built to last, this brush is an essential tool for maintaining cleanliness in your household or workplace.",
        imageSrc: "/images/ProductsImage/BrushWithPacket.jpg"
    },
    {
        title: "Stylish and Durable Bottle",
        description: "Stay hydrated in style with our sleek and durable bottle. Designed for both functionality and aesthetics, it keeps your beverages fresh while being easy to carry and clean, making it your perfect companion for work, travel, or home.",
        imageSrc: "/images/ProductsImage/Bottol.jpg"
    }
];

type SingleCardImagesProps = {
    SingleProduct: Product | any;
}

export default function SingleCardDescription({ SingleProduct }: SingleCardImagesProps) {
   
    return (
        <div className="mt-[2rem]">
            <main className="mx-auto">
              
                <h1 className="text-2xl font-semibold my-8">Specifications</h1>
                <ProductSpecifications SingleProduct={SingleProduct} />
                {/* <FrequentlyBoughtContainer /> */}
                <RatingReviewContainer SingleProduct = {SingleProduct} />
                <RatingsContainer />
            </main>
        </div>
    );
}