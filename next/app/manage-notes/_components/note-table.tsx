import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Settings } from 'lucide-react'

export const NoteTable = () => {
  const notes = [
    {
      id: '1',
      title: 'Note 1',
      status: 'Draft',
      method: 'Credit Card',
      amount: 250.0,
    },
    {
      id: '2',
      title: 'Note 2',
      status: 'Paid',
      method: 'Credit Card',
      amount: 250.0,
    },
  ]

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[130px]">Name</TableHead>
          <TableHead></TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
