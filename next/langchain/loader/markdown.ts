import { Document } from 'langchain/document'
import {
  MarkdownTextSplitter,
  RecursiveCharacterTextSplitter,
} from 'langchain/text_splitter'
import { lenToken } from './share'

const MAX_TOKEN = 2500

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

  docs.map((doc: Document) => {
    console.log(lenToken(doc.pageContent))
  })
}
