import { get_encoding } from 'tiktoken'

export const MAX_TOKEN = 2500
export const MAX_RETRIES = 3
export const TIMEOUT = 1000 * 30

export const lenToken = (content: string) => {
  const encoding = get_encoding('cl100k_base')
  const tokens = encoding.encode(content)

  return tokens.length
}

export const isOddBacktickPaired = (content: string) => {
  const counts = (content.match(/```/g) || []).length
  if (counts === 0) return false
  else if (counts % 2 === 0) return false
  return true
}

export const isThereNoEnoughContent = (content: string) => {
  return lenToken(content) < 200
}

export const isTheTokenExceeded = (content: string) => {
  return lenToken(content) > MAX_TOKEN
}
