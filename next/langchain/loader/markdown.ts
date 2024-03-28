import { Document } from 'langchain/document'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

const MAX_TOKEN = 1000

export const markdownSpitter = async (markdown: string) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: MAX_TOKEN,
    chunkOverlap: 0,
    separators: [
      // Matches first-level title followed by second, third, or fourth-level title
      '\n#s[^\n]+\n\n?##+?s[^\n]+',
      '\n#{1,6}s',
      // Matches three or more dashes followed by a newline
      '\n-{3,}\n',
      // Matches three or more underscores followed by a newline
      '\n_{3,}\n',
      // Matches unordered list items starting with '-'
      '\ns*-s[^\n]+\n',
      // Matches ordered list items
      '\ns*d+[.)]s[^\n]+\n',
      // Matches open code block
      '\n```w+\n',
    ],
  })

  const docOutput = await splitter.splitDocuments([
    new Document({ pageContent: markdown }),
  ])
  console.log(docOutput)
}
