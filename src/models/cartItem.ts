import { IProduct } from './product';

export interface CartItemProps {
  item: {
    price: number;
    priceAfterDiscount: number;
    product: IProduct;
    quantity: number;
    _id: string;
  };
}
