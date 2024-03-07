import React, { useState } from 'react';
import { CartItemProps } from '../../models/cartItem';
import { useAddItemToCart, useRemoveItemFromCart } from '../../hooks/cartHooks';

// interface ICartItem {
//   product: {
//     id: string;
//     title: string;
//     description: string;
//     price: number;
//     discountPercentage?: number;
//     rating?: number;
//     stock: number;
//     brand: string;
//     category: string;
//     thumbnail: string;
//     images: string[];
//   };
// }

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { mutate: removeItem } = useRemoveItemFromCart();
  const { mutate: addItemToCart } = useAddItemToCart();

  // const quantity = 1; // Assuming initial quantity is 1
  let { price, priceAfterDiscount, product, quantity } = item;

  const [itemQty, setItemQty] = useState(quantity);

  function decreaseQty() {
    setItemQty(itemQty - 1);
    console.log(itemQty);
    removeItem({ itemId: product._id });
  }

  function increaseQty() {
    setItemQty(itemQty + 1);
    console.log(itemQty);
    addItemToCart(product._id);
  }
  function handleRemoveItem() {
    console.log(product._id);
    removeItem({ itemId: product._id, quantity: itemQty + 1 });
    setItemQty(itemQty - 1);
  }

  return (
    <div className="row mb-4 d-flex justify-content-between align-items-center">
      <div className="col-md-2 col-lg-2 col-xl-2">
        <img
          src={product.image}
          className="img-fluid rounded-3"
          alt={product.categoryName}
        />
      </div>
      <div className="col-md-3 col-lg-3 col-xl-3">
        <h6 className="text-black mb-0">{product.productName}</h6>
      </div>
      <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
        <button className="btn btn-link px-2" onClick={decreaseQty}>
          <i className="fas fa-minus"></i>
        </button>
        <input
          id="form1"
          min="0"
          name="quantity"
          value={itemQty}
          type="number"
          className="form-control form-control-sm text-center"
          disabled
        />
        <button className="btn btn-link px-2" onClick={increaseQty}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
        <h6 className="mb-0">
          {Math.round(priceAfterDiscount) * quantity} EGP
        </h6>
      </div>
      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
        <button className="btn btn-link p-0 fs-4" onClick={handleRemoveItem}>
          <i className="fas fa-times text-muted"></i>
        </button>
      </div>
      <hr className="my-4" />
    </div>
  );
};

export default CartItem;
