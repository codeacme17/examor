import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'
import { formSchema } from './profile-form'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface OpenaiConfigFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
}

export const OpenaiConfigForm = (props: OpenaiConfigFormProps) => {
  const { form } = props

  return (
    <>
      <FormField
        control={form.control}
        name="openaiKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>OpenAI key</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              You can find your OpenAI key in the{' '}
              <a
                href="https://platform.openai.com/account/api-keys"
                target="_blank"
                rel="noreferrer">
                OpenAI API keys
              </a>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="openaiOrganization"
        render={({ field }) => (
          <FormItem>
            <FormLabel>OpenAI organization key (optional)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormDescription>
              You can find your OpenAI organization key in the{' '}
              <a
                href="https://platform.openai.com/account/organization"
                target="_blank"
                rel="noreferrer">
                OpenAI Organization
              </a>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="openaiBase"
        render={({ field }) => (
          <FormItem>
            <FormLabel>OpenAI base endpoint (optional)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="openaiProxy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>OpenAI proxy (optional)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
