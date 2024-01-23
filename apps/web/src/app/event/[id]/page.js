import { useSearchParams } from 'next/navigation';

export default function EventDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  return <div>{id}</div>;
}
