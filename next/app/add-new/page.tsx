import { Header } from '@/components/header'
import { UploadForm } from '@/components/upload-form'

const AddNew = () => {
  return (
    <section>
      <Header
        title="Add new note"
        subTitle="You can add new note here"
      />

      <div className="px-3">
        <UploadForm />
      </div>
    </section>
  )
}

export default AddNew