'use client';

import { LogOut } from 'lucide-react';

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
  const cookies = useCookies();
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex items-center pl-[10px] cursor-pointer'>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </div>
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
