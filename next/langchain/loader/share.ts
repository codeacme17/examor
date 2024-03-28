import { get_encoding } from 'tiktoken'

export const lenToken = (content: string) => {
  const encoding = get_encoding('cl100k_base')
  const tokens = encoding.encode(content)

  return tokens.length
}
