import { create } from 'zustand'
import { ProfileType } from '@/types/global'
import { PROFILE_DEFAULT } from '@/lib/contants'

interface ProfileState {
  profile: ProfileType
  setProfile: (newProfile: ProfileType) => void
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: PROFILE_DEFAULT,
  setProfile: (newProfile: ProfileType) => set({ profile: newProfile }),
}))
