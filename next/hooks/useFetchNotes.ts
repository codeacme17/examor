import { useNoteStore } from '@/store'
import { useToast } from '@/components/ui/use-toast'

export const useFetchNotes = () => {
  const noteStore = useNoteStore()
  const { toast } = useToast()

  const fetchNotes = async () => {
    noteStore.setIsFetching(true)
    const res = await fetch('/api/note/all')
    noteStore.setIsFetching(false)

    if (res.ok) {
      const data = await res.json()
      noteStore.setNotes(data)
    } else {
      toast({
        title: 'Failed to fetch notes',
        description: 'Please try again later',
        variant: 'destructive',
      })
    }
  }

  return { fetchNotes }
}
