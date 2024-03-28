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
    if (isOddBacktickPaired(doc.pageContent)) continue
    if (isThereNoEnoughContent(doc.pageContent)) continue
    if (isTheTokenExceeded(doc.pageContent)) continue
    resDodcs.push(doc)
  }

  console.log(resDodcs)
}
