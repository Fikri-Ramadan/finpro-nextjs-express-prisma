import { User } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { DialogLogout } from './DialogLogout';

export default function ProfileDropDown({ username }) {
  return (
    <DropdownMenu  >
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
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </ DropdownMenuGroup>
        <DropdownMenuSeparator />
          <DialogLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
