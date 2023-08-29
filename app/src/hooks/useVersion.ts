import { ref, type Ref } from 'vue'
import { useFetch } from './useFetch'
import { TOOL_API } from '@/apis'
import { useMessageStore } from '@/store'

/**
 *  Check if the local version is the latest version, if not, prompt the user to update
 *
 *  @param message the message will notice user
 *  @returns boolean indicates whether to update
 */
export const useVersion = async (message: string): Promise<Ref<boolean>> => {
  const MESSAGE_STORE = useMessageStore()

  const [fetch] = useFetch(TOOL_API.getTagVersion)
  const isNeedUpdate = ref(false)
  const githubRes = await fetch()
  const localRes = await import('../../package.json')
  const lastVersion = githubRes[0].name.split('v')[1]
  const currentVersion = localRes.version

  const res = compareVersions(lastVersion, currentVersion)
  if (res === 1) {
    isNeedUpdate.value = true
    MESSAGE_STORE.show(
      message,
      'button',
      '',
      'https://github.com/codeacme17/examor#%EF%B8%8F-update-the-project'
    )
  } else isNeedUpdate.value = false

  return isNeedUpdate
}

function compareVersions(version1: string, version2: string): number {
  const parts1 = version1.split('.')
  const parts2 = version2.split('.')

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const num1 = parseInt(parts1[i] || '0', 10)
    const num2 = parseInt(parts2[i] || '0', 10)

    if (num1 < num2) return -1
    else if (num1 > num2) return 1
  }

  return 0
}
