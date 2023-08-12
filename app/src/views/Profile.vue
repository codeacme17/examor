<template>
  <v-container class="main_width">
    <h2>{{ $t('title.profile') }}</h2>
    <h5 class="text-medium-emphasis">{{ $t('subTitle.profile') }}</h5>

    <v-divider class="mt-8"></v-divider>

    <form class="pb-6">
      <!---------- Quesiton amount ---------->
      <h3 class="mt-6 mb-1">{{ $t('hint.questionCounts') }}</h3>
      <h5 class="mb-3 text-medium-emphasis">{{ $t('subTitle.changePlan') }}</h5>

      <v-slider
        v-model:model-value="formData.questionAmount.value"
        show-ticks
        thumb-label
        density="compact"
        prepend-icon="mdi-beaker-question"
        :min="3"
        :max="10"
        :step="1"
      />

      <!---------- Choose Model ---------->
      <h3 class="mt-4 mb-3">{{ $t('title.model') }}</h3>

      <t-radio-group
        v-model="formData.currentModel.value"
        class="mb-4"
        variant="default-filled"
      >
        <t-radio-button value="OpenAI">OpenAI</t-radio-button>
        <t-radio-button value="Azure">Azure</t-radio-button>
      </t-radio-group>

      <!---------- Keys ---------->
      <h3 class="mt-4 mb-3">{{ $t('title.keys') }}</h3>

      <!-- OpenAI  -->
      <div v-if="formData.currentModel.value == 'OpenAI'" class="d-flex">
        <OpenaiIcon width="30" class="mb-3 mr-4" />
        <div style="flex: 1">
          <v-text-field
            v-model="formData.openaiKey.value"
            class="mt-3"
            label="OPENAI_KEY"
            variant="outlined"
            density="compact"
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
            label="AZURE_KEY"
            variant="outlined"
            density="compact"
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
            label="AZURE_VERSION"
            variant="outlined"
            density="compact"
            :base-color="
              PROFILE_STORE.profile.openaiVersion.error ? orangeBgColor : ''
            "
            :color="
              PROFILE_STORE.profile.openaiVersion.error ? orangeBgColor : ''
            "
          />
          <!-- Azure end-point -->
          <v-text-field
            v-model="formData.openaiBase.value"
            class="mt-3"
            label="AZURE_END_PONIT"
            variant="outlined"
            density="compact"
            :base-color="
              PROFILE_STORE.profile.openaiBase.error ? orangeBgColor : ''
            "
            :color="PROFILE_STORE.profile.openaiBase.error ? orangeBgColor : ''"
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

      <!-- Notion -->
      <div class="d-flex mt-3">
        <NotionIcon width="30" class="mb-5 mr-4" />

        <v-text-field
          v-model="formData.notionKey.value"
          label="NOTION_KEY"
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

      <!---------- Other configuration ---------->
      <h3 class="my-4">{{ $t('title.otherConfigurations') }}</h3>

      <!-- Proxy -->
      <div class="d-flex">
        <v-text-field
          v-model="formData.proxy.value"
          variant="outlined"
          density="compact"
          placeholder="127.0.0.1:1086"
          :label="$t('label.proxy')"
          :hint="$t('hint.proxy')"
        />
      </div>

      <!-- Submit button -->
      <div class="mt-5 d-flex justify-end">
        <v-btn
          color="primary"
          elevation="0"
          :block="true"
          :loading="PROFILE_STORE.confirmLoading"
          :disabled="PROFILE_STORE.confirmLoading || !isUpdateFormData"
          @click="handleConfirm"
        >
          {{ $t('button.submit') }}
        </v-btn>
      </div>
    </form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { watchDeep } from '@vueuse/core'
import { orangeBgColor } from '@/utils'
import { useProfileStore } from '@/store'

const PROFILE_STORE = useProfileStore()
const formData = PROFILE_STORE.profile
const isUpdateFormData = ref(false)

watchDeep(formData, () => {
  isUpdateFormData.value = true

  if (formData.notionKey) {
    PROFILE_STORE.profile.notionKey.error = false
  }
})

const handleConfirm = async () => {
  await PROFILE_STORE.setProfile()
  isUpdateFormData.value = false
}

onUnmounted(() => {
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
</style>
