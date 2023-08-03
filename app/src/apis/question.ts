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

  examingAnswer(data: any) {
    return fetch('/api/question/examine', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  },
}
