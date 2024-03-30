import fetch, { type RequestInit, type Headers } from 'node-fetch'
import { TProfile } from '@prisma/client'
import { HttpsProxyAgent } from 'https-proxy-agent'

export class PureLlm {
  private profile: TProfile

  constructor(profile: any) {
    this.profile = profile
  }

  public async checkLlmApiState() {
    const prompt = 'hi'
    const maxToken = 1
    const llm = this.initLLM(prompt, maxToken)

    const res = await llm!.invoke()
    const content: any = await res.json()

    if (res.ok) {
      const payment = this.getPaymentState(res.headers)
      return { payment, content }
    } else {
      console.log(content['error'].message)
      throw new Error(String(content.messages))
    }
  }

  private initLLM(prompt: string, maxToken: number) {
    const currentModel = this.profile.currentModel

    if (currentModel === 'openai') return this.initOpenai(prompt, maxToken)
    else if (currentModel === 'azure') return this.initAzure(prompt, maxToken)
    // else if (currentModel === 'anthropic') return this.initAnthropic()
  }

  private initOpenai(prompt: string, maxToken: number) {
    const model = this.profile.openaiModel
    const key = this.profile.openaiKey
    const base = this.profile.openaiBase

    const headers = {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    }

    const data = {
      model: model,
      messages: [{ role: 'system', content: prompt }],
      max_tokens: maxToken,
    }

    const options: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    }

    if (this.profile.openaiProxy) {
      options.agent = new HttpsProxyAgent(this.profile.openaiProxy)
    }

    const invoke = () => fetch(`${base}/v1/chat/completions`, options)

    return { invoke }
  }

  private initAzure(prompt: string, maxToken: number) {
    const key = this.profile.azureKey
    const base = this.profile.azureBase
    const deploymentName = this.profile.deploymentName
    const version = this.profile.openaiVersion

    const headers = {
      'api-key': key,
      'Content-Type': 'application/json',
    }

    const data = {
      prompt,
      max_tokens: maxToken,
    }

    const invoke = () =>
      fetch(
        `${base}/openai/deployments/${deploymentName}/completions?api-version=${version}`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(data),
        }
      )

    return {
      invoke,
    }
  }

  private getPaymentState(headers: Headers) {
    const currentModel = this.profile.currentModel
    const openaiModel = this.profile.openaiModel

    let paymentStatus = 'free'

    if (currentModel === 'OpenAI') {
      if (openaiModel === 'gpt-4') paymentStatus = 'paid'
      else if (headers.get('x-ratelimit-limit-requests') === '200')
        paymentStatus = 'free'
      else paymentStatus = 'paid'
    }

    if (currentModel === 'Azure') paymentStatus = 'paid'

    if (currentModel === 'Anthropic') paymentStatus = 'free'

    process.env.PAYMENT = paymentStatus
    return paymentStatus
  }
}
