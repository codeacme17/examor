'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DragUpload } from './drag-upload'

interface UploadFormProps {
  type: 'note' | 'file'
}

export const UploadForm = (props: UploadFormProps) => {
  const { type } = props

  const formSchema = z.object({
    type: z.enum(['short', 'single', 'blank']),
    name:
      type === 'note'
        ? z.string().min(2, {
            message: 'File name must be at least 2 characters.',
          })
        : z.literal(''),
    files: z.array(z.instanceof(File)).min(1, {
      message: 'Please upload at least 1 file.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'short',
      name: '',
      files: [],
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <SelectTrigger className="w-full  md:w-[320px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">
                      <span className="mr-2">📝</span> Short Answer
                    </SelectItem>
                    <SelectItem value="single">
                      <span className="mr-2">🔠</span> Single Choice
                    </SelectItem>
                    <SelectItem value="blank">
                      <span className="mr-2">⬜</span> Fill in the blank
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                You can choose the question type in this note.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {type === 'note' && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Javascript"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your note display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Files</FormLabel>
              <FormControl>
                <DragUpload onFileChange={field.onChange} files={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto">
          Submit
        </Button>
      </form>
    </Form>
  )
}
