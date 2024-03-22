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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { RoleTypeSwitch } from '@/components/share/role-type-switch'

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
      questionAmount: 12,
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
        {/* QUESTION AMOUNT SELECT */}
        <FormField
          control={form.control}
          name="questionAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                <span>
                  Please select how many questions are prepared for
                  you each day
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
                The new plan will be implemented tomorrow after
                submitting the changes
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
                      <RoleTypeSwitch
                        roleType="examiner"
                        className="mr-1"
                      />
                      Examiner
                    </TabsTrigger>
                    <TabsTrigger value="teacher">
                      <RoleTypeSwitch
                        roleType="teacher"
                        className="mr-1"
                      />
                      Teacher
                    </TabsTrigger>
                    <TabsTrigger value="interviewer">
                      <RoleTypeSwitch
                        roleType="interviewer"
                        className="mr-1"
                      />
                      Interviewer
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </FormControl>
              <FormDescription>
                Roles affect question generation and answer detection
                results
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
                  onValueChange={(value) => {
                    field.onChange(value as RoleType)
                  }}
                  className="w-full md:w-[500px]">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="openai">OpenAI</TabsTrigger>
                    <TabsTrigger value="azure">Azure</TabsTrigger>
                    <TabsTrigger value="anthropic">
                      Anthropic
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
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
