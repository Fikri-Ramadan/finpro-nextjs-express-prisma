import AllOrders from '@/components/dashboard/AllOrders';
import Sidebar from '@/components/dashboard/Sidebar';

export default function OrderPage() {
  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <div className="min-w-[80px]">
        <Sidebar />
      </div>
      {/* main */}
      <div className="max-w-4/5">
        <AllOrders />
      </div>
    </div>
  );
}
