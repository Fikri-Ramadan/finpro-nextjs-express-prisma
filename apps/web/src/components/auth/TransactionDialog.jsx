'use client';

import { ArrowLeftRight } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useTransactions from '@/hooks/useTransactions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TransactionDialog() {
  const [isOpen, setOpen] = useState(false);
  const { data, isLoading } = useTransactions();
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <div className="pl-[8px] py-[4px] flex items-center cursor-pointer">
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          <span className="text-sm">History Transactions</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[500px] overflow-y-scroll flex flex-col justify-center items-center">
        <DialogHeader>
          <DialogTitle className='text-center'>Your Transaction History</DialogTitle>
          <DialogDescription className='text-center'>
            You have {data?.length || 0} transactions!
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[300px] w-[300px] sm:w-full">
          <Table>
            {/* <TableCaption>A list of your recent transactions.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Event Name</TableHead>
                <TableHead>Amount Paid</TableHead>
                <TableHead>Point Used</TableHead>
                <TableHead>Discount Applied</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-scroll">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                data?.map((transaction, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell
                        className="hover:cursor-pointer hover:underline"
                        onClick={() => {
                          router.push(`/event/${transaction.event.id}`);
                          router.refresh('');
                          setOpen(false);
                        }}
                      >
                        {transaction.event.name}
                      </TableCell>
                      <TableCell>
                        Rp.{' '}
                        {Intl.NumberFormat('id-ID').format(
                          transaction?.amountPaid,
                        ) || 'Free'}
                      </TableCell>
                      <TableCell>{transaction.pointUsed || 0}</TableCell>
                      <TableCell>{transaction.discountApplied || 0}%</TableCell>
                      <TableCell>
                        {new Date(transaction.date).toLocaleString('en-US')}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* <DialogFooter className="sm:justify-start">
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
