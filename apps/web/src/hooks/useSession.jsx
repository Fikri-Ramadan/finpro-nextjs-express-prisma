'use client';

import customAxios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'next-client-cookies';
import { useEffect, useRef } from 'react';

const useSession = () => {
  const cookies = useCookies();
  const token = cookies.get('token');
  const queryRef = useRef();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!token) {
        return null;
      }
      try {
        const res = await customAxios.get('/api/auth/verifyToken', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return res.data.results;
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
  });

  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [token]);

  return { data, isLoading, isError, refetch };
};

export default useSession;
