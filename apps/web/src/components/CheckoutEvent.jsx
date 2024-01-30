'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import useEventById from '@/hooks/useEventById';
import { FaCalendarAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import useCoupons from '@/hooks/useCoupons';
import useAuth from '@/hooks/useAuth';
import useCreateTransaction from '@/hooks/useCreateTransaction';
import { Loader2 } from 'lucide-react';
import { useToast } from './ui/use-toast';

export default function CheckoutEvent({ id }) {
  const { toast } = useToast();
  const { data: coupons, isLoading: couponLoading } = useCoupons();
  const { userDetails } = useAuth();
  const { points } = userDetails;
  const { data, isLoading } = useEventById({ id });
  const { mutate, isPending } = useCreateTransaction();
  const [usedPoint, setUsedPoint] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [totalPrice, setTotalPrice] = useState(data?.price);

  useEffect(() => {
    if (!isLoading && !couponLoading) {
      if (!!coupon) {
        setTotalPrice((prev) => {
          return data.price - (data.price * coupon.discountPercentage) / 100;
        });
      }
      if (usedPoint) {
        setTotalPrice((prev) => {
          if (prev - points <= 0) {
            return 0;
          } else {
            return prev - points;
          }
        });
      }
    }
  }, [coupon, usedPoint, points, couponLoading, isLoading, data.price]);

  const handleCheckout = () => {
    mutate(
      { eventId: data?.id, usedPoint, couponId: coupon?.id || '' },
      {
        onSuccess: () => {
          toast({
            variant: 'success',
            title: 'Purchase Successfully!',
            description: 'You can check on transaction history',
          });
          location.reload();
        },
        onError: (error) => {
          toast({
            variant: 'destructive',
            title: 'Failed!',
            description: error.response.data.message,
          });
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Purchase</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Checkout!</DialogTitle>
          <DialogDescription>
            {/* There are {data?.length || 0} coupons left! */}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="flex justify-between">
              <span>{data.name}</span>

              <span>
                <span className={(coupon || usedPoint) && 'line-through'}>
                  Rp. {data.price || 'FREE'}
                </span>
                {/* {(!!coupon || usedPoint) && (
                  <span className="pl-2">
                    Rp.{' '}
                    {(data.price -
                      (!!coupon &&
                        (data.price * coupon.discountPercentage) / 100) -
                      (usedPoint && points)) }
                  </span>
                )} */}
                {/* {!!coupon ? (
                  <span className="pl-2">
                    {data.price -
                      (data.price * coupon.discountPercentage) / 100}
                  </span>
                ) : (
                  <span></span>
                )} */}
                {(!!coupon || usedPoint) && (
                  <span className="pl-2">{totalPrice}</span>
                )}
              </span>
            </div>
            <div className="mt-4 flex gap-2 md:gap-3 items-center">
              <div className='"mx-2 flex items-center"'>
                <FaCalendarAlt />
              </div>
              <div className="text-sm flex flex-wrap items-center justify-center">
                <p>{new Date(data?.startEvent).toLocaleString('en-US')}</p>
              </div>
              <span>-</span>
              <div className="text-sm flex flex-wrap items-center justify-center">
                <p>{new Date(data?.endEvent).toLocaleString('en-US')}</p>
              </div>
            </div>
            {data?.eventType === 'PAID' && (
              <>
                <div className="mt-4 flex gap-2 items-center">
                  <Checkbox
                    onCheckedChange={(e) => setUsedPoint(e)}
                    disabled={points === 0}
                  />
                  <span>
                    Using Point ?{' '}
                    <span className="text-slate-400">
                      (you have Rp. {points} points.)
                    </span>
                  </span>
                </div>
                <div className="mt-4 w-full flex flex-col items-start gap-2">
                  <span>Using Coupon ?</span>
                  <Select onValueChange={(e) => setCoupon(e)}>
                    <SelectTrigger className="w-full border-slate-400">
                      {couponLoading ? (
                        <SelectValue placeholder="Fetching your coupons" />
                      ) : (
                        <SelectValue
                          placeholder={`You have ${coupons?.length || 0} Coupons!`}
                        />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={null}>none</SelectItem>
                      {coupons?.map((coupon, i) => {
                        return (
                          <SelectItem key={i} value={coupon}>
                            {coupon?.discountPercentage}% Off ( expiry in :{' '}
                            {new Date(coupon?.expiryDate).toLocaleString(
                              'en-US',
                            )}
                            )
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <Button
              className="w-full mt-4"
              disabled={isPending}
              onClick={handleCheckout}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Purchase'
              )}
            </Button>
          </div>
        )}

        {/* <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close!
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
