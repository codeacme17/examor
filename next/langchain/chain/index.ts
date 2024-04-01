import { Semaphore } from 'async-mutex'
import { Document } from 'langchain/document'
import type { TProfile } from '@prisma/client'

import { IntergrationLlm } from '../llm'
import { choicePrompt } from '../prompt'
import {
  adjustConcurrencyByPaymentStatus,
  adjustRetriesByPaymentStatus,
  removePrefixNumbers,
  isLegalQuestionStructure,
  splitQuestions,
} from './util'
import { documentHandler, fileHandler } from '@/lib/db-handler'
import { questionHandler } from '@/lib/db-handler/question'
import type { PromptType, QuestionType, RoleType } from '@/types/global'
import { Runnable, RunnableConfig } from '@langchain/core/runnables'
import { BaseMessageChunk } from '@langchain/core/messages'

export class Chain {
  profile: TProfile
  semaphore: Semaphore
  noteId: number
  fileId: number
  filename: string
  questionType: QuestionType
  promptType: PromptType
  temperature: number
  streaming: boolean
  questionCount: number
  chain: Runnable<any, BaseMessageChunk, RunnableConfig>

  constructor(
    profile: TProfile,
    noteId: number,
    fileId: number,
    filename: string,
    questionType: QuestionType,
    promptType: PromptType,
    temperature: number = 0,
    streaming: boolean = false
  ) {
    this.profile = profile
    this.semaphore = new Semaphore(adjustConcurrencyByPaymentStatus())
    this.noteId = noteId
    this.fileId = fileId
    this.filename = filename
    this.promptType = promptType
    this.temperature = temperature
    this.streaming = streaming
    this.questionCount = 0
    this.questionType = questionType
    this.chain = this.initChain(questionType)
  }

  private initChain(questionType: QuestionType, timeout: number = 10) {
    const { currentRole } = this.profile
    const llmInstance = new IntergrationLlm(this.profile, {
      temperature: this.temperature,
      streaming: this.streaming,
      maxRetries: adjustRetriesByPaymentStatus(),
      timeout,
      verbose: true,
    })
    const prompt = choicePrompt(
      this.promptType,
      currentRole as RoleType,
      questionType
    )

    const chain = prompt.pipe(llmInstance.llm!)
    return chain
  }

  public async generateQuestions(docs: Document[]): Promise<number> {
    try {
      for (const doc of docs) {
        const { id: documentId } = await documentHandler.create(
          this.noteId,
          this.fileId,
          this.filename,
          doc.pageContent
        )
        await this._generateQuestions(doc, documentId)
      }
    } catch (e) {
      fileHandler.update(this.fileId, { isUploading: '0' })
      throw e
    }

    return this.questionCount
  }

  private async _generateQuestions(doc: Document, docId: number) {
    const res = await this.chain.invoke({
      title: this.filename,
      context: doc.pageContent,
    })

    console.log(res)

    for (const question of splitQuestions(res, this.questionType)) {
      if (!isLegalQuestionStructure(question, this.questionType)) continue
      const { currentRole } = this.profile
      questionHandler.create(
        docId,
        this.questionType,
        removePrefixNumbers(question),
        currentRole
      )

      this.questionCount += 1
    }
  }
}
