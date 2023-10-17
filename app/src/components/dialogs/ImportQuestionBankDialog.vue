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
        default-value="1"
        class="mt-3"
      >
        <t-radio-button value="exist">
          {{ $t('label.existNote') }}
        </t-radio-button>
        <t-radio-button value="new"> {{ $t('label.newNote') }}</t-radio-button>
      </t-radio-group>

      <v-table
        v-show="tabType == 'exist'"
        fixed-header
        height="300px"
        density="compact"
      >
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Calories</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
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
import { toRef, ref, computed } from 'vue'
import { reverseTheme } from '@/utils'

const props = defineProps(['isShowDialog'])
const emits = defineEmits(['update:isShowDialog', 'submitted'])

// Handle switch dialog visible
const _isShowDialog = toRef(props, 'isShowDialog')
const handleVisible = (isVisible: boolean) => {
  _isShowDialog.value = isVisible
  emits('update:isShowDialog', isVisible)
}

const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
  },
  {
    name: 'Eclair',
    calories: 262,
  },
  {
    name: 'Cupcake',
    calories: 305,
  },
  {
    name: 'Gingerbread',
    calories: 356,
  },
  {
    name: 'Jelly bean',
    calories: 375,
  },
  {
    name: 'Lollipop',
    calories: 392,
  },
  {
    name: 'Honeycomb',
    calories: 408,
  },
  {
    name: 'Donut',
    calories: 452,
  },
  {
    name: 'KitKat',
    calories: 518,
  },
]

const tabType = ref<'exist' | 'new'>('exist')
const noteName = ref('')

const disabled = computed(() => {
  if (tabType.value == 'exist') {
    if (!desserts.length) return true
    return false
  }

  if (tabType.value == 'new') {
    if (!noteName.value) return true
    return false
  }

  return true
})
</script>
