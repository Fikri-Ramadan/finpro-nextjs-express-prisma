'use client';

import usePoints from '@/hooks/usePoints';
import useSession from '@/hooks/useSession';
import useTransactions from '@/hooks/useTransactions';
import { useCookies } from 'next-client-cookies';
import { createContext, useEffect, useState } from 'react';

export const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    role: '',
    points: 0,
  });
  const [isAuthenticated, setAuthenticated] = useState(null);

  const cookies = useCookies();
  const [token, setToken] = useState(cookies.get('token'));

  const { data, isLoading, refetch } = useSession();
  const { data: points, isLoading: loadingPoint } = usePoints();

  useEffect(() => {
    if (data) {
      setUserDetails((prev) => {
        return {
          ...prev,
          username: data.username,
          email: data.email,
          role: data.role,
          points: points,
        };
      });
      setAuthenticated(true);
    } else {
      setUserDetails({
        username: '',
        email: '',
        role: '',
        points: 0,
      });
      setAuthenticated(false);
    }
  }, [data, token, setUserDetails, points, refetch]);

  return (
    <SessionContext.Provider
      value={{ userDetails, isAuthenticated, isLoading, refetch }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
