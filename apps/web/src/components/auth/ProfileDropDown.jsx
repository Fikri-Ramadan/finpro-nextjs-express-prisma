import { Banknote, CalendarPlus, LayoutDashboard, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { DialogLogout } from './LogoutDialog';
import CouponDialog from './CouponDialog';
import TransactionDialog from './TransactionDialog';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';

export default function ProfileDropDown({ username, points }) {
  const { userDetails } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="mr-4 bg-slate-800 cursor-pointer">
          <AvatarFallback className="text-slate-900">
            {username[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Hello, {username}! 👋</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userDetails.role === 'ORGANIZER' && (
          <DropdownMenuItem>
            <Link
              href={'/event/create'}
              className="flex justify-between items-center"
            >
              <CalendarPlus className="mr-2 h-4 w-4" />
              <span>Create Event</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link href={'/dashboard'} className='flex justify-between items-center'>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Banknote className="mr-2 h-4 w-4" />
          <span>Points</span>
          <DropdownMenuShortcut>(Rp. {points || 0})</DropdownMenuShortcut>
        </DropdownMenuItem>
        <CouponDialog />
        <TransactionDialog />
        <DialogLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
