<template>
  <v-container class="main_width">
    <h2>{{ $t('title.addNote') }}</h2>
    <h5 class="text-medium-emphasis">{{ $t('subTitle.addNote') }}</h5>

    <v-divider class="mt-8"></v-divider>

    <section class="py-6">
      <v-select
        v-model="fileType"
        class="mt-3"
        variant="outlined"
        density="compact"
        item-title="label"
        item-value="value"
        :label="$t('label.selectNoteType')"
        :items="noteTypeOptions"
      />
      <t-config-provider :global-config="locale === 'en' ? enConfig : cnConfig">
        <t-upload
          v-model="files"
          placeholder=""
          theme="file-flow"
          multiple
          :autoUpload="false"
        >
        </t-upload>
      </t-config-provider>
    </section>

    <div class="mt-2 d-flex justify-end">
      <v-btn color="primary" elevation="0" :block="true">
        {{ $t('button.submit') }}
      </v-btn>
    </div>
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
import enConfig from 'tdesign-vue-next/es/locale/en_US'
import cnConfig from 'tdesign-vue-next/es/locale/zh_CN'

const { t, locale } = useI18n()

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

const fileType = ref<string | null>()
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

:deep(.t-upload__flow-bottom) {
  display: none;
}
</style>
