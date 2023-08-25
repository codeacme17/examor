import { ref, type Ref } from 'vue'
import { useNow, useDateFormat, useLocalStorage } from '@vueuse/core'
import { useFetch } from './useFetch'
import type { ResponseBody } from '@/plugins/axios'
import type { TableItem } from '@/components/QuestionTable.vue'

const today = useDateFormat(useNow(), 'YYYY-MM-DD')

/**
 *  If a user requests a list of issues under a note once today,
 *  then the list is cached, and when user enter the problem list page again,
 *  the interface is no longer called
 *
 *  @params noteId: whitch note list needs to be cached
 *  @params fun: if there isnt any cache of this note, will trigger this function to fetch list data
 *  @return [list, loading]
 */
export const useTodayListCache = async (
  noteId: string,
  fun: (id: number) => Promise<ResponseBody | any>
): Promise<Ref[]> => {
  const [fetch, loading] = useFetch(fun)
  const list = ref<TableItem[]>([])
  const key = `${today.value}:${noteId}`

  if (localStorage.getItem(key))
    list.value = JSON.parse(localStorage.getItem(key)!)
  else {
    const { data } = await fetch(noteId)
    list.value = data
    localStorage.setItem(key, JSON.stringify(list.value))
  }

  return [list, loading]
}

export const useListState = () => {
  const pendingList = useLocalStorage(`${today.value}:pendingList`, new Set())
  const finishedList = useLocalStorage(`${today.value}:finishedList`, new Set())
  return [pendingList, finishedList]
}
