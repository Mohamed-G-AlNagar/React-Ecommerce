export interface IProduct {
  productName: string;
  brand: string;
  categoryName: string;
  description?: string;
  finalPrice: number;
  image: string;
  images?: string[];
  priceAfterDiscount: number;
  rating?: number;
  slug?: string;
  stock: number;
  categoryId: string;
  isActive?: boolean;
  _id: string;
}

// export type IProduct = {
//   id: number;
//   title: string;
//   description?: string;
//   price: number;
//   discountPercentage?: number;
//   rating?: number;
//   stock: number;
//   brand: string;
//   category: string;
//   thumbnail: string;
//   images?: string[];
// };
