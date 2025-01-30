import { WishList } from "./WishList";

export type Ribbon = {
    text: string;
    color: string;
};

export type Review = {
    rating: number; // Rating as a number, e.g., 1-5
    title: string; // Derived title like "Excellent", "Good", etc.
    text: string; // The review comment
    author: string; // Author name
    date: string; // Date of the review in a formatted string
};

export type Product = {
    _id: number;
    id: number;
    ribbon: Ribbon;
    images: { secure_url: string }[]; // Corrected the typo and added array notation for consistency
    ArrayImages: string[];
    name: string;
    description: string;
    edition: string;
    price: number;
    stock: string;
    discount: number;
    ratings: number;
    category: string;
    specifications: Specifications;
    SingleProduct: any;
    reviews: Review[]; // Array of reviews
} | any;

interface Specifications {
    general: { label: string; value: string }[];
}

export interface ProductCardProps {
    product: Product;
}

export interface SingleProductCardProps {
    key: string | number; // Removed `any` for stricter typing
    product: Product | WishList | any;
    ribbon: boolean;
}
