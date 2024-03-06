import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useParams } from 'react-router-dom';
import { useProductDatails } from '../../hooks/productHooks';
import Spinner from '../spinner/Spinner';
import toast from 'react-hot-toast';
import { formatCurrency } from '../../utils/helpers';
import { useAddItemToCart } from '../../hooks/cartHooks';

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const ProductDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const { product, error, isLoading } = useProductDatails(id);
  const { mutate: addItemToCart } = useAddItemToCart();

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error(error.message);
    return <p>Error</p>;
  }
  function handleAddToCart() {
    addItemToCart(id || '');
  }
  const {
    image,
    images,
    productName,
    description,
    priceAfterDiscount,
    finalPrice,
    rating,
    stock,
    categoryName,
  } = product;
  const stars = Array.from({ length: Math.round(rating) }, (_, index) => (
    <i key={index} className="fa fa-star"></i>
  ));

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="row justify-content-center mb-3">
          <div className="col-md-12 col-xl-10">
            <div className="card shadow-0 border rounded-3">
              <div className="card-body">
                <div className="row mb-2">
                  <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                    <div className="bg-image hover-zoom ripple rounded ripple-surface">
                      <img
                        src={image}
                        className="w-100"
                        style={{ height: '250px' }}
                        alt="Product"
                      />
                      <a href="#!">
                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: 'rgba(253, 253, 253, 0.15)',
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="d-flex justify-content-between align-items-center mb-2 mt-2">
                      <h4 className="text-primary ms-2">{productName}</h4>
                      <span>&nbsp;&nbsp;</span>
                      <h5 className=" me-3">{categoryName}</h5>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <div className="text-danger mb-1 ms-2">
                        {stars.map((star, index) => (
                          <span key={index}>{star}</span>
                        ))}
                        <span>{rating}</span>
                      </div>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className="mb-2 text-muted small">
                      <h6>{description}</h6>
                    </div>
                    <div className="mb-0 ms-2 text-muted small">
                      <p className="text-primary text-start ms-5">
                        Stock: {stock}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start mt-2">
                    <div className="d-flex flex-row justify-content-around  mb-1">
                      <h4 className="mb-1 me-1">
                        {formatCurrency(priceAfterDiscount)}
                      </h4>
                      <span className="text-danger">
                        <s> {formatCurrency(finalPrice)}</s>
                      </span>
                    </div>
                    <h6 className="text-success">Free shipping</h6>
                    <div className="d-flex flex-column mt-4">
                      <button
                        className="btn btn-outline-primary btn-sm fs-6 mt-2"
                        type="button"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </button>
                      <Link
                        to={'/'}
                        className="btn btn-link link-success mt-4 fs-6"
                        aria-label="View Products"
                      >
                        <i className="fas fa-long-arrow-alt-left me-2"></i>
                        Back to shop
                      </Link>
                    </div>
                  </div>
                </div>
                <Slider {...settings}>
                  {images.map((photo: string, index: number) => (
                    <div key={index} className="hover-zoom">
                      <img
                        src={photo}
                        className="w-100 "
                        style={{ height: '200px' }}
                        alt={`Product ${index + 1}`}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
