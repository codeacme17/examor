import _axios from '@/plugins/axios'

export const QUESTION_API = {
  getLastAnswer(id: number) {
    return _axios({
      method: 'GET',
      url: `/api/question/${id}/lastAnswer`,
    })
  },

  getDocument(id: number) {
    return _axios({
      method: 'GET',
      url: `/api/question/${id}/document`,
    })
  },

  getRandomQuestion() {
    return _axios({
      method: 'GET',
      url: '/api/question/random',
    })
  },
}
