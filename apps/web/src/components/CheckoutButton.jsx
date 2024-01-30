'use client';

import { useCookies } from 'next-client-cookies';
import CheckoutEvent from './CheckoutEvent';
import useTransactions from '@/hooks/useTransactions';
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { Button } from './ui/button';
import useEventById from '@/hooks/useEventById';

export default function CheckoutButton({ id }) {
  const { isAuthenticated, isLoading: loadingAuth } = useAuth();
  const { data: event, isLoading: loadingEvent } = useEventById({ id });

  const { data, isLoading } = useTransactions();
  const [eventPurchased, setEventPurchased] = useState([]);

  useEffect(() => {
    if (!isLoading || isAuthenticated || data?.length > 0) {
      setEventPurchased(data?.map((transaction) => transaction.eventId));
    } else {
      setEventPurchased([]);
    }
  }, [data, isLoading, isAuthenticated]);

  if (isLoading || loadingAuth || loadingEvent) {
    return <Button disabled>Loading...</Button>;
  }

  if (!isAuthenticated) {
    return <div>You need logged in for purchasing!</div>;
  }

  if (!isLoading && eventPurchased?.includes(id)) {
    return <Button disabled>You are already purchase</Button>;
  }

  if (event.availableSeat <= 0) {
    return <Button disabled>Sold Out!</Button>;
  }

  return <CheckoutEvent id={id} />;
}
