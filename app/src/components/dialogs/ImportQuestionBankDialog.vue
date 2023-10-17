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
        height="300px"
        density="compact"
      >
        <thead>
          <tr>
            <th class="text-left" style="width: 40px"></th>
            <th class="text-left">{{ $t('label.noteName') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in noteList" :key="item.name">
            <td><v-icon :icon="item.icon"></v-icon></td>
            <td>{{ item.name }}</td>
          </tr>
        </tbody>
      </v-table>

      <v-form v-show="tabType == 'new'">
        <v-text-field
          v-model="noteName"
          variant="outlined"
          density="compact"
          class="mt-4"
          :label="$t('label.noteName')"
        />
      </v-form>

      <v-btn variant="outlined" :disabled="disabled">
        {{ $t('button.submit') }}
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { toRef, ref, computed, reactive } from 'vue'
import { NoteItem } from '@/store'
import { reverseTheme } from '@/utils'

const props = defineProps(['isShowDialog'])
const emits = defineEmits(['update:isShowDialog', 'submitted'])

// Handle switch dialog visible
const _isShowDialog = toRef(props, 'isShowDialog')
const handleVisible = (isVisible: boolean) => {
  _isShowDialog.value = isVisible
  emits('update:isShowDialog', isVisible)
}

const noteList = reactive<NoteItem[] | []>([
  {
    id: 1,
    name: 'Note 1',
    icon: 'mdi-folder-table',
  },
  {
    id: 2,
    name: 'Note 2',
    icon: 'mdi-folder-table',
  },
  {
    id: 3,
    name: 'Note 3',
    icon: 'mdi-folder-table',
  },
])

const tabType = ref<'exist' | 'new'>('new')
const noteName = ref('')

const disabled = computed(() => {
  if (tabType.value == 'exist') {
    if (!noteList.length) return true
    return false
  }

  if (tabType.value == 'new') {
    if (!noteName.value) return true
    return false
  }

  return true
})
</script>
