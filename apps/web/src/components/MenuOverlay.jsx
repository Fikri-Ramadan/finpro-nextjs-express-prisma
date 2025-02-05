'use client';

import React from 'react';
import NavLinkComp from './NavLinkComp';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import useAuth from '@/hooks/useAuth';

const MenuOverlay = ({ links }) => {
  const { isAuthenticated } = useAuth();

  return (
    <ul className="flex flex-col py-4 items-center p-4 font-medium">
      {links.map((link, i) => (
        <li key={i}>
          <NavLinkComp href={link.href} name={link.name} />
        </li>
      ))}
      {!isAuthenticated && (
        <li>
          <Link href={'/login'} className={cn(buttonVariants())}>
            Login
          </Link>
        </li>
      )}
    </ul>
  );
};

export default MenuOverlay;
