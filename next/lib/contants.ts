import { ProfileType } from '@/types/global'

export const PROFILE_DEFAULT: ProfileType = {
  questionAmount: 12,
  currentModel: 'openai',
  currentRole: 'examiner',
  openaiKey: '',
  openaiOrganization: '',
  openaiModel: 'gpt-3.5-turbo',
  openaiProxy: '',
  azureKey: '',
  openaiBase: 'https://api.openai.com',
  azureBase: '',
  openaiVersion: '',
  deploymentName: '',
  anthropicKey: '',
  anthropicModel: '',
}

export const PROFILE_INPUT_KEYS: Array<keyof ProfileType> = [
  'openaiKey',
  'openaiOrganization',
  'openaiModel',
  'openaiProxy',
  'azureKey',
  'openaiBase',
  'azureBase',
  'openaiVersion',
  'deploymentName',
  'anthropicKey',
  'anthropicModel',
]
