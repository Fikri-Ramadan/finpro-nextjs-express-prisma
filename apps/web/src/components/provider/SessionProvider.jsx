'use client';

import { useCookies } from 'next-client-cookies';
import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '../ui/use-toast';
import customAxios from '@/lib/axios';

const SessionContext = createContext(null);

export default function SessionProvider({ children }) {
  const [decodedSession, setDecodedSession] = useState({});
  const cookies = useCookies();
  const { toast } = useToast();

  useEffect(() => {
    const token = cookies.get('token');

    if (!token) {
      setDecodedSession(null);
      return;
    }

    const getUser = async () => {
      try {
        const res = await customAxios.get('/api/auth/verifyToken', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDecodedSession(res.data.results);
      } catch (error) {
        // console.log(error);
        toast({
          variant: 'destructive',
          title: 'Invalid token!',
          description: error?.response?.data?.error,
        });
      }
    };

    getUser();
  }, [cookies, toast]);

  return (
    <SessionContext.Provider value={decodedSession}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
