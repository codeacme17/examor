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
            v-model="state.openaiKey.value"
            class="mt-3"
            label="OPENAI_KEY"
            variant="outlined"
            density="compact"
            :append-inner-icon="
              state.openaiKey.show ? 'mdi-eye' : 'mdi-eye-off'
            "
            :type="state.openaiKey.show ? 'text' : 'password'"
            @click:append-inner="state.openaiKey.show = !state.openaiKey.show"
          />

          <v-tooltip
            location="start"
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
            v-model="state.azureKey.value"
            class="mt-3"
            label="AZURE_KEY"
            variant="outlined"
            density="compact"
            :append-inner-icon="state.azureKey.show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="state.azureKey.show ? 'text' : 'password'"
            @click:append-inner="state.azureKey.show = !state.azureKey.show"
          />
          <v-text-field
            v-model="state.azureVersion.value"
            class="mt-3"
            label="AZURE_VERSION"
            variant="outlined"
            density="compact"
            :append-inner-icon="
              state.azureVersion.show ? 'mdi-eye' : 'mdi-eye-off'
            "
            :type="state.azureVersion.show ? 'text' : 'password'"
            @click:append-inner="
              state.azureVersion.show = !state.azureVersion.show
            "
          />
          <v-text-field
            v-model="state.azureEndPoint.value"
            class="mt-3"
            label="AZURE_END_PONIT"
            variant="outlined"
            density="compact"
            :append-inner-icon="
              state.azureEndPoint.show ? 'mdi-eye' : 'mdi-eye-off'
            "
            :type="state.azureEndPoint.show ? 'text' : 'password'"
            @click:append-inner="
              state.azureEndPoint.show = !state.azureEndPoint.show
            "
          />
        </div>
      </div>

      <!-- Pinecone -->
      <div class="d-flex">
        <PineconeIcon width="30" class="mb-3 mr-4" />

        <v-text-field
          v-model="state.pineconeKey.value"
          class="mt-3"
          label="PINECONE_KEY"
          variant="outlined"
          density="compact"
          :append-inner-icon="
            state.pineconeKey.show ? 'mdi-eye' : 'mdi-eye-off'
          "
          :type="state.pineconeKey.show ? 'text' : 'password'"
          @click:append-inner="state.pineconeKey.show = !state.pineconeKey.show"
        />
      </div>

      <!-- Notion -->
      <div class="d-flex mt-3">
        <NotionIcon width="30" class="mb-5 mr-4" />

        <v-text-field
          v-model="state.notionKey.value"
          label="NOTION_KEY"
          variant="outlined"
          density="compact"
          :append-inner-icon="state.notionKey.show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="state.notionKey.show ? 'text' : 'password'"
          @click:append-inner="state.notionKey.show = !state.notionKey.show"
        />
      </div>

      <div class="mt-5 d-flex justify-end">
        <v-btn color="primary" elevation="0" :block="true">
          {{ $t('button.submit') }}
        </v-btn>
      </div>
    </form>
  </v-container>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import OpenaiIcon from '@/components/icons/Openai.vue'
import AzureIcon from '@/components/icons/Azure.vue'
import PineconeIcon from '@/components/icons/Pinecone.vue'
import NotionIcon from '@/components/icons/Notion.vue'

const initialState = {
  openaiKey: {
    value: '',
    show: false,
  },
  azureKey: {
    value: '',
    show: false,
  },
  azureVersion: {
    value: '',
    show: false,
  },
  azureEndPoint: {
    value: '',
    show: false,
  },
  pineconeKey: {
    value: '',
    show: false,
  },
  notionKey: {
    value: '',
    show: false,
  },
}

const state = reactive<any>({
  ...initialState,
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
