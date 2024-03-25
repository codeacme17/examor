import { create } from 'zustand'
import { ProfileType } from '@/types/global'

interface ProfileState {
  profile: ProfileType
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: {},
  setProfile: (newProfile: ProfileType) => set({ profile: newProfile }),
}))
