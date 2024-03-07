import axios from "axios";
import toast from "react-hot-toast";

export async function makeOrder(cartId) {
    const token = localStorage.getItem('token') || '';

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const { data: response, error } = await axios
        .get(`https://m-alnagar.onrender.com/api/v1/orders/checkout-session/${cartId}`, config)
        .catch((err) => {
            console.error(err.message);
            toast.error(err.message);
        });

    console.log(response.data.url);
    return response;

}