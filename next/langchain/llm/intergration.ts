import { AzureChatOpenAI, ChatOpenAI } from '@langchain/openai'
import { ChatAnthropic } from '@langchain/anthropic'
import { BaseCallbackHandler } from '@langchain/core/callbacks/base'
import { MAX_RETRIES, MAX_TOKEN, TIMEOUT } from '../loader/share'
import type { TProfile } from '@prisma/client'

type ModelType = AzureChatOpenAI | ChatOpenAI | ChatAnthropic | null

interface ConfigParams {
  temperature: number
  streaming?: boolean
  callbacks?: BaseCallbackHandler[]
  maxRetries?: number
  maxTokens?: number
  timeout?: number
}

const DEFAULT_CONFIG: ConfigParams = {
  temperature: 0,
  streaming: false,
  callbacks: [],
  maxRetries: MAX_RETRIES,
  maxTokens: MAX_TOKEN,
  timeout: TIMEOUT,
}

export class IntergrationLlm {
  public llm: ModelType

  private profile: TProfile
  private temperature: number
  private streaming: boolean
  private callbacks: BaseCallbackHandler[]
  private maxRetries: number
  private maxTokens: number
  private timeout: number

  constructor(profile: any, config: ConfigParams = DEFAULT_CONFIG) {
    this.profile = profile
    this.temperature =
      config.temperature !== 0 ? config.temperature : this.getRoleTemperature()
    this.streaming = config.streaming || false
    this.callbacks = config.callbacks || []
    this.maxRetries = config.maxRetries || MAX_RETRIES
    this.maxTokens = config.maxTokens || MAX_TOKEN
    this.timeout = config.timeout || TIMEOUT

    this.llm = this.initLlm()
  }

  private initLlm(): ModelType {
    let llm = null
    const currentModel = this.profile.currentModel

    if (currentModel === 'openai') llm = this.initOpenai()
    else if (currentModel === 'azure') llm = this.initAzure()
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
        maxRetries: this.maxRetries,
        maxTokens: this.maxTokens,
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
      maxRetries: this.maxRetries,
      maxTokens: this.maxTokens,
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
      maxRetries: this.maxRetries,
      maxTokens: this.maxTokens,
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
