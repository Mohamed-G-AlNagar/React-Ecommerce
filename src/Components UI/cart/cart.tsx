import CartItem from './cartItem';
import './cart.css';
import { useCart } from '../../hooks/cartHooks';
import Spinner from '../spinner/Spinner';
import { CartItemProps } from '../../models/cartItem';
import { Link } from 'react-router-dom';
import { makeOrder } from '../../services/orderAPI';
import { useState } from 'react';

function Cart() {
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const { data: cartData, isLoading, error } = useCart();
  console.log(cartData, 'cartData');
  if (isLoading) return <Spinner />;
  if (error) {
    // toast.error(error.message);
    return <h1>Error</h1>;
  }

  const {
    updatedAt,
    products,
    // payCashOnDelivery,
    totalPrice,
    priceAfterDiscount,
    createdBy,
  } = cartData;
  const date = new Date(updatedAt).toLocaleDateString();

  async function handleOrder() {
    setIsLoadingPayment(true);
    const response = await makeOrder(cartData._id);
    console.log(response, 'response Payment');
    setIsLoadingPayment(false);
    if (response?.status === 'success') {
      window.location.href = response.data.url;
    }
  }
  return (
    <section className="h-100 h-custom">
      {isLoadingPayment && <Spinner />}
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: '15px' }}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">
                          {createdBy?.userName} Shopping Cart
                        </h1>
                        <h6 className="mb-0 text-muted">
                          {products.length} items
                        </h6>
                      </div>
                      <hr className="my-4" />
                      {products.map((item: CartItemProps['item']) => (
                        <CartItem key={item._id} item={item} />
                      ))}
                      <div className="pt-5">
                        <h6 className="mb-0">
                          <Link
                            to={'/'}
                            className="btn btn-link link-dark"
                            aria-label="View Products"
                          >
                            <i className="fas fa-long-arrow-alt-left me-2"></i>
                            Back to shop
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-lg-4 rounded-5 position-relative"
                    style={{ minHeight: '100vh', backgroundColor: '#abc7fc' }}
                  >
                    <div className="p-5 h-100">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">
                          items {products.length}
                        </h5>
                      </div>
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">
                          Price before discount
                        </h5>
                        <h5>
                          <s>{Math.round(totalPrice)} EGP</s>
                        </h5>
                      </div>
                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5>{Math.round(priceAfterDiscount)} EGP</h5>
                      </div>
                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Purchase Date</h5>
                        <h5>{date}</h5>
                      </div>
                    </div>
                    <div className="p-5 sticky-button">
                      <button
                        type="button"
                        className="btn btn-dark btn-lg mb-4 "
                        style={{ width: '50%' }}
                        data-mdb-ripple-color="dark"
                        onClick={handleOrder}
                      >
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
