import _axios from '@/plugins/axios'

export const FILE_API = {
  getFiles(id: number) {
    return _axios({
      method: 'GET',
      url: `/api/files?id=${id}`,
    })
  },

  deleteFile(data: any) {
    return _axios({
      method: 'DELETE',
      url: `/api/file`,
      params: data,
    })
  },
}
