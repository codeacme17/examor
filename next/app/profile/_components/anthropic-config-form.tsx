import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'
import { formSchema } from '../_schema/form-schema'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface AnthropicConfigFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
}

export const AnthropicConfigForm = (props: AnthropicConfigFormProps) => {
  const { form } = props

  return (
    <>
      <FormField
        control={form.control}
        name="anthropicKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Anthropic key</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              You can find your key in the{' '}
              <a
                href="https://console.anthropic.com/settings/keys"
                target="_blank"
                rel="noreferrer">
                Anthropic Console
              </a>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="anthropicModel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Model name</FormLabel>
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
