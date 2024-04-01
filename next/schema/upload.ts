import { z } from 'zod'
import { UploadFormType } from '@/types/global'

export const createFormSchema = (type: UploadFormType) => {
  return z.object({
    type: z.enum(['short', 'single', 'blank']),

    name:
      type === 'note'
        ? z.string().min(2, {
            message: 'File name must be at least 2 characters.',
          })
        : z.literal(''),

    files: z.array(z.instanceof(File)).min(1, {
      message: 'Please upload at least 1 file.',
    }),
  })
}
