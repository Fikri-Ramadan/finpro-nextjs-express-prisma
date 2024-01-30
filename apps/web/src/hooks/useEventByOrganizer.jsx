'use client';

import customAxios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'next-client-cookies';

export default function useEventByOrganizer() {
  const cookies = useCookies();
  const token = cookies.get('token');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`ownedEvent`],
    queryFn: async () => {
      if (!token) {
        return null;
      }

      const response = await customAxios.get('/api/events/organizer', {
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
