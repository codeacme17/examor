import { expect, it, describe } from 'vitest'
import { Chain } from '../index'
import { profileHandler } from '@/lib/db-handler'

describe('Chain', async () => {
  it('should correctly call chain', async () => {
    const profile = await profileHandler.getFirst()
    const chain = new Chain(profile!, 1, 1, 'test.md', 'short', 'generate')

    const res = await chain.chain.invoke({
      title: 'start',
      context: `PromptTemplate + LLM
      提示模板 + 法学硕士
      A PromptTemplate -> LLM is a core chain that is used in most other larger chains/systems.
      PromptTemplate -> LLM 是用于大多数其他大型链/系统的核心链。

      TIP
      See this section for general instructions on installing integration packages.
      有关安装集成包的一般说明，请参阅此部分。

      npm
      Yarn
      pnpm
      pnpm add @langchain/openai

      import { ChatOpenAI } from "@langchain/openai";
      import { PromptTemplate } from "@langchain/core/prompts";

      const model = new ChatOpenAI({});
      const promptTemplate = PromptTemplate.fromTemplate(
        "Tell me a joke about {topic}"
      );

      const chain = promptTemplate.pipe(model);

      const result = await chain.invoke({ topic: "bears" });

      console.log(result);

      /*
        AIMessage {
          content: "Why don't bears wear shoes?\n\nBecause they have bear feet!",
        }
      */

      API Reference:
      ChatOpenAI from @langchain/openai
      来自 @langchain/openai 的 ChatOpenAI
      PromptTemplate from @langchain/core/prompts
      来自 @langchain/core/prompts 的 PromptTemplate`,
    })

    expect(res).toBeDefined()
  })
})
