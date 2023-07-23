<template>
  <v-container class="main_width">
    <h2>{{ $t('title.profile') }}</h2>
    <h5 class="text-medium-emphasis">{{ $t('subTitle.profile') }}</h5>

    <v-divider class="mt-8"></v-divider>

    <form class="py-6">
      <h3 class="mb-3">{{ $t('title.keys') }}</h3>

      <!-- OpenAI  -->
      <div class="d-flex">
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
            @click:append-inner="
              formData.openaiKey.show = !formData.openaiKey.show
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

      <h3 class="my-6">{{ $t('title.otherConfigurations') }}</h3>

      <!-- Proxy -->
      <div class="d-flex mt-6">
        <v-text-field
          v-model="formData.proxy.value"
          variant="outlined"
          density="compact"
          placeholder="127.0.0.1:1086"
          :label="$t('label.proxy')"
          :hint="$t('hint.proxy')"
        />
      </div>

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
  PROFILE_STORE.profile.notionKey.error = false
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
</style>
