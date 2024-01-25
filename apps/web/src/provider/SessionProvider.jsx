'use client';

import useSession from '@/hooks/useSession';
import { useCookies } from 'next-client-cookies';
import { createContext, useEffect, useState } from 'react';

export const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    token: null,
    isAuthenticated: false,
  });

  const cookies = useCookies();
  const token = cookies.get('token');

  const { data } = useSession();

  useEffect(() => {
    if (data) {
      setUserDetails((prev) => {
        return {
          ...prev,
          username: data.username,
          email: data.email,
          token: token,
          isAuthenticated: true,
        };
      });
    } else {
      setUserDetails({
        username: '',
        email: '',
        token: null,
        isAuthenticated: false,
      });
    }
  }, [data, token, setUserDetails]);

  return (
    <SessionContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
