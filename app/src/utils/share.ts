// format "xxxx-xx-xxT00:00:00" data structure to "xxxx-xx-xx"
export const handleDatetime = (datatime: string): string => {
  const chunks = datatime.split('T')
  if (chunks.length <= 1) return datatime
  return chunks[0]
}

import { MessagePlugin } from 'tdesign-vue-next'
export const detectLegalFileName = (file: any) => {
  if (file.type !== 'text/markdown' && file.type !== 'text/x-markdown') {
    MessagePlugin.warning("Only '.md' type files are allowed to be uploaded")
    return false
  } else return true
}
