<template>
  <h2 class="mb-3 d-flex align-center">
    <v-menu :close-on-content-click="false" offset="6">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          variant="text"
          class="mr-2"
          :icon="NOTE_STORE.currentIcon"
          style="font-size: 27px; border-radius: 0px; border-radius: 3px"
        />
      </template>

      <v-card min-width="420" class="px-5 py-3">
        <div class="mb-3 text-body-1">
          {{ $t('hint.getIcon') }}
          <a
            href="https://pictogrammers.com/library/mdi/"
            target="_blank"
            style="text-decoration: none; font-weight: 600"
          >
            Material Design Icons
          </a>
        </div>

        <v-text-field
          v-model.trim="inputIconValue"
          class="mb-1"
          variant="outlined"
          density="compact"
          :append-inner-icon="updateIconLoading ? '' : 'mdi-location-enter'"
          :placeholder="NOTE_STORE.currentIcon"
          :hide-details="true"
          @click:append-inner="handleChangeIcon"
          @keydown.prevent.enter="handleChangeIcon"
        />
      </v-card>
    </v-menu>

    <div>{{ props.name }}</div>
  </h2>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '@/hooks'
import { NOTE_API } from '@/apis'
import { useNoteStore } from '@/store'

const props = defineProps(['id', 'name'])

const NOTE_STORE = useNoteStore()
const [updateNoteIcon, updateIconLoading] = useFetch(NOTE_API.updateNoteIcon)

const inputIconValue = ref('')
const handleChangeIcon = async () => {
  if (!inputIconValue.value) return

  const res = await updateNoteIcon({
    id: props.id,
    icon: inputIconValue.value,
  })

  if (res.code !== 0) return
  NOTE_STORE.currentIcon = inputIconValue.value
  await NOTE_STORE.getNotes()
  inputIconValue.value = ''
}
</script>
