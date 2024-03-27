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
import { createFormSchema } from '@/schema/upload'
import { UploadFormType } from '@/types/global'
import { useToast } from '../ui/use-toast'

interface UploadFormProps {
  type: UploadFormType
}

export const UploadForm = (props: UploadFormProps) => {
  const { type } = props

  const formSchema = createFormSchema(type)
  const { toast } = useToast()

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
    upload()
  }

  const upload = async () => {
    const formData = new FormData()

    formData.append('type', form.getValues('type'))
    formData.append('name', form.getValues('name'))
    form.getValues('files').forEach((file) => {
      formData.append('files', file)
    })

    const res = await fetch('/api/note/create', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok)
      return toast({
        title: 'Error',
        variant: 'destructive',
        description: res.text(),
      })

    form.reset()
    form.setValue('files', [])

    toast({
      title: 'Success',
      description: 'Your note has been uploaded successfully.',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
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
                  <Input autoComplete="off" {...field} />
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
