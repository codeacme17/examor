import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { FileClock, NotebookText } from 'lucide-react'
import { Button } from '../ui/button'
import { ExamineBlock } from './examine-block'
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
        Change your password here.
      </TabsContent>
      <TabsContent value="content">
        Change your password here 123.
      </TabsContent>
    </Tabs>
  )
}
