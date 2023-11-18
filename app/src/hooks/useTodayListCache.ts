import { ref, type Ref } from 'vue'
import { useNow, useDateFormat, useLocalStorage } from '@vueuse/core'
import { useFetch } from './useFetch'
import type { ResponseBody } from '@/plugins/axios'
import type { TableItem } from '@/components/tables/QuestionTable.vue'

const today = useDateFormat(useNow(), 'YYYY-MM-DD')

/**
 *  If a user requests a list of issues under a note once today,
 *  then the list is cached, and when user enter the problem list page again,
 *  the interface is no longer called
 *
 *  @param {string} noteId - The ID of the note.
 *  @param {Function} fun - The asynchronous function to fetch data.
 *  @returns {Promise<Ref[]>} A promise that resolves with an array containing the cached list and loading state.
 */
export const useTodayListCache = async (
  noteId: string,
  fun: (id: number) => Promise<ResponseBody | any>
): Promise<Ref[]> => {
  const [fetch, loading] = useFetch(fun)
  const list = ref<TableItem[]>([])
  const key = `${today.value}:${noteId}`
  const cachedData =
    localStorage.getItem(key) && JSON.parse(localStorage.getItem(key)!)
  if (
    cachedData &&
    (!!cachedData.expired.length ||
      !!cachedData.today.length ||
      !!cachedData.supplement.length)
  ) {
    list.value = cachedData
  } else {
    const { data } = await fetch(noteId)
    list.value = data
    localStorage.setItem(key, JSON.stringify(list.value))
  }

  return [list, loading]
}

/**
 * Creates state for pending and finished lists.
 *
 * @returns {Array<Ref<Set<string>>>} An array containing refs for pending and finished lists.
 */
export const useListState = () => {
  const pendingList = useLocalStorage(`${today.value}:pendingList`, new Set())
  const finishedList = useLocalStorage(`${today.value}:finishedList`, new Set())
  return [pendingList, finishedList]
}
