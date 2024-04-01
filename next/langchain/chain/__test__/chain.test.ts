import { expect, it, describe } from 'vitest'
import { Chain } from '../index'
import { profileHandler } from '@/lib/db-handler'

describe('Chain', async () => {
  it('should correctly call chain', async () => {
    const profile = await profileHandler.getFirst()
    const chain = new Chain(profile!, 1, 1, 'test.md', 'short', 'generate')

    const res = await chain.generateQuestions([
      {
        pageContent: 'This is a test content, with some text.',
        metadata: {
          title: 'Test',
        },
      },
    ])
    console.log(res)
    expect(res).toBeDefined()
  })
})
