import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Settings, Trash2 } from 'lucide-react'

export const NoteTable = () => {
  const notes = [
    {
      id: '1',
      name: 'Note 1',
      icon: 'Draft',
      upload_date: '2024-02-02',
    },
    {
      id: '2',
      name: 'Note 2',
      icon: 'Paid',
      upload_date: '2024-02-02',
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Create Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notes.map((note) => (
          <TableRow key={note.id}>
            <TableCell className="font-medium">{note.name}</TableCell>
            <TableCell className="text-right">{note.upload_date}</TableCell>
            <TableCell className="text-right w-[120px]">
              <Button size={'icon'} variant={'ghost'}>
                <Settings size={20} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
