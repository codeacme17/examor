import { create } from 'zustand'
import { ProfileType } from '@/types/global'

interface ProfileState {
  profile: ProfileType
  setProfile: (newProfile: ProfileType) => void
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: {},
  setProfile: (newProfile: ProfileType) => set({ profile: newProfile }),
}))
