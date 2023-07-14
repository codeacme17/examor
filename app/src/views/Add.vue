<template>
  <v-container class="main_width">
    <h2>{{ $t('title.addNote') }}</h2>
    <h5>{{ $t('subTitle.addNote') }}</h5>

    <v-divider class="mt-8"></v-divider>

    <section class="py-6">
      <v-select
        class="mt-3"
        variant="outlined"
        density="compact"
        item-title="label"
        item-value="value"
        :label="$t('label.selectNoteType')"
        :items="noteTypeOptions"
      >
      </v-select>

      <v-file-input
        class="mt-3"
        counter
        multiple
        prepend-inner-icon="mdi-file-document-plus"
        variant="outlined"
        v-model="files"
        :label="$t('label.selectFiles')"
        :show-size="1000"
      >
        <template v-slot:selection="{ fileNames }">
          <template v-for="(fileName, index) in fileNames" :key="fileName">
            <v-chip
              v-if="index < 2"
              class="me-2"
              label
              color="primary"
              size="small"
            >
              {{ fileName }}
            </v-chip>

            <span
              v-else-if="index === 2"
              class="text-overline text-grey-darken-3 mx-2"
            >
              +{{ files.length - 2 }} File(s)
            </span>
          </template>
        </template>
      </v-file-input>
    </section>
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'Add',
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const noteTypeOptions = computed(() => [
  {
    label: t('option.localFiles'),
    value: 'files',
  },
  {
    label: t('option.notion'),
    value: 'notion',
  },
])

const files = ref<any[]>([])
</script>

<style scoped lang="scss">
:deep(.v-field__field) {
  height: 38px;
  font-size: 14px;

  .v-field__input {
    padding-top: 5px !important;
  }
}
</style>
