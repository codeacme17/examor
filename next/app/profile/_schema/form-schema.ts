import { z } from 'zod'

export const formSchema = z
  .object({
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

    // OpenAI
    openaiKey: z.string().optional(),
    openaiOrganization: z.string().optional(),
    openaiModel: z.union([
      z.literal('gpt-3.5-turbo'),
      z.literal('gpt-4'),
      z.literal('gpt-4-1106-preview'),
    ]),
    openaiProxy: z.string(),
    openaiBase: z.string(),

    // Azure
    azureKey: z.string().optional(),
    azureBase: z.string().optional(),
    openaiVersion: z.string().optional(),
    deploymentName: z.string(),

    // Anthropic
    anthropicKey: z.string(),
    anthropicVersion: z.string(),
    anthropicModel: z.string(),
  })
  .superRefine((data, ctx) => {
    switch (data.currentModel) {
      case 'openai':
        if (!data.openaiKey || data.openaiKey.length !== 51) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['openaiKey'],
            message: 'OpenAI key must be exactly 51 characters.',
          })
        }

        if (data.openaiOrganization && data.openaiOrganization.length !== 28) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['openaiOrganization'],
            message:
              'OpenAI Organization key must be exactly 28 characters if provided.',
          })
        }
        break

      case 'azure':
        if (!data.azureKey || data.azureKey.length !== 32) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['azureKey'],
            message: 'Azure key must be exactly 32 characters.',
          })
        }

        if (!data.openaiVersion) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['openaiVersion'],
            message: 'Model version must input.',
          })
        }

        if (!data.deploymentName) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['deploymentName'],
            message: 'Deployment Name must input.',
          })
        }

        break

      default:
        break
    }
  })
