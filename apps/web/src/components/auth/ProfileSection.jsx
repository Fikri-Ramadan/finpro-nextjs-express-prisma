'use client';

import useSession from '@/hooks/useSession';
import { SessionContext } from '@/provider/SessionProvider';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { DialogLogout } from './DialogLogout';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import ProfileDropDown from './ProfileDropDown';

export default function ProfileSection() {
  const { userDetails } = useContext(SessionContext);
  const { isAuthenticated } = userDetails;
  const { isLoading } = useSession();

  return (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isAuthenticated ? (
        <>
          {/* <Avatar className='mr-4 bg-slate-800 cursor-pointer'>
            <AvatarFallback className='text-slate-900'>
              {userDetails?.username[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar> */}
          <ProfileDropDown username={userDetails?.username} />
          {/* <DialogLogout /> */}
        </>
      ) : (
        <Link
          href="/login"
          className={cn(
            buttonVariants(),
            'hidden lg:flex items-center justify-center',
          )}
        >
          Login
        </Link>
      )}
    </>
  );
}
