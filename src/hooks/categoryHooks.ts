import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../services/categoryAPI';

export function useCategories() {
  // prettier-ignore
  const { data: categories, isLoading, error } = useQuery({
      queryKey: ['categories'],
      queryFn: getAllCategories,
    });

  return { categories, error, isLoading };
}

export function useSetSelectedCategory(seleCategory: string) {
  // prettier-ignore
  const { data: category, isLoading, error } = useQuery({
      queryKey: ['category'],
      queryFn: ()=>seleCategory,
    });

  return { category, error, isLoading };
}
