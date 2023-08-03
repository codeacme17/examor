import { ref, type Ref } from 'vue'
import { useNow, useDateFormat } from '@vueuse/core'
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

  clearExipredData()

  if (localStorage.getItem(key))
    list.value = JSON.parse(localStorage.getItem(key)!)
  else {
    const { data } = await fetch(noteId)
    list.value = data
    localStorage.setItem(key, JSON.stringify(list.value))
  }

  return [list, loading]
}

const clearExipredData = () => {
  let i = 0
  while (localStorage.key(i)) {
    const key: string = localStorage.key(i)!
    let chunks: string[] = []
    if (key.includes(':')) chunks = key.split(':')
    if (checkIsExpired(chunks[0])) localStorage.removeItem(key)
    i++
  }
}

const checkIsExpired = (day: string) => {
  if (!day) return false
  const date1 = new Date(day).getTime()
  const date2 = new Date(today.value).getTime()
  if (date1 < date2) return true
  else false
}
