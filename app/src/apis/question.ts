import _axios from '@/plugins/axios'

export const QUESTION_API = {
  getQuestionsByNoteId(id: number) {
    return _axios({
      method: 'GET',
      url: `/api/questions/note/${id}`,
    })
  },
}
