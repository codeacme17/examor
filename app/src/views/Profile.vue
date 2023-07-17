<template>
  <v-container class="main_width">
    <h2>{{ $t('title.profile') }}</h2>
    <h5 class="text-medium-emphasis">{{ $t('subTitle.profile') }}</h5>

    <v-divider class="mt-8"></v-divider>

    <form class="py-6">
      <!-- OpenAI  -->
      <div class="d-flex">
        <OpenaiIcon width="30" class="mb-12 mr-4" />

        <div style="flex: 1">
          <v-text-field
            v-model="formData.openaiKey.value"
            class="mt-3"
            label="OPENAI_KEY"
            variant="outlined"
            density="compact"
            :disabled="fetchKeyLoading"
            :loading="fetchKeyLoading"
            :append-inner-icon="
              formData.openaiKey.show ? 'mdi-eye' : 'mdi-eye-off'
            "
            :type="formData.openaiKey.show ? 'text' : 'password'"
            @click:append-inner="
              formData.openaiKey.show = !formData.openaiKey.show
            "
          />

          <v-tooltip
            location="bottom left"
            offset="4"
            :text="$t('hint.openAIBilling')"
            :open-delay="3"
            :open-on-hover="true"
          >
            <template v-slot:activator="{ props }">
              <v-progress-linear
                :height="6"
                v-bind="props"
                color="primary"
                model-value="20"
                class="mb-8"
              />
            </template>
          </v-tooltip>
        </div>
      </div>

      <!-- Azure  -->
      <div class="d-flex">
        <AzureIcon width="30" class="mb-auto mt-4 mr-4" />

        <div style="flex: 1">
          <v-text-field
            v-model="formData.azureKey.value"
            class="mt-3"
            label="AZURE_KEY"
            variant="outlined"
            density="compact"
            :disabled="fetchKeyLoading"
            :loading="fetchKeyLoading"
            :append-inner-icon="
              formData.azureKey.show ? 'mdi-eye' : 'mdi-eye-off'
            "
            :type="formData.azureKey.show ? 'text' : 'password'"
            @click:append-inner="
              formData.azureKey.show = !formData.azureKey.show
            "
          />
          <v-text-field
            v-model="formData.azureVersion.value"
            class="mt-3"
            label="AZURE_VERSION"
            variant="outlined"
            density="compact"
            :disabled="fetchKeyLoading"
            :loading="fetchKeyLoading"
            :append-inner-icon="
              formData.azureVersion.show ? 'mdi-eye' : 'mdi-eye-off'
            "
            :type="formData.azureVersion.show ? 'text' : 'password'"
            @click:append-inner="
              formData.azureVersion.show = !formData.azureVersion.show
            "
          />
          <v-text-field
            v-model="formData.azureEndpoint.value"
            class="mt-3"
            label="AZURE_END_PONIT"
            variant="outlined"
            density="compact"
            :disabled="fetchKeyLoading"
            :loading="fetchKeyLoading"
            :append-inner-icon="
              formData.azureEndpoint.show ? 'mdi-eye' : 'mdi-eye-off'
            "
            :type="formData.azureEndpoint.show ? 'text' : 'password'"
            @click:append-inner="
              formData.azureEndpoint.show = !formData.azureEndpoint.show
            "
          />
        </div>
      </div>

      <!-- Pinecone -->
      <div class="d-flex">
        <PineconeIcon width="30" class="mb-3 mr-4" />

        <v-text-field
          v-model="formData.pineconeKey.value"
          class="mt-3"
          label="PINECONE_KEY"
          variant="outlined"
          density="compact"
          :disabled="fetchKeyLoading"
          :loading="fetchKeyLoading"
          :append-inner-icon="
            formData.pineconeKey.show ? 'mdi-eye' : 'mdi-eye-off'
          "
          :type="formData.pineconeKey.show ? 'text' : 'password'"
          @click:append-inner="
            formData.pineconeKey.show = !formData.pineconeKey.show
          "
        />
      </div>

      <!-- Notion -->
      <div class="d-flex mt-3">
        <NotionIcon width="30" class="mb-5 mr-4" />

        <v-text-field
          v-model="formData.notionKey.value"
          label="NOTION_KEY"
          variant="outlined"
          density="compact"
          :disabled="fetchKeyLoading"
          :loading="fetchKeyLoading"
          :append-inner-icon="
            formData.notionKey.show ? 'mdi-eye' : 'mdi-eye-off'
          "
          :type="formData.notionKey.show ? 'text' : 'password'"
          @click:append-inner="
            formData.notionKey.show = !formData.notionKey.show
          "
        />
      </div>

      <div class="mt-5 d-flex justify-end">
        <v-btn
          color="primary"
          elevation="0"
          :block="true"
          :loading="confirmLoading"
          :disabled="confirmLoading || !isUpdateFormData"
          @click="handleConfirm"
        >
          {{ $t('button.submit') }}
        </v-btn>
      </div>
    </form>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { PROFILE_API } from '@/apis'
import { useFetch, useWatchChange } from '@/hooks'
import { useProfileStore } from '@/store'

onMounted(async () => {
  await getKeys()
  isUpdateFormData.value = false
})

const { keys: formData } = useProfileStore()

console.log(formData)

const isUpdateFormData = useWatchChange(formData)

const handleConfirm = async () => {
  await setKeys()
  isUpdateFormData.value = false
}

const [_getKeys, fetchKeyLoading] = useFetch(PROFILE_API.getKeys)
const [_setKeys, confirmLoading] = useFetch(PROFILE_API.setKeys)

const getKeys = async () => {
  const res = await _getKeys()

  for (const key in res.data) {
    if (Object.prototype.hasOwnProperty.call(formData, key)) {
      formData[key].value = res.data[key]
    }
  }
}

const setKeys = async () => {
  const data: any = {}
  for (const key in formData) {
    data[key] = formData[key]
  }

  await _setKeys(data)
}
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
