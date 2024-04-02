import { format, addDays } from 'date-fns'
import { handleEbbinghausMemory } from '@/lib/ebbinghaus-memory'

// Adjust concurrency based on payment status.
export const adjustConcurrencyByPaymentStatus = (): number => {
  const payment = process.env['PAYMENT'] || 'free'
  return payment === 'free' ? 1 : 3
}

// Adjust the number of retries based on payment statu.s.
export const adjustRetriesByPaymentStatus = (): number => {
  const payment = process.env['PAYMENT'] || 'free'
  return payment === 'free' ? 20 : 6
}

// Split the generated questions.
export const splitQuestions = (content: string, type: string): string[] => {
  if (type === 'choice') {
    return content.trim().split('\n\n')
  } else {
    return content.trim().split('\n')
  }
}

// Check if the structure of the question is valid.
export const isLegalQuestionStructure = (
  content: string,
  type: string
): boolean => {
  if (!content || content.length < 12) return false

  // if (type === 'choice') {
  //   const pattern = /^-\s.+?\n\s*A\..+\n\s*B\..+\n\s*C\..+\n\s*D\..+$/
  //   return pattern.test(content)
  // }

  if (type === 'blank') return content.includes('_____')

  return true
}

// Remove prefix numbers or dashes from a question.
export const removePrefixNumbers = (text: string): string => {
  return text.replace(/^\s*(?:\d+\.|-)\s*/, '').trim()
}

// Extract score from the answer.
export const extractScore = (answer: string): number => {
  const score = answer.match(/\d+\.?\d*/)
  return score ? parseInt(score[0], 10) : 0
}

// Get the push date based on the score.
export const getPushDate = (score: number): string => {
  const now = new Date()
  const days = handleEbbinghausMemory(score)
  return format(addDays(now, days), 'yyyy-MM-dd')
}
