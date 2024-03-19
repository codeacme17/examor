import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FileClock, NotebookText } from 'lucide-react'
import { ExamineBlock } from './examine-block'
import { DocContent } from './doc-content'
import { LastRecord } from './last-record'
import './markdown.scss'

export const AnswerBlock = () => {
  return (
    <Tabs defaultValue="answer" className="w-full mt-5">
      <TabsList>
        <TabsTrigger value="answer">Answer</TabsTrigger>
        <TabsTrigger value="record">
          <FileClock size={16} className="mr-2" /> Last Record
        </TabsTrigger>
        <TabsTrigger value="content">
          <NotebookText size={16} className="mr-2" />
          Note Content
        </TabsTrigger>
      </TabsList>

      <TabsContent value="answer">
        <Textarea
          placeholder="Type your answer here."
          rows={10}
          className="bg-muted"
        />
        <Button className="mt-3 w-full" variant={'secondary'}>
          Submit
        </Button>
        <ExamineBlock content="```js This is the content of the examine block.```" />
      </TabsContent>

      <TabsContent value="record">
        <LastRecord content="Last Record Content" />
      </TabsContent>

      <TabsContent value="content">
        <DocContent content="Document Content" />
      </TabsContent>
    </Tabs>
  )
}
