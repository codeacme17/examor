import { useNow, useDateFormat } from '@vueuse/core'

const today = useDateFormat(useNow(), 'YYYY-MM-DD')

/**
 * Clears expired storage data from the local storage.
 *
 */
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

/**
 * Checks if a given day is expired.
 *
 * @param {string} day - The day to check for expiration.
 * @returns {boolean} Returns true if the day is expired, otherwise false.
 */
const checkIsExpired = (day: string) => {
  if (!day) return false
  const date1 = new Date(day).getTime()
  const date2 = new Date(today.value).getTime()
  if (date1 < date2) return true
  else false
}

/**
 * Checks if the answer for a specific question is cached in local storage.
 *
 * @param {string} questionId - The ID of the question to check.
 * @returns {boolean} Returns true if the answer is cached, otherwise false.
 */
export const checkAnswerIsInCache = (questionId: string) => {
  let i = 0
  while (localStorage.key(i)) {
    const key: string = localStorage.key(i)!
    let chunks: string[] = []
    if (key.includes(':')) chunks = key.split(':')
    if (chunks[1] === questionId) {
      return true
    }
    i++
  }
  return false
}
