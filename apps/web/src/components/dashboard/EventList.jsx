'use client';

import useEventByOrganizer from '@/hooks/useEventByOrganizer';
import ListEventSection from '../ListEventSection';

export default function EventList() {
  const { data, isLoading } = useEventByOrganizer();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <ListEventSection apiEvents={data} />;
}
