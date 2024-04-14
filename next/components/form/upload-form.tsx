'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFetchNotes } from '@/hooks/useFetchNotes'
import { useToast } from '@/components/ui/use-toast'
import { createFormSchema } from '@/schema/upload'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { QuestionType, UploadFormType } from '@/types/global'
import { LoadButton } from '@/components/share/load-button'
import { QuestionTypeSwitch } from '@/components/share/question-type-switch'
import { DragUpload } from './drag-upload'

interface UploadFormProps {
  type: UploadFormType
  noteId?: string
}

export const UploadForm = (props: UploadFormProps) => {
  const { type, noteId } = props
  const { toast } = useToast()
  const formSchema = createFormSchema(type)
  const { fetchNotes } = useFetchNotes()

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'short',
      name: '',
      files: [],
    },
  })

  const upload = async () => {
    const formData = new FormData()

    formData.append('type', form.getValues('type'))
    type === 'file' && formData.append('noteId', noteId!)
    type === 'note' && formData.append('name', form.getValues('name'))
    form.getValues('files').forEach((file) => {
      formData.append('files', file)
    })

    const body = { method: 'POST', body: formData }
    let res: Response | null = null
    if (type === 'note') {
      res = await fetch('/api/note/create', body)
    } else {
      res = await fetch('/api/file/upload', body)
    }

    if (!res!.ok) {
      return toast({
        title: 'Error',
        variant: 'destructive',
        description: res!.text(),
      })
    }

    form.reset()
    fetchNotes()
    toast({
      title: 'Success',
      description:
        type === 'note' ? 'Note is being created' : 'Files are being uploaded',
    })
  }

  const onSubmit = async () => {
    setLoading(true)
    await upload()
    setLoading(false)
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
                <Tabs
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value as QuestionType)
                  }}
                  className="w-full md:w-[500px]">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="short">
                      <QuestionTypeSwitch
                        questionType={'short'}
                        className="mr-2"
                      />
                      <span className="hidden sm:inline-block">
                        Short Answer
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="choice">
                      <QuestionTypeSwitch
                        questionType={'choice'}
                        className="mr-2"
                      />
                      <span className="hidden sm:inline-block">
                        Single Choice
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="blank">
                      <QuestionTypeSwitch
                        questionType={'blank'}
                        className="mr-2"
                      />
                      <span className="hidden sm:inline-block">
                        Fill in the blank
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
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
                <DragUpload
                  onFileChange={field.onChange}
                  files={field.value}
                  fileTypes={['.md']}
                />
              </FormControl>
              <FormDescription>
                It is recommended not to upload more than{' '}
                <strong>three files</strong> at one time
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadButton
          loading={loading}
          loadingLabel="Submitting"
          className="w-full md:w-auto">
          Submit
        </LoadButton>
      </form>
    </Form>
  )
}
