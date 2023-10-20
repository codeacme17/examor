<template>
  <v-dialog
    v-model="_isShowDialog"
    theme="light"
    width="460px"
    style="margin-bottom: 240px; min-width: 300px"
    @update:model-value="handleVisible"
  >
    <v-card class="pa-5" :theme="reverseTheme">
      <h3>{{ $t('title.importBank') }}</h3>
      <h5 class="text-medium-emphasis mt-2">
        {{ $t('subTitle.importBank') }}
      </h5>

      <t-radio-group
        v-model="tabType"
        variant="default-filled"
        default-value="new"
        class="mt-3"
      >
        <t-radio-button value="new"> {{ $t('label.newNote') }}</t-radio-button>
        <t-radio-button value="exist" :disabled="!noteList.length">
          {{ $t('label.existNote') }}
        </t-radio-button>
      </t-radio-group>

      <v-table
        v-show="tabType == 'exist'"
        fixed-header
        height="240px"
        density="comfortable"
        class="mt-3"
      >
        <tbody>
          <tr
            v-for="item in noteList"
            class="tr"
            :key="item.name"
            :style="{
              backgroundColor:
                item.id === selectedNote?.id ? 'var(--gray-bg)' : '',
            }"
            @click="handleClickTr(item)"
          >
            <td><v-icon :icon="item.icon"></v-icon></td>
            <td>{{ item.name }}</td>
          </tr>
        </tbody>
      </v-table>

      <v-form v-show="tabType == 'new'" @submit.prevent>
        <v-text-field
          v-model="newNoteName"
          variant="outlined"
          density="compact"
          class="mt-4"
          :label="$t('label.noteName')"
        />
      </v-form>

      <v-btn
        variant="outlined"
        :disabled="disabled"
        :loading="importLoading"
        @click="handleSubmit"
      >
        {{ $t('button.submit') }}
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { toRef, ref, computed } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { useI18n } from 'vue-i18n'
import { useNoteStore, NoteItem } from '@/store'
import { reverseTheme } from '@/utils'
import { BANK_API } from '@/apis'
import { useFetch } from '@/hooks'
import { QuesitonBankType } from '@/components/card/QuestionBankCard.vue'

const props = defineProps<{
  isShowDialog: boolean
  currentBank: QuesitonBankType
}>()
const emits = defineEmits(['update:isShowDialog', 'submitted'])

const { locale } = useI18n()
const NOTE_STORE = useNoteStore()

// Handle switch dialog visible
const _isShowDialog = toRef(props, 'isShowDialog')
const handleVisible = (isVisible: boolean) => {
  if (importLoading.value) return

  _isShowDialog.value = isVisible
  emits('update:isShowDialog', isVisible)
}

const tabType = ref<'exist' | 'new'>('new')

const noteList = NOTE_STORE.notes
const selectedNote = ref<NoteItem | null>(null)
const newNoteName = ref('')
const handleClickTr = (item: NoteItem) => {
  if (item.id === selectedNote.value?.id) {
    selectedNote.value = null
    return
  }
  selectedNote.value = item
}

const disabled = computed(() => {
  if (importLoading.value) return true
  if (tabType.value == 'exist' && !selectedNote.value) return true
  if (tabType.value == 'new' && !newNoteName.value) return true
  return false
})

const [importBank, importLoading] = useFetch(BANK_API.importBank)
const handleSubmit = async () => {
  const res = await importBank({
    import_type: tabType.value,
    note_id: tabType.value == 'exist' ? selectedNote.value?.id : -1,
    note_name: tabType.value == 'new' ? newNoteName.value : '',
    language: locale.value === 'zh-CN' ? 'zh' : 'en',
    category: props.currentBank.category,
    bank_name: props.currentBank.name,
  })

  if (res.code === 0) handleSuccess()
}

const handleSuccess = () => {
  NOTE_STORE.getNotes()
  tabType.value = 'new'
  newNoteName.value = ''
  selectedNote.value = null
  handleVisible(false)
  emits('submitted')
  MessagePlugin.success(`Import "${props.currentBank.name}" successful`)
}
</script>

<style lang="scss" scoped>
.tr {
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: var(--gray-bg);
  }
}
</style>
