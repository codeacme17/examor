import _axios from '@/plugins/axios'

export const BANK_API = {
  getCategories(language: string) {
    return _axios({
      method: 'GET',
      url: `/api/bank/${language}/categories`,
    })
  },

  getBanks(data: { language: string; category: string }) {
    return _axios({
      method: 'GET',
      url: `/api/bank/${data.language}/${data.category}`,
    })
  },

  importBank(data: {
    import_type: string
    note_id: number
    note_name: string
    language: string
    category: string
    bank_name: string
  }) {
    return _axios({
      method: 'POST',
      url: `/api/bank/import`,
      data,
    })
  },
}
