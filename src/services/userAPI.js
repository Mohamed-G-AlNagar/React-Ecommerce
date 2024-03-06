import axios from 'axios';
import toast from 'react-hot-toast';
import { getCartById } from './cartAPI';

export async function userLogin(userData) {
  const { data } = await axios
    .post('https://m-alnagar.onrender.com/api/v1/users/login', userData)
    .catch((err) => {
      toast.error(err.response.data.ErrMessage);
      console.log(err.response.data);
      return err.response.data;
    });
  // console.log(data);
  if (data?.status === 'success') {
    toast.success(data.message);
    localStorage.setItem('token', data.token);
    const cart = await getCartById();
    localStorage.setItem('cartId', cart._id);
  }
  return data;
}
export async function userSignup(userData) {
  const { data } = await axios
    .post('https://m-alnagar.onrender.com/api/v1/users/signup', userData)
    .catch((err) => {
      toast.error(err.response.data.ErrMessage);
      console.log(err.response.data);
      return err.response.data;
    });
  // console.log(data);
  if (data?.status === 'success') {
    toast.success(data.message);
  }
  return data;
}
