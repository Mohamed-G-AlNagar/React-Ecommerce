import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartPlus, FaSearch } from 'react-icons/fa';
import Logo from '../../images/Logo.png';
import { tokenContext } from '../../context/TokenContext';
import toast from 'react-hot-toast';
import { useSearchProducts } from '../../hooks/filteredProductsHooks';
import { IProduct } from '../../models/product';

function MainNavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

  const { filteredProducts, isLoading, error } = useSearchProducts(searchQuery);
  const { setToken } = useContext(tokenContext);

  const token = localStorage.getItem('token') || '';
  const isLogedIn = token ? true : false;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value !== '');
  };

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('cartId');
    setToken(null);
    toast.success('Logged out successfully');
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-0">
      <div className="container p-0">
        <Link className="navbar-brand m-0" to="/">
          <img src={Logo} alt="My Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-md-center position-relative"
          id="navbarSupportedContent"
        >
          <div className="d-flex align-items-center me-auto">
            <div className="input-group">
              <input
                className="flex-1 form-control h-100 "
                type="search"
                placeholder="Search your products here"
                aria-label="Search"
                onChange={handleSearch}
                value={searchQuery}
                style={{
                  width: '300px',
                  fontSize: '14px',
                  color: '#C4C4C4',
                }}
              />

              <span
                className="input-group-text"
                style={{ backgroundColor: 'green' }}
              >
                <FaSearch
                  style={{ width: '20px', height: '20px', color: 'white' }}
                />
              </span>
            </div>
            {showSearchResults && filteredProducts && (
              <div
                className="position-absolute bg-white w-25 mt-16 overflow-y-scroll shadow-lg cursor-pointer"
                style={{
                  top: '40px',
                  left: '0',
                  zIndex: '50',
                  maxHeight: '400px',
                }}
              >
                {searchQuery &&
                  filteredProducts.map((item: IProduct) => (
                    <>
                      <button
                        key={item._id}
                        className="max-w-600px h-25 bg-gray-100 mb-3 d-flex align-items-center gap-3 cursor-pointer"
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          outline: 'none', // Optional to remove the outline when focused
                        }}
                        onClick={() => {
                          navigate(`/product/${item._id}`, { state: { item } });
                          setShowSearchResults(false);
                          setSearchQuery('');
                        }}
                      >
                        <img
                          className="w-25"
                          src={item.image}
                          alt="productImg"
                          style={{ maxWidth: '25%' }}
                        />
                        <div className="flex flex-col gap-1 flex-grow-1">
                          <p className="font-semibold text-lg">
                            {item.productName}
                          </p>
                          <p className="text-xs">
                            {item.description && item.description.length > 40
                              ? `${item.description.slice(0, 40)}...`
                              : item.description}
                          </p>
                          <p className="text-sm">
                            Price:{' '}
                            <span className="text-primeColor font-semibold">
                              ${item.priceAfterDiscount}
                            </span>
                          </p>
                        </div>
                      </button>
                      <hr />
                    </>
                  ))}
              </div>
            )}
          </div>
          <ul className="navbar-nav">
            <li className="nav-item active fs-5">
              <Link className="nav-link" to={'/'}>
                Home
              </Link>
            </li>
            <li className="nav-item fs-5">
              <Link className="nav-link" to={'cart'}>
                <FaCartPlus />
                Cart
              </Link>
            </li>
          </ul>
          {isLogedIn ? (
            <button className="btn btn-danger ms-3" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link className="btn btn-primary ms-3" to="/login">
                Login
              </Link>
              <Link className="btn btn-secondary ms-1" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MainNavBar;
