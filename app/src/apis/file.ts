import _axios from '@/plugins/axios'

export const FILE_API = {
  deleteFile(data: any) {
    return _axios({
      method: 'DELETE',
      url: `/api/file`,
      params: data,
    })
  },
}
