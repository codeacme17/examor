<template>
  <v-container class="main_width">
    <h2>{{ $t('title.addNote') }}</h2>
    <h5 class="text-medium-emphasis">{{ $t('subTitle.addNote') }}</h5>

    <v-divider class="mt-8"></v-divider>

    <form class="py-6">
      <v-text-field
        v-model="formData.noteName"
        class="mt-3"
        variant="outlined"
        density="compact"
        :color="requiredFieldBorderColor"
        :base-color="requiredFieldBorderColor"
        :label="$t('label.noteName') + '*'"
        :error-messages="
          v$.noteName.$errors.map(() => $t('errorHint.namespace'))
        "
        @input="v$.noteName.$touch"
      />

      <v-text-field
        v-model="formData.namespace"
        class="mt-4"
        variant="outlined"
        density="compact"
        :color="requiredFieldBorderColor"
        :base-color="requiredFieldBorderColor"
        :label="$t('label.namespace') + '*'"
        :error-messages="
          v$.namespace.$errors.map(() => $t('errorHint.namespace'))
        "
        @input="v$.namespace.$touch"
      />

      <v-select
        v-model="noteType"
        class="mt-4"
        variant="outlined"
        density="compact"
        item-title="label"
        item-value="value"
        :label="$t('label.selectNoteType')"
        :items="noteTypeOptions"
      />

      <t-config-provider
        v-if="noteType === 'files'"
        :global-config="locale === 'en' ? enConfig : cnConfig"
      >
        <t-upload
          v-model="formData.files"
          class="mt-1"
          placeholder=""
          theme="file-flow"
          multiple
          :autoUpload="false"
        />
      </t-config-provider>
    </form>

    <div class="mt-2 d-flex justify-end">
      <v-btn
        v-show="noteType"
        color="primary"
        elevation="0"
        :block="true"
        :disabled="disabled"
      >
        {{ $t('button.submit') }}
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'AddNote',
}
</script>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { requiredFieldBorderColor } from '@/utils'
import { useConfirmBtnDisabled } from '@/hooks'

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

const formData = reactive<{
  noteName: string
  namespace: string
  files: any[]
}>({
  noteName: '',
  namespace: '',
  files: [],
})
const noteType = ref<'files' | 'notion' | null>(null)

const rules = {
  noteName: { required },
  namespace: { required },
}
const v$ = useVuelidate(rules, formData)

const disabled = useConfirmBtnDisabled(formData, {
  files: noteType.value === 'files',
  notion: noteType.value === 'notion',
})
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

:deep(.t-upload__flow-card-area) {
  border-radius: 10px;
  border-width: 2px;

  .t-upload__flow-empty {
    user-select: none !important;
  }
}
</style>
