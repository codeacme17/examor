import _axios from '@/plugins/axios'

export const FILE_API = {
  getQuestionCount(id: number) {
    return _axios({
      method: 'GET',
      url: `/api/file/${id}/questionCount`,
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
