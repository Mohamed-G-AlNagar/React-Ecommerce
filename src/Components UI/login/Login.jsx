/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useUserLogin } from '../../hooks/userHooks';
import Spinner from '../spinner/Spinner';
import { userLogin } from '../../services/userAPI';
import { tokenContext } from '../../context/TokenContext';

function Login() {
  const navigate = useNavigate();
  let { setToken } = useContext(tokenContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let isLoading = false;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    isLoading = true;
    const userData = {
      email,
      password,
    };

    const user = await userLogin(userData);
    isLoading = false;
    if (user?.status === 'success') {
      console.log(user.data);
      setToken(user.token);
      navigate('/');
    }
  };

  // if (isLoading) return <Spinner />;
  // if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="container p-3 my-5 h-custom">
      {isLoading && <Spinner />}
      <div className="row">
        <div className="col-12 col-md-6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </div>

        <div className="col-12 col-md-6">
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

            <button className="btn btn-primary btn-floating me-2">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button className="btn btn-primary btn-floating me-2">
              <i className="fab fa-twitter"></i>
            </button>

            <button className="btn btn-primary btn-floating me-2">
              <i className="fab fa-linkedin-in"></i>
            </button>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          <div className="form-floating mb-4">
            <input
              className="form-control"
              type="email"
              id="email"
              placeholder=" "
              value={email}
              onChange={handleEmailChange}
              style={{ boxShadow: '0 0 5px #ADD8E6' }}
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-4">
            <input
              className="form-control"
              type="password"
              id="password"
              placeholder=" "
              value={password}
              onChange={handlePasswordChange}
              style={{ boxShadow: '0 0 5px #ADD8E6' }}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="d-flex justify-content-between mb-1">
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ boxShadow: '0 0 5px #ADD8E6' }}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>
            <Link to="/forgotPassword" className="text-decoration-none">
              Forgot password?
            </Link>
          </div>

          <div className="text-center text-md-start mt-2 pt-2">
            <button
              className="btn btn-danger mb-1 px-5"
              size="lg"
              onClick={handleSubmit}
            >
              Login
            </button>
            <p className="small fw-bold mt-2 pt-1 mb-2">
              Don't have an account?
              <a href="/signup" className="text-decoration-none text-danger">
                {' '}
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
