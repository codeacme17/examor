import { AzureChatOpenAI, ChatOpenAI } from '@langchain/openai'
import { ChatAnthropic } from '@langchain/anthropic'
import { BaseCallbackHandler } from '@langchain/core/callbacks/base'
import { MAX_TOKEN } from '../loader/share'
import type { TProfile } from '@prisma/client'

type ModelType = AzureChatOpenAI | ChatOpenAI | ChatAnthropic | null

export class LLM {
  profile: TProfile
  temperature: number
  streaming: boolean
  callbacks: BaseCallbackHandler[]
  max_retries: number
  max_tokens: number
  timeout: number
  llm: Promise<ModelType>

  constructor(
    profile: any,
    temperature: number = 0,
    streaming: boolean = false,
    callbacks: BaseCallbackHandler[] = [],
    max_retries: number = 3,
    max_tokens: number = MAX_TOKEN,
    timeout: number = 10
  ) {
    this.profile = profile
    this.llm = this.initLlm()
    this.temperature =
      temperature !== 0 ? temperature : this.getRoleTemperature()
    this.streaming = streaming
    this.callbacks = callbacks
    this.max_retries = max_retries
    this.max_tokens = max_tokens
    this.timeout = timeout
  }

  private async initLlm(): Promise<ModelType> {
    let llm = null
    const currentModel = this.profile.currentModel
    if (currentModel === 'openai') llm = this.initAzure()
    else if (currentModel === 'azure') llm = this.initOpenai()
    else if (currentModel === 'anthropic') llm = this.initAnthropic()
    return llm
  }

  private initOpenai(): ChatOpenAI {
    return new ChatOpenAI(
      {
        openAIApiKey: this.profile.openaiKey,
        modelName: this.profile.openaiModel,
        temperature: this.temperature,
        streaming: this.streaming,
        callbacks: this.callbacks,
        maxRetries: this.max_retries,
        maxTokens: this.max_tokens,
        timeout: this.timeout,
      },
      {
        baseURL: `${this.profile.openaiBase}/v1`,
        organization: this.profile.openaiOrganization,
      }
    )
  }

  private initAzure(): AzureChatOpenAI {
    return new AzureChatOpenAI({
      openAIApiKey: this.profile.azureKey,
      openAIApiVersion: this.profile.openaiVersion,
      openAIBasePath: this.profile.azureBase,
      deploymentName: this.profile.deploymentName,
      temperature: this.temperature,
      streaming: this.streaming,
      callbacks: this.callbacks,
      maxRetries: this.max_retries,
      maxTokens: this.max_tokens,
      timeout: this.timeout,
    })
  }

  private initAnthropic(): ChatAnthropic {
    return new ChatAnthropic({
      anthropicApiKey: this.profile.anthropicKey,
      modelName: this.profile.anthropicModel,
      temperature: this.temperature,
      streaming: this.streaming,
      callbacks: this.callbacks,
      maxRetries: this.max_retries,
      maxTokens: this.max_tokens,
    })
  }

  private getRoleTemperature(): number {
    const currentRole = this.profile.currentRole
    if (currentRole === 'examiner') return 0
    else if (currentRole === 'teacher') return 0.5
    else if (currentRole === 'interviewer') return 0.9
    return 0
  }
}
