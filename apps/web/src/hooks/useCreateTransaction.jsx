import customAxios from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'next-client-cookies';

export default function useCreateTransaction() {
  const cookies = useCookies();
  const token = cookies.get('token');

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ['transaction'],
    mutationFn: async ({ eventId, usedPoint, couponId }) => {
      if (!token) {
        return null;
      }

      const response = await customAxios.post(
        '/api/transactions',
        {
          eventId,
          usedPoint,
          couponId: couponId || '',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response?.data?.results;
    },
  });

  return {
    mutate,
    isPending,
    isError,
  };
}
