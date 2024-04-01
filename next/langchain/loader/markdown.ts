import { Document } from 'langchain/document'
import { MarkdownTextSplitter } from 'langchain/text_splitter'
import {
  MAX_TOKEN,
  lenToken,
  isOddBacktickPaired,
  isTheTokenExceeded,
  isThereNoEnoughContent,
} from './share'

export const markdownSpitter = async (markdown: string) => {
  const splitter = new MarkdownTextSplitter({
    chunkSize: MAX_TOKEN,
    chunkOverlap: 0,
    lengthFunction: lenToken,
    // separators: [
    //   '\n#S[^\n]+\n\n?##+S[^\n]+',
    //   '\n#{1,6}s',
    //   '\n-{3,}\n',
    //   '\n_{3,}\n',
    //   '\ns*-s[^\n]+\n',
    //   '\ns*d+[.)]s[^\n]+\n',
    //   '\n```w+\n',
    // ],
  })

  const docs = await splitter.createDocuments([markdown])
  const resDodcs: Document[] = []

  for (const doc of docs) {
    const { pageContent } = doc
    if (isOddBacktickPaired(pageContent)) continue
    if (isThereNoEnoughContent(pageContent)) continue
    if (isTheTokenExceeded(pageContent)) continue
    resDodcs.push(doc)
  }

  return resDodcs
}
