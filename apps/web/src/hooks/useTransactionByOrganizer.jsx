import customAxios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'next-client-cookies';

export default function useTransactionByOrganizer() {
  const cookies = useCookies();
  const token = cookies.get('token');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['transactionByOrg'],
    queryFn: async () => {
      if (!token) {
        return null;
      }

      const response = await customAxios.get('/api/transactions/organizer', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.results)

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
