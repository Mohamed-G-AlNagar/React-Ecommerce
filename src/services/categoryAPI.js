import axios from 'axios';

export async function getAllCategories() {
  const { data: response, error } = await axios
    .get('https://m-alnagar.onrender.com/api/v1/categories/')
    .catch((err) => {
      console.error(err.message);
      throw Error(err);
    });

  if (!error) {
    console.log(response.data.categories);
    return response.data.categories;
  }
}
