import _axios from '@/plugins/axios'

export const TOOL_API = {
  getTagVersion() {
    return _axios({
      method: 'GET',
      url: 'https://api.github.com/repos/codeacme17/examor/tags',
    })
  },
}
