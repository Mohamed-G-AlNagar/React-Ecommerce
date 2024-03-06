import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addItemToCart,
  deleteItemFromCart,
  getCartById,
} from '../services/cartAPI';
import toast from 'react-hot-toast';

export function useCart() {
  // const token = localStorage.getItem('token') || '';

  //? 3- use useQuery to fetch the data using pre made function() and store in the cash
  // prettier-ignore
  const { data, isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartById,
  });

  return { data, isLoading, error };
}

export function useAddItemToCart() {
  //? to use it to invalidate the quire to update the data after insterting in the DB
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (newItemId: string) => addItemToCart(newItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate };
}

export function useRemoveItemFromCart() {
  interface MutationFnParams {
    itemId: string;
    quantity?: number;
  }
  //? to use it to invalidate the quire to update the data after insterting in the DB
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ itemId, quantity = 1 }: MutationFnParams) =>
      deleteItemFromCart(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },

    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return { mutate };
}
