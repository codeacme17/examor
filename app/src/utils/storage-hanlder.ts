import { useNow, useDateFormat } from '@vueuse/core'

const today = useDateFormat(useNow(), 'YYYY-MM-DD')

export const clearExipredStorageData = () => {
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

export const checkAnswerIsInCache = (questionId: string) => {
  let i = 0
  while (localStorage.key(i)) {
    const key: string = localStorage.key(i)!
    let chunks: string[] = []
    if (key.includes(':')) chunks = key.split(':')
    if (chunks[1] === questionId) {
      console.log(questionId)
      return true
    }
    i++
  }
  return false
}
