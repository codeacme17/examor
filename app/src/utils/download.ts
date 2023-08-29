/**
 *  Download the binary delivered by the backend
 *
 *  @param data the binary file data
 *  @param filename the file name
 *  @param MIME the MIME type of the file
 */
export const dowmloadBinaryFile = (
  data: any,
  filename: string,
  MIME: string
): void => {
  const url = window.URL.createObjectURL(new Blob([data], { type: MIME }))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
