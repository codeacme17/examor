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
  splitQuestions,
  getPushDate,
} from './util'
import { documentHandler, fileHandler } from '@/lib/db-handler'
import type { PromptType, QuestionType, RoleType } from '@/types/global'
import { questionHandler } from '@/lib/db-handler/question'

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
    questionType: QuestionType
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
    questionType: QuestionType
  ) {
    await this.semaphore.acquire()

    try {
      const res = await llmChain.invoke({
        title,
        context: doc.pageContent,
      })

      for (const question of splitQuestions(res, questionType)) {
        if (!isLegalQuestionStructure(question, questionType)) continue
        const { currentRole } = this.profile
        questionHandler.create(
          docId,
          questionType,
          removePrefixNumbers(question),
          currentRole
        )

        this.questionCount += 1
      }
    } finally {
      this.semaphore.release()
    }
  }

  private initLlmChain(
    questionType: QuestionType,
    timeout: number = 10
  ): LLMChain {
    const { currentRole } = this.profile
    const llmInstance = new IntergrationLlm(this.profile, {
      temperature: this.temperature,
      streaming: this.streaming,
      maxRetries: adjustRetriesByPaymentStatus(),
      timeout,
    })
    const prompt = choicePrompt(
      this.promptType,
      currentRole as RoleType,
      questionType
    )
    return new LLMChain({ prompt, llm: llmInstance.llm! })
  }
}
