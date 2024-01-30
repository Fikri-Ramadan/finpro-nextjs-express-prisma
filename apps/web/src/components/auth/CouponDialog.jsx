'use client';

import { Puzzle, TicketPercent } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import useCoupons from '@/hooks/useCoupons';

export default function CouponDialog() {
  const { data, isLoading } = useCoupons();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="pl-[8px] py-[4px] flex items-center cursor-pointer">
          <Puzzle className="mr-2 h-4 w-4" />
          <span className="text-sm">Coupons</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your Coupons</DialogTitle>
          <DialogDescription>There are {data?.length || 0} coupons left!</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data.map((coupon, id) => {
            return (
              <div
                key={id}
                className="w-full flex items-center justify-between p-4 border-2 border-slate-500 rounded-sm"
              >
                <div className='flex flex-col gap-2'>
                  <span className="text-xl font-bold text-blue-900">
                    {coupon.discountPercentage}% Off
                  </span>
                  <span className='text-slate-600 text-sm'>Expiry in {new Date(coupon.expiryDate).toLocaleString('en-US')}</span>
                </div>
                <TicketPercent className='text-blue-900 w-12 h-12' />
              </div>
            );
          })
        )}

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close!
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
