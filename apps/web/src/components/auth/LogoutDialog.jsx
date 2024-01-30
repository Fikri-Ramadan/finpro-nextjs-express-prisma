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

export function DialogLogout() {
  const cookies = useCookies();
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex items-center pl-[8px] py-[4px] cursor-pointer'>
          <LogOut className="mr-2 h-4 w-4" />
          <span className='text-sm'>Log out</span>
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
              // router.push('/login');
              // router.refresh();
              location.reload();
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
