import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Link, useNavigate } from 'react-router-dom';
import { ISignupUserData } from '../../models/signupUserData';
import { userSignup } from '../../services/userAPI';
function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    mode: 'onBlur',
  });

  const { errors } = formState;

  async function onSubmit(data) {
    console.log(data);
    const userData = {
      ...data,
      addresses: [data.addresses],
    };

    const resData = await userSignup(userData);
    console.log(resData);
    if (resData?.status === 'success') {
      console.log(resData);
      navigate('/login');
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <div className="container-fluid">
      <div className="card text-black m-5" style={{ borderRadius: '25px' }}>
        <div className="card-body">
          <div className="row">
            <Form
              className="col-md-10 col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-center"
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Sign up
              </p>
              <div
                className={`form-floating ${errors.userName ? 'mb-1' : 'mb-4'}`}
                style={{ width: '70%', boxShadow: '0 0 5px #ADD8E6' }}
              >
                <input
                  type="text"
                  className={`form-control ${
                    errors.userName ? 'is-invalid mb-0' : ''
                  }`}
                  id="userName"
                  placeholder=""
                  {...register('userName', {
                    required: 'Please enter your user name',
                    min: {
                      value: 3,
                      message: ' name must be at least 3 characters',
                    },
                  })}
                />
                <label htmlFor="userName">User Name</label>
                <span className="m-0 fa-sm" style={{ color: 'red' }}>
                  {errors?.userName?.message}
                </span>
              </div>

              <div
                className={`form-floating ${errors.email ? 'mb-1' : 'mb-4'}`}
                style={{ width: '70%', boxShadow: '0 0 5px #ADD8E6' }}
              >
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder=""
                  {...register('email', {
                    required: 'Please enter your email',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                />
                <label htmlFor="email">Your Email</label>
                <span className="m-0 fa-sm" style={{ color: 'red' }}>
                  {errors?.email?.message}
                </span>
              </div>

              <div
                className={`form-floating ${errors.password ? 'mb-1' : 'mb-4'}`}
                style={{ width: '70%', boxShadow: '0 0 5px #ADD8E6' }}
              >
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder=""
                  {...register('password', {
                    required: 'Please enter your password',
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[.,\-#_])(?=.*\d).{8,}$/,
                      message:
                        'must contain at least one lower char, upper char, special char(.,-,#,_), one number, and min 8 char',
                    },
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="m-0 fa-sm" style={{ color: 'red' }}>
                  {errors?.password?.message}
                </span>
              </div>

              <div
                className={`form-floating ${
                  errors.passwordConfirm ? 'mb-1' : 'mb-4'
                }`}
                style={{ width: '70%', boxShadow: '0 0 5px #ADD8E6' }}
              >
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirm"
                  placeholder=""
                  {...register('passwordConfirm', {
                    required: 'Please enter your password Confrimination',
                    validate: (value) =>
                      getValues().password === value ||
                      'Passwords are not same',
                  })}
                />
                <label htmlFor="passwordConfirm">Repeat your password</label>
                <span className="m-0 fa-sm" style={{ color: 'red' }}>
                  {errors?.passwordConfirm?.message}
                </span>
              </div>
              <div
                className={`form-floating ${
                  errors.addresses ? 'mb-1' : 'mb-4'
                }`}
                style={{ width: '70%', boxShadow: '0 0 5px #ADD8E6' }}
              >
                <input
                  type="text"
                  className="form-control"
                  id="addresses"
                  placeholder=""
                  {...register('addresses', {
                    required: 'Please Ender Your  Address',
                  })}
                />
                <label htmlFor="addresses">Your Address</label>
                <span className="m-0 fa-sm" style={{ color: 'red' }}>
                  {errors?.addresses?.message}
                </span>
              </div>
              <div
                className={`form-floating ${errors.phone ? 'mb-1' : 'mb-4'}`}
                style={{ width: '70%', boxShadow: '0 0 5px #ADD8E6' }}
              >
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder=""
                  {...register('phone', {
                    required: 'Please Ender Your Phone Number',
                    pattern: {
                      value: /^01[0125][0-9]{8}$/,
                      message:
                        'Please enter a valid phone number 0/10-11-12-15',
                    },
                  })}
                />
                <label htmlFor="phone">Your Phone Num</label>
                <span style={{ color: 'red' }}>{errors?.phone?.message}</span>
              </div>

              <button className="btn btn-primary mb-1" type="submit">
                Register
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Have an account ?
                <Link to="/login" className="link-danger">
                  {' '}
                  Login
                </Link>
              </p>
            </Form>

            <div className="col-md-10 col-lg-6 order-1 order-lg-2 d-flex align-items-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                className="img-fluid"
                alt="Signup illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
