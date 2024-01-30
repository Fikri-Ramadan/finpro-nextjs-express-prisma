import EventList from '@/components/dashboard/EventList';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <div className="min-w-[80px]">
        <Sidebar />
      </div>
      {/* main */}
      <div className="max-w-4/5">
        <EventList />
      </div>
    </div>
  );
}
