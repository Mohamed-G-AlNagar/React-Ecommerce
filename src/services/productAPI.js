import axios from 'axios';

export async function getAllProducts() {
  const { data: response, error } = await axios
    .get('https://m-alnagar.onrender.com/api/v1/products/')
    .catch((err) => {
      console.error(err.message);
      throw Error(err);
    });

  if (!error) {
    console.log(response.data.data);
    return response.data.data;
  }
}

export async function getProduct(id) {
  const { data: response, error } = await axios
    .get(`https://m-alnagar.onrender.com/api/v1/products/${id}`)
    .catch((err) => {
      console.error(err.message);
      throw Error(err);
    });

  if (!error) {
    console.log(response);
    return response.data.data;
  }
}
// export async function getAllProducts() {
//   const { data, error } = await axios
//     .get('https://dummyjson.com/products')
//     .catch((err) => {
//       console.error(err.message);
//       throw Error(err);
//     });
//   if (!error) {
//     console.log(data.products);

//     return data.products;
//   }
// }
