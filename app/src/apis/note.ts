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

  addNote(data: any) {
    return _axios({
      method: 'POST',
      url: `/api/note`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
      timeout: 100000 * 1000,
    })
  },

  deleteNote(id: number) {
    return _axios({
      method: 'DELETE',
      url: `/api/note?id=${id}`,
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
