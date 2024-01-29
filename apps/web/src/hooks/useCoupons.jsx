import customAxios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'next-client-cookies';

export default function useCoupons() {
  const cookies = useCookies();
  const token = cookies.get('token');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      if (!token) {
        return null;
      }
      const res = await customAxios.get('/api/user/coupons', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res?.data?.results;
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
