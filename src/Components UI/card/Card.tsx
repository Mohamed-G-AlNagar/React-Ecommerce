import './cart.css';

import { IProduct } from '../../models/product';
import { useAddItemToCart } from '../../hooks/cartHooks';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  product: IProduct;
}

export default function Card({ product }: CardProps) {
  const navigate = useNavigate();
  const { mutate: addItemToCart } = useAddItemToCart();
  const {
    productName,
    // description,
    priceAfterDiscount,
    finalPrice,
    rating,
    stock,
    // brand,
    categoryName,
    image,
    // images,
    //slug,
    //categoryId,
    //isActive
    _id,
  } = product;
  let discountValue: number = 0;

  if (priceAfterDiscount !== finalPrice) {
    discountValue = priceAfterDiscount - finalPrice;
  }

  function handleAddToCart() {
    addItemToCart(_id);
  }

  function handleGoToDetails() {
    navigate(`/product/${_id}`, { state: { item: product } });
  }

  return (
    <div className="col mb-2">
      <div className="card combo-offer rounded-8 border border-info">
        <div className="d-flex justify-content-between p-2">
          {discountValue ? <p className="lead mb-0">Today's Offer</p> : <p></p>}
          <div
            className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
            style={{ width: '35px', height: '35px' }}
          >
            <span>💪</span>
          </div>
        </div>
        <div
          className="w-100 overflow-hidden"
          style={{ height: '200px' }}
          onClick={handleGoToDetails}
        >
          <img
            src={image}
            className="card-img-top h-100 w-100 object-cover"
            alt={productName}
          />
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <p className="small">
              <a href="#!" className="text-muted">
                {categoryName}
              </a>
            </p>
            <p className="small text-danger">
              {discountValue ? <s>${finalPrice.toFixed(2)}</s> : ''}
            </p>
          </div>

          <div className="d-flex justify-content-between mb-1">
            <h5
              className="mb-0"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {productName}
            </h5>
            <h5 className="text-dark mb-0">${priceAfterDiscount.toFixed(2)}</h5>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <p className="text-muted mb-0">
              Available: <span className="fw-bold">{stock}</span>
            </p>
            <div className="ms-auto text-warning">
              {rating &&
                Array.from({ length: Math.floor(rating) }).map((_, index) => (
                  <i key={index} className="fas fa-star"></i>
                ))}
            </div>
          </div>
        </div>
        <button
          className="btn btn-info mb-2 align-self-center w-50"
          onClick={handleAddToCart}
        >
          Add Item to Cart
        </button>
      </div>
    </div>
  );
}
