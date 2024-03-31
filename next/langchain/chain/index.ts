import { Semaphore } from 'async-mutex'
import { TProfile } from '@prisma/client'
import { Document } from 'langchain/document'
import { LLMChain } from 'langchain/chains'

import { IntergrationLlm } from '../llm'
import { choicePrompt } from '../prompt'
import {
  adjustConcurrencyByPaymentStatus,
  adjustRetriesByPaymentStatus,
  removePrefixNumbers,
  isLegalQuestionStructure,
  extractScore,
  getPushDate,
} from './util'
import { documentHandler, fileHandler } from '@/lib/db-handler'
import type { PromptType, QuestionType, RoleType } from '@/types/global'

export class Chain {
  profile: TProfile
  semaphore: Semaphore
  noteId: number
  fileId: number
  filename: string
  promptLanguage: string
  promptType: PromptType
  temperature: number
  streaming: boolean
  questionCount: number

  constructor(
    profile: TProfile,
    noteId: number = 0,
    fileId: number = 0,
    filename: string = '',
    promptLanguage: string = '',
    promptType: PromptType,
    temperature: number = 0,
    streaming: boolean = false
  ) {
    this.profile = profile
    this.semaphore = new Semaphore(adjustConcurrencyByPaymentStatus())
    this.noteId = noteId
    this.fileId = fileId
    this.filename = filename
    this.promptLanguage = promptLanguage
    this.promptType = promptType
    this.temperature = temperature
    this.streaming = streaming
    this.questionCount = 0
  }

  async agenerateQuestions(
    docs: Document[],
    title: string,
    questionType: string
  ): Promise<number> {
    const tasks = []
    const llmChain = this.initLlmChain(questionType)

    for (const doc of docs) {
      const { id: documentId } = await documentHandler.create(
        this.noteId,
        this.fileId,
        this.filename,
        doc.pageContent
      )
      tasks.push(
        this.agenerateQuestionsForDoc(
          llmChain,
          doc,
          title,
          documentId,
          questionType
        )
      )
    }

    try {
      await Promise.all(tasks)
    } catch (e) {
      fileHandler.update(this.fileId, { isUploading: '0' })
      throw e
    }

    return this.questionCount
  }

  private async agenerateQuestionsForDoc(
    llmChain: LLMChain,
    doc: Document,
    title: string,
    docId: number,
    questionType: string
  ) {
    await this.semaphore.acquire()

    try {
      const res = await llmChain.predict(title, doc.pageContent)
      for (const question of spiteQuestions(res, questionType)) {
        if (!isLegalQuestionStructure(question, questionType)) continue

        question.saveQuestionToDb(
          removePrefixNumbers(question),
          docId,
          questionType,
          this.profile.currentRole
        )
        this.questionCount += 1
      }
    } finally {
      this.semaphore.release()
    }
  }

  private initLlmChain(
    roleType: RoleType,
    questionType: QuestionType,
    timeout: number = 10
  ): LLMChain {
    const llmInstance = new IntergrationLlm(this.profile, {
      temperature: this.temperature,
      streaming: this.streaming,
      maxRetries: adjustRetriesByPaymentStatus(),
      timeout,
    })
    const prompt = choicePrompt(this.promptType, roleType, questionType)
    return new LLMChain({ prompt, llm: llmInstance.llm! })
  }
}
