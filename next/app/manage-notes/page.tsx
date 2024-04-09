'use client'

import { Suspense, useState } from 'react'
import { Header } from '@/components/share/header'
import { NoteTable } from './_components/note-table'
import { FileManager } from './_components/file-manager'
import { NoteContextProps, NoteContextProvider } from './_context/note-context'
import { TransitionAnimate } from '@/components/transition-animate'
import { Skeleton } from '@/components/ui/skeleton'
import { useNoteStore } from '@/store'
import type { TNote } from '@prisma/client'

const ManageNotes = () => {
  const noteStore = useNoteStore()

  const [note, setNote] = useState<TNote | null>(null)
  const [tab, setTab] = useState<'note' | 'file'>('note')

  const handleClickSetting = (note: TNote) => {
    if (tab !== 'note' && !note) return
    setNote(note)
    setTab('file')
  }

  const contextValue: NoteContextProps = {
    note: note!,
    setNote,
    onBack: () => setTab('note'),
    changeIcon: (icon: string) => {
      if (!note) return
      setNote({ ...note, icon })
    },
  }

  return (
    <section>
      <NoteContextProvider value={contextValue}>
        <Header
          title="Manage Notes"
          subTitle="You can manage your notes here"
        />

        {noteStore.isFetching ? (
          <Skeleton className="h-20 w-full rounded-xl" />
        ) : tab === 'note' ? (
          <TransitionAnimate key={tab} initial={{ x: -20 }}>
            <NoteTable
              notes={noteStore.notes}
              onSettingClick={handleClickSetting}
            />
          </TransitionAnimate>
        ) : (
          <TransitionAnimate key={tab}>
            <Suspense
              fallback={<Skeleton className="h-20 w-full rounded-xl" />}>
              <FileManager noteId={note?.id!} />
            </Suspense>
          </TransitionAnimate>
        )}
      </NoteContextProvider>
    </section>
  )
}

export default ManageNotes
