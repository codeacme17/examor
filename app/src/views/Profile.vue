<template>
  <v-container class="main_width">
    <h2>{{ $t('title.profile') }}</h2>
    <h5>{{ $t('subTitle.profile') }}</h5>

    <v-divider class="mt-8"></v-divider>

    <form class="py-6">
      <!-- OpenAI  -->
      <div class="d-flex">
        <OpenaiIcon width="30" class="mb-12 mr-4" />

        <div style="flex: 1">
          <v-text-field
            class="mt-3"
            label="OPENAI_KEY"
            variant="outlined"
            density="compact"
            v-model="state.openaiKey.value"
            :append-inner-icon="
              state.openaiKey.show ? 'mdi-eye' : 'mdi-eye-off'
            "
            :type="state.openaiKey.show ? 'text' : 'password'"
            @click:append-inner="state.openaiKey.show = !state.openaiKey.show"
          />

          <v-tooltip
            :text="$t('hint.openAIBilling')"
            location="start"
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

      <!-- Pinecone -->
      <div class="d-flex">
        <PineconeIcon width="30" class="mb-3 mr-4" />

        <v-text-field
          class="mt-3"
          label="PINECONE_KEY"
          variant="outlined"
          density="compact"
          v-model="state.pineconeKey.value"
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
          label="NOTION_KEY"
          variant="outlined"
          density="compact"
          v-model="state.notionKey.value"
          :append-inner-icon="state.notionKey.show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="state.notionKey.show ? 'text' : 'password'"
          @click:append-inner="state.notionKey.show = !state.notionKey.show"
        />
      </div>

      <div class="mt-5 d-flex justify-end">
        <v-btn
          color="primary"
          elevation="0"
          :block="true"
          @click="v$.$validate"
        >
          {{ $t('button.submit') }}
        </v-btn>
      </div>
    </form>
  </v-container>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

import OpenaiIcon from '@/components/icons/Openai.vue'
import PineconeIcon from '@/components/icons/Pinecone.vue'
import NotionIcon from '@/components/icons/Notion.vue'

const initialState = {
  openaiKey: {
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

const rules = {
  name: { required },
  email: { required, email },
  select: { required },
  items: { required },
  checkbox: { required },
}

const v$ = useVuelidate(rules, state)
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
