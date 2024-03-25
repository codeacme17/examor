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
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/share/password-input'

interface AzureConfigFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
}

export const AzureConfigForm = (props: AzureConfigFormProps) => {
  const { form } = props

  return (
    <>
      <FormField
        control={form.control}
        name="azureKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Azure key</FormLabel>
            <FormControl>
              <PasswordInput {...field} />
            </FormControl>
            <FormDescription>
              You can find your Azure key in the{' '}
              <a
                href="https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Overview"
                target="_blank"
                rel="noreferrer">
                Azure Active Directory
              </a>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="openaiVersion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Model version</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="deploymentName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Azure deployment name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="azureBase"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Azure base endpoint</FormLabel>
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
