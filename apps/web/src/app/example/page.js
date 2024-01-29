'use client';

import Example from '@/components/Example';
import { Button } from '@/components/ui/button';
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
      <Example />
    </div>
  );
}
