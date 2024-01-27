'use client';

import useSession from '@/hooks/useSession';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import ProfileDropDown from './ProfileDropDown';
import useAuth from '@/hooks/useAuth';

export default function ProfileSection() {
  const { userDetails, isAuthenticated, isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isAuthenticated ? (
        <ProfileDropDown username={userDetails?.username} />
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
