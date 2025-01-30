export interface WishList {
    _id: string;
    image: string;
    name: string;
    price: number;
    category: {_id:string};
    originalPrice: number;
    stockStatus: string;
    ratings: number;
  }