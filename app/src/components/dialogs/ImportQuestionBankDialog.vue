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

      <v-form v-show="tabType == 'new'">
        <v-text-field
          v-model="newNoteName"
          variant="outlined"
          density="compact"
          class="mt-4"
          :label="$t('label.noteName')"
        />
      </v-form>

      <v-btn variant="outlined" :disabled="disabled" @click="handleSubmit">
        {{ $t('button.submit') }}
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { toRef, ref, computed } from 'vue'
import { useNoteStore, NoteItem } from '@/store'
import { reverseTheme } from '@/utils'

const props = defineProps(['isShowDialog'])
const emits = defineEmits(['update:isShowDialog', 'submitted'])
const NOTE_STORE = useNoteStore()

// Handle switch dialog visible
const _isShowDialog = toRef(props, 'isShowDialog')
const handleVisible = (isVisible: boolean) => {
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
  if (tabType.value == 'exist' && !selectedNote.value) return true
  if (tabType.value == 'new' && !newNoteName.value) return true
  return false
})

const handleSubmit = () => {
  console.log(selectedNote, newNoteName, tabType)
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
