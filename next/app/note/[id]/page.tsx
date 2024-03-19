import { NoteHeader } from './_components/note-header'
import { QuestionTable } from './_components/question-table'

const note = {
  id: '1',
  name: 'Vuejs',
  icon: 'mdi-vuejs',
  upload_date: '2024-02-02',
}

const NotePage = () => {
  return (
    <section>
      <NoteHeader note={note} />
      <QuestionTable />
    </section>
  )
}

export default NotePage
