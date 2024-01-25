'use client';

import { Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import useSession from '@/hooks/useSession';

export function DialogLogout() {
  const { refetch } = useSession();
  const cookies = useCookies();
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Logout</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Logout!</DialogTitle>
          <DialogDescription>Are you sure to Sign Out ?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            onClick={() => {
              cookies.remove('token');
              refetch();
              router.push('/login');
              router.refresh();
            }}
          >
            Yes!
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              No!
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
