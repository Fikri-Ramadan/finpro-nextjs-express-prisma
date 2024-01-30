'use client';

import {
  ArrowLeftRight,
  CalendarPlus,
  ChevronRight,
  LayoutDashboard,
} from 'lucide-react';
import { Nav } from '../ui/nav';
import { useState } from 'react';
import { Button } from '../ui/button';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] px-3 pb-10 pt-16">
      <div className="absolute right-[20px] top-7">
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className=" rounded-full p-2"
        >
          <ChevronRight />
        </Button>
      </div>
      <Nav
        // isCollapsed={mobileWidth ? true : isCollapsed}
        isCollapsed={isCollapsed}
        links={[
          {
            title: 'List Events',
            href: '/dashboard',
            icon: LayoutDashboard,
            variant: 'default',
          },
          {
            title: 'Create Events',
            href: '/dashboard/create',
            icon: CalendarPlus,
            variant: 'ghost',
          },
          {
            title: 'All Orders',
            href: '/dashboard/orders',
            icon: ArrowLeftRight,
            variant: 'ghost',
          },
        ]}
      />
    </div>
  );
}
