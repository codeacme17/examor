import { describe, it, expect } from 'vitest'
import { IntergrationLlm } from '../index'
import { profileHandler } from '../../../lib/db-handler'

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
