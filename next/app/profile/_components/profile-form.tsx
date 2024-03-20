'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ModelType, RoleType } from '@/types/global'

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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type FormType = {
  questionAmount: number
  currentRole: RoleType
  currentModel: ModelType
  openaiKey: string
  openaiOrganization: string
  openaiModel: string
  openaiProxy: string
  azureKey: string
  openaiBase: string
  azureBase: string
  openaiVersion: string
  deploymentName: string
  anthropicKey: string
  anthropicVersion: string
  anthropicModel: string
}

export const ProfileForm = () => {
  const formSchema = z.object({
    questionAmount: z.number().int().positive(),
    currentRole: z.union([
      z.literal('examiner'),
      z.literal('teacher'),
      z.literal('interviewer'),
    ]),
    currentModel: z.union([
      z.literal('openai'),
      z.literal('azure'),
      z.literal('anthropic'),
    ]),
    openaiKey: z.string(),
    openaiOrganization: z.string(),
    openaiModel: z.string(),
    openaiProxy: z.string(),
    azureKey: z.string(),
    openaiBase: z.string(),
    azureBase: z.string(),
    openaiVersion: z.string(),
    deploymentName: z.string(),
    anthropicKey: z.string(),
    anthropicVersion: z.string(),
    anthropicModel: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionAmount: 10,
      currentModel: 'openai',
      currentRole: 'examiner',
      openaiKey: '',
      openaiOrganization: '',
      openaiModel: '',
      openaiProxy: '',
      azureKey: '',
      openaiBase: '',
      azureBase: '',
      openaiVersion: '',
      deploymentName: '',
      anthropicKey: '',
      anthropicVersion: '',
      anthropicModel: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="questionAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Type</FormLabel>
              <FormControl></FormControl>
              <FormDescription>
                You can choose the question type in this note.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentRole"
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

        <Button type="submit" className="w-full md:w-auto">
          Submit
        </Button>
      </form>
    </Form>
  )
}
