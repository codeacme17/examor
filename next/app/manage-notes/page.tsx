'use client'

import { useState } from 'react'
import { Header } from '@/components/share/header'
import { NoteTable } from './_components/note-table'
import { FileManager } from './_components/file-manager'
import { NoteContextProps, NoteContextProvider } from './_context/note-context'
import { TransitionAnimate } from '@/components/transition-animate'

export interface Note {
  id: string
  name: string
  icon: string
  upload_date: string
}

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

const ManageNotes = () => {
  const [tab, setTab] = useState<'note' | 'file'>('note')
  const [note, setNote] = useState<Note | null>(null)

  const handleClickSetting = (note: Note) => {
    if (tab !== 'note' && !note) return
    setNote(note)
    setTab('file')
  }

  const contextValue: NoteContextProps = {
    note: note!,
    setNote,
    onBack: () => setTab('note'),
  }

  return (
    <section>
      <NoteContextProvider value={contextValue}>
        <Header
          title="Manage Notes"
          subTitle="You can manage your notes here"
        />
        {tab === 'note' ? (
          <TransitionAnimate key={tab} initial={{ x: -20 }}>
            <NoteTable notes={notes} onSettingClick={handleClickSetting} />
          </TransitionAnimate>
        ) : (
          <TransitionAnimate key={tab}>
            <FileManager />
          </TransitionAnimate>
        )}
      </NoteContextProvider>
    </section>
  )
}

export default ManageNotes
