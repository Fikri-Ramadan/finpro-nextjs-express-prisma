import customAxios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export default function useCategory() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await customAxios.get('/api/categories');
      return res.data.results;
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
