import { useQuery } from '@tanstack/react-query';
import { getAllProducts, getProduct } from '../services/productAPI';

export function useProducts() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  return { products, error, isLoading };
}

export function useProductDatails(id: string = '') {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProduct(id),
  });

  return { product, error, isLoading };
}
