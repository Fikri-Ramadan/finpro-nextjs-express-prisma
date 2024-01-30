'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useTransactionByOrganizer from '@/hooks/useTransactionByOrganizer';

export default function AllOrders() {
  const { data, isLoading } = useTransactionByOrganizer();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Table className='mt-16'>
      <TableCaption>A list of all events recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Customer Email</TableHead>
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
                <TableCell>
                  {transaction?.user?.email}
                </TableCell>
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
                  {Intl.NumberFormat('id-ID').format(transaction?.amountPaid) ||
                    'Free'}
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
  );
}
