import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'
import { profileFormSchema as formSchema } from '@/schema/profile'

import {
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
import { PasswordInput } from '@/components/share/password-input'

interface OpenaiConfigFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
}

export const OpenaiConfigForm = (props: OpenaiConfigFormProps) => {
  const { form } = props

  return (
    <>
      <FormField
        control={form.control}
        name="openaiModel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>OpenAI Model</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full md:w-[240px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                  <SelectItem value="gpt-4">gpt-4</SelectItem>
                  <SelectItem value="gpt-4-1106-preview">
                    gpt-4-1106-preview
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="openaiKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>OpenAI key</FormLabel>
            <FormControl>
              <PasswordInput {...field} />
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
              <PasswordInput {...field} />
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
