import _axios from '@/plugins/axios'

export const NOTE_API = {
  getNotes() {
    return _axios({
      method: 'GET',
      url: '/api/note/notes',
    })
  },

  getNote(id: number) {
    return _axios({
      method: 'GET',
      url: `/api/note/${id}`,
    })
  },

  getFiles(id: number) {
    return _axios({
      method: 'GET',
      url: `/api/note/${id}/files`,
    })
  },

  getQuestions(id: number) {
    return _axios({
      method: 'GET',
      url: `/api/note/${id}/questions`,
    })
  },

  addNote(data: any) {
    return _axios({
      method: 'POST',
      url: `/api/note`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data.formData,
    })
  },

  addFile(data: any) {
    return _axios({
      method: 'POST',
      url: `/api/note/${data.id}/file`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data.formData,
      timeout: 100000 * 1000,
    })
  },

  deleteNote(id: number) {
    return _axios({
      method: 'DELETE',
      url: `/api/note/${id}`,
    })
  },

  updateNoteIcon(data: any) {
    return _axios({
      method: 'PATCH',
      url: '/api/note/icon',
      data: data,
    })
  },
}
