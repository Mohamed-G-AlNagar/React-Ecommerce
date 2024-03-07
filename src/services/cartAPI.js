import axios from 'axios';
import toast from 'react-hot-toast';
// import { jwtDecode } from 'jwt-decode';

export function createCartForNewUser() { }

export async function getCartById() {
  const token = localStorage.getItem('token') || '';
  if (!token) {
    toast.error('pleasse login First');
    return;
  }

  // const decoded = jwtDecode(token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // 'https://m-alnagar.onrender.com/api/v1/carts/65e0218a05c3ff13431af8a5',
  try {
    const { data } = await axios.get(
      'https://m-alnagar.onrender.com/api/v1/carts/',
      config
    );
    console.log(data, 'data----');
    return data.data.carts[0];
  } catch (error) {
    console.log(error.response.data.ErrMessage);
    toast.error(error.response.data.ErrMessage);
    // throw Error(error.response.data.ErrMessage);
  }
}

export async function addItemToCart(newItemId) {
  const token = localStorage.getItem('token') || '';
  console.log(token);
  if (!token) {
    toast.error('pleasse login First');
    return;
  }

  const cartId = localStorage.getItem('cartId').trim();
  console.log(cartId, 'cartId');
  if (!cartId) {
    toast.error('No Cart');
    return;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const newItem = {
    productId: newItemId,
  };

  try {
    const { data } = await axios.patch(
      `https://m-alnagar.onrender.com/api/v1/carts/addProductToCart/${cartId}`,
      newItem,
      config
    );
    toast.success('Product Successfully Added to Cart');
    return data;
  } catch (error) {
    console.log(error.response.data.ErrMessage);
    toast.error(error.response.data.ErrMessage);
    // toast.error('addItem Error');

    // throw Error(error.response.data.ErrMessage);
  }
}
export async function deleteItemFromCart(itemId, quantity = 1) {
  //? protected route
  const token = localStorage.getItem('token') || '';

  const cartId = localStorage.getItem('cartId');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const item = {
    quantity,
    productId: itemId,
  };

  try {
    const { data } = await axios.patch(
      `https://m-alnagar.onrender.com/api/v1/carts/removeProductFromCart/${cartId}`,
      item,
      config
    );
    toast.success('Product Successfully deleted from Cart');
    return data;
  } catch (error) {
    console.log(error.response.data.Error);
    toast.error(error.response.data.ErrMessage);
    // toast.error('addItem Error');

    // throw Error(error.response.data.ErrMessage);
  }
}
