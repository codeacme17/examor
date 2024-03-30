import { describe, it, expect } from 'vitest'
import { IntergrationLlm } from '../index'
import { profileHandler } from '@/lib/db-handler'
import { PureLlm } from '../pure'

describe('PureLlm', () => {
  it('should correctly call pure model', async () => {
    const profile = await profileHandler.getFirst()

    const llm = new PureLlm(profile)

    const res = await llm.checkLlmApiState()
    expect(res.payment).toBe('free')
    expect(res.content).toBeDefined()
  })
})

describe('IntergrationLlm', () => {
  it('should correctly initialize model', async () => {
    const profile = await profileHandler.getFirst()

    const llm = new IntergrationLlm(profile)

    const res = await llm.llm!.invoke([
      ['system', 'Only return JSON'],
      ['human', 'Hi there!'],
    ])

    expect(res).toBeDefined()
  })
})
