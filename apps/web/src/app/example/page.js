'use client';

import { Button } from '@/components/ui/button';
import useSession from '@/hooks/useSession';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ExamplePage() {
  const [isLoading, setLoading] = useState(false);
  const cookies = useCookies();
  const router = useRouter();

  if (isLoading) {
    return <h1 className="py-32">loading...</h1>;
  }

  return (
    <div className="py-16">
      <Button
        onClick={() => {
          cookies.remove('token');
          router.push('/login');
        }}
      >
        Logout
      </Button>
    </div>
  );
}
