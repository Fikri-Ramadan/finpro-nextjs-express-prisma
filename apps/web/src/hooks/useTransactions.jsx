import customAxios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'next-client-cookies';

export default function useTransactions() {
  const cookies = useCookies();
  const token = cookies.get('token');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      if (!token) {
        return null;
      }
      const response = await customAxios.get('/api/user/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response?.data?.results;
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
