'use client'

import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ModelType, ProfileType, RoleType } from '@/types/global'
import { useProfileStore } from '@/store'
import { PROFILE_DEFAULT } from '@/lib/contants'
import { profileFormSchema as formSchema } from '@/schema/profile'

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
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { RoleTypeSwitch } from '@/components/share/role-type-switch'
import { OpenaiConfigForm } from './openai-config-form'
import { AzureConfigForm } from './azure-config-form'
import { AnthropicConfigForm } from './anthropic-config-form'

export const ProfileForm = () => {
  const { profile } = useProfileStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: PROFILE_DEFAULT,
  })

  const handleModelChange = (value: ModelType, field: { onChange: any }) => {
    field.onChange(value)
    form.clearErrors()
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateProfile()
  }

  const updateProfile = async () => {
    const data = form.getValues()
    const res = await fetch('/api/profile/update', {
      method: 'PATCH',
      body: JSON.stringify({ id: profile.id, ...data }),
    })

    console.log(await res.json())
  }

  useEffect(() => {
    for (const key in profile) {
      if (Object.prototype.hasOwnProperty.call(profile, key)) {
        const _key = key as keyof Omit<ProfileType, 'id'>
        const element = profile[_key]
        form.setValue(_key, element)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {/* QUESTION AMOUNT SELECT */}
        <FormField
          control={form.control}
          name="questionAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                <span>
                  Please select how many questions are prepared for you each day
                </span>
                <Badge className="text-md">{field.value}</Badge>
              </FormLabel>
              <FormControl className="mt-2">
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  value={[field.value]}
                  className="cursor-pointer"
                  onValueChange={(value: number[]) => {
                    field.onChange(value[0])
                  }}
                />
              </FormControl>
              <FormDescription>
                The new plan will be implemented tomorrow after submitting the
                changes
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ROLE SELECT */}
        <FormField
          control={form.control}
          name="currentRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please select your desired role</FormLabel>
              <FormControl>
                <Tabs
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value as RoleType)
                  }}
                  className="w-full md:w-[500px]">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="examiner">
                      <RoleTypeSwitch roleType="examiner" className="mr-1" />
                      Examiner
                    </TabsTrigger>
                    <TabsTrigger value="teacher">
                      <RoleTypeSwitch roleType="teacher" className="mr-1" />
                      Teacher
                    </TabsTrigger>
                    <TabsTrigger value="interviewer">
                      <RoleTypeSwitch roleType="interviewer" className="mr-1" />
                      Interviewer
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </FormControl>
              <FormDescription>
                Roles affect question generation and answer detection results
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* MODEL SELECT */}
        <FormField
          control={form.control}
          name="currentModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please choose the model to use</FormLabel>
              <FormControl>
                <Tabs
                  value={field.value}
                  onValueChange={(value) =>
                    handleModelChange(value as ModelType, field)
                  }
                  className="w-full md:w-[400px]">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="openai">OpenAI</TabsTrigger>
                    <TabsTrigger value="azure">Azure</TabsTrigger>
                    <TabsTrigger value="anthropic">Anthropic</TabsTrigger>
                  </TabsList>
                </Tabs>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {
          {
            openai: <OpenaiConfigForm form={form} />,
            azure: <AzureConfigForm form={form} />,
            anthropic: <AnthropicConfigForm form={form} />,
          }[form.watch('currentModel')]
        }

        <Button type="submit" className="w-full md:w-auto">
          Submit
        </Button>
      </form>
    </Form>
  )
}
