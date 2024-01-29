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
import { Button } from '../ui/button';
import useTransactions from '@/hooks/useTransactions';

export default function TransactionDialog() {
  const { data, isLoading } = useTransactions();

  return (
    <Dialog className="w-[1000px]">
      <DialogTrigger asChild>
        <div className="pl-[8px] py-[4px] flex items-center cursor-pointer">
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          <span className="text-sm">History Transactions</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Your Transaction History</DialogTitle>
          <DialogDescription>
            You have {data?.length || 0} transactions!
          </DialogDescription>
        </DialogHeader>

        <Table>
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Invoice</TableHead>
              <TableHead>Amount Paid</TableHead>
              <TableHead>Point Used</TableHead>
              <TableHead>Discount Applied</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              data.map((transaction, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell className="hover:cursor-pointer hover:underline">
                      {transaction.event.name}
                    </TableCell>
                    <TableCell>
                      Rp. {transaction.amountPaid || 'Free'}
                    </TableCell>
                    <TableCell>{transaction.pointUsed || 0}</TableCell>
                    <TableCell>{transaction.discountApplied || 0}</TableCell>
                    <TableCell>
                      {new Date(transaction.date).toLocaleString('en-US')}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

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
