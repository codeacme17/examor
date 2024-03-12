import { Header } from '@/components/header'
import { NoteTable } from './_components/note-table'

const ManageNotes = () => {
  return (
    <section>
      <Header
        title="Manage Notes"
        subTitle="You can manage your notes here"
      />

      <NoteTable />
    </section>
  )
}

export default ManageNotes
