import _axios from '@/plugins/axios'

export const QUESTION_API = {
  getQuestionsByNoteId(id: number) {
    return _axios({
      method: 'GET',
      url: `/api/questions/note/${id}`,
    })
  },

  getLastAnswer(id: number) {
    return _axios({
      method: 'GET',
      url: `/api/question/lastAnswer/${id}`,
    })
  },

  getDocument(id: number) {
    return _axios({
      method: 'GET',
      url: `/api/question/document/${id}`,
    })
  },

  getRandomQuestion() {
    return _axios({
      method: 'GET',
      url: '/api/question/random',
    })
  },
}
