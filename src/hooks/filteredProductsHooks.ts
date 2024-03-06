import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IProduct } from '../models/product';
import { useProducts } from './productHooks';
export function useFilteredCategProducts(filteredCategory: string = 'All') {
  const { products: allProducts } = useProducts();
  // const [filteredCategory, setFilteredCategory] = useState<string>('All');

  const {
    data: fiteredProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['filteredProducts', filteredCategory], // Unique key for the query including the filtered category
    queryFn: () => {
      // Query function
      if (allProducts) {
        return filteredCategory === 'All'
          ? allProducts
          : allProducts.filter(
              (p: IProduct) => p.categoryName === filteredCategory
            );
      }
    },
    enabled: !!allProducts, // Only enable the query when allProducts is available
    staleTime: 60000,
    refetchOnWindowFocus: false, // Disable automatic refetch on window focus
  });

  return { fiteredProducts, isLoading, error };
}

export function useSearchProducts(searchKey: string = '') {
  const { products: allProducts } = useProducts();

  const {
    data: filteredProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['filteredSearchProducts', searchKey], // Unique key for the query including the filtered category
    queryFn: () => {
      // Query function
      if (allProducts) {
        return searchKey === ''
          ? allProducts
          : allProducts.filter((p: IProduct) =>
              p.productName
                .toLocaleLowerCase()
                .startsWith(searchKey.toLocaleLowerCase())
            );
      }
    },
    enabled: !!allProducts, // Only enable the query when allProducts is available
    staleTime: 60000,
    refetchOnWindowFocus: false, // Disable automatic refetch on window focus
  });

  return { filteredProducts, isLoading, error };
}

export function useFilteredCategProductsMutator() {
  const { products: allProducts, isLoading, error } = useProducts();
  console.log(allProducts, 'allProducts-----------');
  const queryClient = useQueryClient();

  let filteredProducts: IProduct[] = []; // Initialize with an empty array

  const { mutate } = useMutation({
    mutationKey: ['filteredProducts'],
    mutationFn: async (category: string = 'All') => {
      // Mutate function
      console.log(category, 'cat from mutate');
      if (category === 'All') {
        filteredProducts = allProducts;
      }
      filteredProducts = allProducts.filter(
        (p: IProduct) => p.categoryName === category
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filteredProducts'] });
    },
  });

  return { filteredProducts, isLoading, error, mutate };
}
