<template>
  <v-container class="main_width">
    <header class="d-flex flex-column">
      <h2>{{ $t('title.profile') }}</h2>
      <h5 class="text-medium-emphasis">{{ $t('subTitle.profile') }}</h5>

      <v-btn
        class="mb-2 mt-5"
        append-icon="mdi-database-export"
        size="small"
        :color="greenBgColor"
        :elevation="0"
        @click="isShowExportDialog = true"
      >
        {{ $t('button.export') }}
      </v-btn>
      <v-btn
        append-icon="mdi-file-import"
        variant="tonal"
        size="small"
        :elevation="0"
        @click="isShowImportDialog = true"
      >
        {{ $t('button.import') }}
      </v-btn>
    </header>

    <v-divider class="my-5"></v-divider>

    <form class="pb-6">
      <!---------- Quesiton amount ---------->
      <h3 class="mb-1">{{ $t('hint.questionCounts') }}</h3>
      <h5 class="mb-3 text-medium-emphasis">{{ $t('subTitle.changePlan') }}</h5>
      <v-slider
        v-model:model-value="formData.questionAmount.value"
        show-ticks
        thumb-label
        density="compact"
        prepend-icon="mdi-beaker-question"
        :min="3"
        :max="20"
        :step="1"
      />

      <!---------- Roles ---------->
      <h3 class="mt-4 mb-3">{{ $t('title.role') }}</h3>
      <h5 class="mb-3 text-medium-emphasis">
        {{ $t('subTitle.role') }},
        <a
          :href="
            locale === 'en'
              ? 'https://github.com/codeacme17/examor/blob/main/docs/en-role.md'
              : 'https://github.com/codeacme17/examor/blob/main/docs/zh-role.md'
          "
          target="_blank"
        >
          {{ $t('button.role') }}
          <v-icon icon="mdi-open-in-new" style="font-size: 16px" />
        </a>
      </h5>
      <t-radio-group
        v-model="formData.currentRole.value"
        variant="default-filled"
        default-value="examiner"
        class="mb-3"
      >
        <t-radio-button value="examiner">
          🥷 {{ $t('button.examiner') }}
        </t-radio-button>
        <t-radio-button value="teacher">
          👩‍🏫 {{ $t('button.teacher') }}
        </t-radio-button>
        <t-radio-button value="interviewer">
          👨‍💻 {{ $t('button.interviewer') }}
        </t-radio-button>
      </t-radio-group>

      <!---------- Choose Model ---------->
      <h3 class="mt-4 mb-3">{{ $t('title.model') }}</h3>
      <t-radio-group
        v-model="formData.currentModel.value"
        class="mb-4"
        variant="default-filled"
      >
        <t-radio-button value="OpenAI">OpenAI</t-radio-button>
        <t-radio-button value="Azure">Azure</t-radio-button>
        <t-radio-button value="Anthropic">Anthropic</t-radio-button>
      </t-radio-group>

      <!---------- Keys ---------->
      <h3 class="mt-4 mb-3">{{ $t('title.keys') }}</h3>

      <!-- OpenAI  -->
      <div v-if="formData.currentModel.value == 'OpenAI'" class="d-flex">
        <OpenaiIcon width="30" class="mb-auto mt-4 mr-4" />

        <div style="flex: 1">
          <v-select
            v-model="formData.openaiModel.value"
            class="mt-3"
            label="MODEL"
            variant="outlined"
            density="compact"
            :base-color="formData.openaiModel.error ? orangeBgColor : ''"
            :color="formData.openaiModel.error ? orangeBgColor : ''"
            :items="['gpt-3.5-turbo', 'gpt-4', 'gpt-4-1106-preview']"
          />

          <!-- OpenAI API KEY -->
          <v-text-field
            v-model="formData.openaiKey.value"
            class="mt-3"
            label="KEY"
            variant="outlined"
            density="compact"
            :counter="51"
            :append-inner-icon="
              formData.openaiKey.show ? 'mdi-eye' : 'mdi-eye-off'
            "
            :type="formData.openaiKey.show ? 'text' : 'password'"
            :base-color="
              PROFILE_STORE.profile.openaiKey.error ? orangeBgColor : ''
            "
            :color="PROFILE_STORE.profile.openaiKey.error ? orangeBgColor : ''"
            @click:append-inner="
              formData.openaiKey.show = !formData.openaiKey.show
            "
          />

          <!-- OpenAI Organiztion -->
          <v-text-field
            v-model="formData.openaiOrganization.value"
            class="mt-3"
            label="ORGANIZATION"
            variant="outlined"
            density="compact"
            :counter="28"
            :append-inner-icon="
              formData.openaiOrganization.show ? 'mdi-eye' : 'mdi-eye-off'
            "
            :type="formData.openaiOrganization.show ? 'text' : 'password'"
            :base-color="
              PROFILE_STORE.profile.openaiOrganization.error
                ? orangeBgColor
                : ''
            "
            :color="
              PROFILE_STORE.profile.openaiOrganization.error
                ? orangeBgColor
                : ''
            "
            @click:append-inner="
              formData.openaiOrganization.show =
                !formData.openaiOrganization.show
            "
          />

          <!-- Openai api base -->
          <v-text-field
            v-model="formData.openaiBase.value"
            class="mt-3"
            label="API_BASE"
            variant="outlined"
            density="compact"
            :base-color="
              PROFILE_STORE.profile.openaiBase.error ? orangeBgColor : ''
            "
            :color="PROFILE_STORE.profile.openaiBase.error ? orangeBgColor : ''"
            :hint="$t('hint.openaiBase')"
          />

          <!-- Openai Proxy -->
          <v-text-field
            v-model="formData.openaiProxy.value"
            class="mt-3"
            label="PROXY"
            variant="outlined"
            density="compact"
            :base-color="
              PROFILE_STORE.profile.openaiProxy.error ? orangeBgColor : ''
            "
            :color="
              PROFILE_STORE.profile.openaiProxy.error ? orangeBgColor : ''
            "
            :hint="$t('hint.openaiProxy')"
          />
        </div>
      </div>

      <!-- Azure -->
      <div v-if="formData.currentModel.value === 'Azure'" class="d-flex">
        <AzureIcon width="30" class="mb-auto mt-4 mr-4" />

        <div style="flex: 1">
          <!-- Azure key -->
          <v-text-field
            v-model="formData.azureKey.value"
            class="mt-3"
            label="KEY"
            variant="outlined"
            density="compact"
            :counter="32"
            :append-inner-icon="
              formData.azureKey.show ? 'mdi-eye' : 'mdi-eye-off'
            "
            :type="formData.azureKey.show ? 'text' : 'password'"
            :base-color="
              PROFILE_STORE.profile.azureKey.error ? orangeBgColor : ''
            "
            :color="PROFILE_STORE.profile.azureKey.error ? orangeBgColor : ''"
            @click:append-inner="
              formData.azureKey.show = !formData.azureKey.show
            "
          />
          <!-- Azure version -->
          <v-text-field
            v-model="formData.openaiVersion.value"
            class="mt-3"
            label="VERSION"
            variant="outlined"
            density="compact"
            :base-color="
              PROFILE_STORE.profile.openaiVersion.error ? orangeBgColor : ''
            "
            :color="
              PROFILE_STORE.profile.openaiVersion.error ? orangeBgColor : ''
            "
          />
          <!-- Azure api base -->
          <v-text-field
            v-model="formData.azureBase.value"
            class="mt-3"
            label="API_BASE"
            variant="outlined"
            density="compact"
            :base-color="
              PROFILE_STORE.profile.azureBase.error ? orangeBgColor : ''
            "
            :color="PROFILE_STORE.profile.azureBase.error ? orangeBgColor : ''"
          />
          <!-- Deployment name -->
          <v-text-field
            v-model="formData.deploymentName.value"
            class="mt-3"
            label="DEPLOYMENT_NAME"
            variant="outlined"
            density="compact"
            :base-color="
              PROFILE_STORE.profile.deploymentName.error ? orangeBgColor : ''
            "
            :color="
              PROFILE_STORE.profile.deploymentName.error ? orangeBgColor : ''
            "
          />
        </div>
      </div>

      <!-- Anthropic -->
      <div v-if="formData.currentModel.value === 'Anthropic'" class="d-flex">
        <!-- @TODO: Anthropic logo -->
        <!-- <AzureIcon width="30" class="mb-auto mt-4 mr-4" /> -->

        <div style="flex: 1">
          <!-- Anthropic key -->
          <v-text-field
            v-model="formData.anthropicKey.value"
            class="mt-3"
            label="KEY"
            variant="outlined"
            density="compact"
            :counter="32"
            :append-inner-icon="
              formData.anthropicKey.show ? 'mdi-eye' : 'mdi-eye-off'
            "
            :type="formData.anthropicKey.show ? 'text' : 'password'"
            :base-color="
              PROFILE_STORE.profile.anthropicKey.error ? orangeBgColor : ''
            "
            :color="
              PROFILE_STORE.profile.anthropicKey.error ? orangeBgColor : ''
            "
            @click:append-inner="
              formData.anthropicKey.show = !formData.anthropicKey.show
            "
          />

          <!-- Anthropic Model -->
          <v-select
            v-model="formData.anthropicModel.value"
            class="mt-3"
            label="MODEL"
            variant="outlined"
            density="compact"
            :disabled="true"
            :base-color="formData.anthropicModel.error ? orangeBgColor : ''"
            :color="formData.anthropicModel.error ? orangeBgColor : ''"
            :items="['claude-2']"
          />

          <!-- Anthropic version -->
          <v-text-field
            v-model="formData.anthropicVersion.value"
            class="mt-3"
            label="VERSION"
            variant="outlined"
            density="compact"
            :disabled="true"
            :base-color="
              PROFILE_STORE.profile.anthropicVersion.error ? orangeBgColor : ''
            "
            :color="
              PROFILE_STORE.profile.anthropicVersion.error ? orangeBgColor : ''
            "
          />
        </div>
      </div>

      <!-- Notion -->
      <div class="d-flex mt-3">
        <NotionIcon width="30" class="mb-5 mr-4" />
        <v-text-field
          v-model="formData.notionKey.value"
          label="KEY"
          variant="outlined"
          density="compact"
          :append-inner-icon="
            formData.notionKey.show ? 'mdi-eye' : 'mdi-eye-off'
          "
          :base-color="
            PROFILE_STORE.profile.notionKey.error ? orangeBgColor : ''
          "
          :color="PROFILE_STORE.profile.notionKey.error ? orangeBgColor : ''"
          :type="formData.notionKey.show ? 'text' : 'password'"
          @click:append-inner="
            formData.notionKey.show = !formData.notionKey.show
          "
        />
      </div>

      <!---------- Submit button ---------->
      <div class="mt-5 d-flex justify-end">
        <v-btn
          color="primary"
          elevation="0"
          :block="true"
          :loading="PROFILE_STORE.confirmLoading"
          :disabled="
            PROFILE_STORE.confirmLoading || !isUpdatedFormData || isFormError
          "
          @click="handleConfirm"
        >
          {{ $t('button.submit') }}
        </v-btn>
      </div>
    </form>

    <!-- Export data dialog -->
    <export-dialog v-model:isShowDialog="isShowExportDialog" />

    <!-- Export data dialog -->
    <import-dialog v-model:isShowDialog="isShowImportDialog" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { watchDeep } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { orangeBgColor, greenBgColor } from '@/utils'
import { useProfileStore, ProfileItem, ProfileKey } from '@/store'
import { computed } from 'vue'

const { locale } = useI18n()
const PROFILE_STORE = useProfileStore()

const isShowExportDialog = ref(false)
const isShowImportDialog = ref(false)

// Handle sumbit profile configurations event
const formData = PROFILE_STORE.profile
const isUpdatedFormData = ref(false)
const handleConfirm = async () => {
  await PROFILE_STORE.setProfile()
  isUpdatedFormData.value = false
}
const isFormError = computed(() => {
  for (const key in formData) {
    if (Object.prototype.hasOwnProperty.call(formData, key)) {
      const profileKey = key as ProfileKey
      const element: ProfileItem = formData[profileKey]
      if (element.error !== undefined && element.error === true) return true
    }
  }
  return false
})

// Valid key length
const validFieldLength = (key: ProfileKey, length: number) => {
  if (formData[key].value && (formData[key].value as string).length !== length)
    formData[key].error = true
  else formData[key].error = false
}

watchDeep(formData, () => {
  // If change any form data, set isUpdatedFormData to true
  isUpdatedFormData.value = true

  validFieldLength('openaiKey', 51) // Valid openai key length
  validFieldLength('openaiOrganization', 28) // Valid openai organization length
  validFieldLength('azureKey', 32) // Valid azure key length

  if (formData.notionKey) PROFILE_STORE.profile.notionKey.error = false
})

onUnmounted(() => {
  PROFILE_STORE.getProfile()
  PROFILE_STORE.clearError()
})
</script>

<style scoped lang="scss">
:deep(.v-field__field) {
  height: 38px;
  font-size: 14px;

  .v-field__input {
    padding-top: 4px !important;
  }
}
:deep(.v-input__prepend) {
  font-size: 22px !important;
  margin: 0px 5px 0px -5px;
  padding-right: 13px !important;
}
:deep(.v-counter) {
  font-size: 10px !important;
}
</style>
