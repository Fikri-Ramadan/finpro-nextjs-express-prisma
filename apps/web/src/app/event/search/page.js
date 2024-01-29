import HeroSection from '@/components/HeroSection';
import ListEventSection from '@/components/ListEventSection';
import SearchBarEvent from '@/components/SearchBarEvent';
import customAxios from '@/lib/axios';
// import { useState } from 'react';

export default async function searchEvent({ searchParams }) {
  const response = await customAxios.get(
    `/api/events?name=${searchParams.name}`,
  );
  const searchEvents = await response?.data?.results;

  return (
    <section>
      <HeroSection />
      <SearchBarEvent />
      <ListEventSection apiEvents={searchEvents} />
    </section>
  );
}
