import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import { MdiIcon } from '@/components/mdi-icon'

export const NoteTable = () => {
  const notes = [
    {
      id: '1',
      name: 'Vuejs',
      icon: 'mdi-vuejs',
      upload_date: '2024-02-02',
    },
    {
      id: '2',
      name: 'javascript',
      icon: 'mdi-language-javascript',
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
            <TableCell className="font-medium">
              <div className="flex items-center">
                <MdiIcon icon={note.icon} size="1.5rem" className="mr-2" />
                {note.name}
              </div>
            </TableCell>
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
