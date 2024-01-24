'use client';

import { useSession } from '@/components/provider/SessionProvider';
import { Button } from '@/components/ui/button';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ExamplePage() {
  const [isLoading, setLoading] = useState(true);
  const session = useSession();
  const cookies = useCookies();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (!session) {
      return router.push('/login');
    }
    setLoading(false);
  }, [session, cookies, router]);

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
