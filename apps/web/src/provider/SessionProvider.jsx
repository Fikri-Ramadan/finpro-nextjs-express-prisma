'use client';

import useSession from '@/hooks/useSession';
import { useCookies } from 'next-client-cookies';
import { createContext, useEffect, useState } from 'react';

export const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    role: '',
  });
  const [isAuthenticated, setAuthenticated] = useState(null);

  const cookies = useCookies();
  const token = cookies.get('token');

  const { data, isLoading } = useSession();

  useEffect(() => {
    if (data) {
      setUserDetails((prev) => {
        return {
          ...prev,
          username: data.username,
          email: data.email,
          role: data.role,
        };
      });
      setAuthenticated(true);
    } else {
      setUserDetails({
        username: '',
        email: '',
        role: '',
      });
      setAuthenticated(false);
    }
  }, [data, token, setUserDetails]);

  return (
    <SessionContext.Provider
      value={{ userDetails, isAuthenticated, isLoading }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
