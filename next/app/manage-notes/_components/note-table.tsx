'use client'

import { memo } from 'react'
import { Settings } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { MdiIcon } from '@/components/mdi-icon'
import { Note } from '../page'

interface NoteTableProps {
  notes: Note[]
  onSettingClick: (note: Note) => void
}

export const NoteTable = memo((props: NoteTableProps) => {
  const { notes, onSettingClick } = props

  const handleClickSetting = (note: Note) => {
    onSettingClick(note)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Create Date</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {notes.map((note) => (
          <TableRow key={note.id}>
            {/* Note Name */}
            <TableCell className="font-medium">
              <div className="flex items-center">
                <MdiIcon
                  icon={note.icon}
                  size="1.5rem"
                  className="mr-2"
                />
                {note.name}
              </div>
            </TableCell>

            {/* Node Create Date */}
            <TableCell className="text-right">
              {note.upload_date}
            </TableCell>

            {/* Hanlders */}
            <TableCell className="text-right w-[50px]">
              <Button
                size={'icon'}
                variant={'ghost'}
                onClick={() => handleClickSetting(note)}>
                <Settings size={20} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
})

NoteTable.displayName = 'NoteTable'
