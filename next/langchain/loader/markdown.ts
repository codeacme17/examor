import { Document } from 'langchain/document'
import {
  MarkdownTextSplitter,
  RecursiveCharacterTextSplitter,
} from 'langchain/text_splitter'

const MAX_TOKEN = 2500

export const markdownSpitter = async (markdown: string) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: MAX_TOKEN,
    chunkOverlap: 0,
    separators: [
      '\n#S[^\n]+\n\n?##+S[^\n]+',
      '\n#{1,6}s',
      '\n-{3,}\n',
      '\n_{3,}\n',
      '\ns*-s[^\n]+\n',
      '\ns*d+[.)]s[^\n]+\n',
      '\n```w+\n',
    ],
  })

  const docOutput = await splitter.createDocuments([markdown])

  console.log(docOutput)
}
