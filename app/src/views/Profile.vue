<template>
  <v-responsive style="max-width: 800px; margin: 0 auto">
    <h2>Profile</h2>
    <h5>Configuration items can be configured here what you need</h5>

    <form class="py-6">
      <v-text-field
        class="mt-3"
        label="OPENAI_KEY"
        variant="outlined"
        density="compact"
        v-model="state.openaiKey.value"
        :append-inner-icon="state.openaiKey.show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="state.openaiKey.show ? 'text' : 'password'"
        @input="v$.name.$touch"
        @blur="v$.name.$touch"
        @click:append-inner="state.openaiKey.show = !state.openaiKey.show"
      />

      <v-tooltip
        text="openai billing"
        location="start"
        :open-delay="3"
        :open-on-hover="true"
      >
        <template v-slot:activator="{ props }">
          <v-progress-linear
            :height="9"
            v-bind="props"
            color="primary"
            model-value="20"
            class="mb-8"
          />
        </template>
      </v-tooltip>

      <v-text-field
        class="mt-3"
        label="PINECONE_KEY"
        variant="outlined"
        density="compact"
        v-model="state.pineconeKey.value"
        :append-inner-icon="state.pineconeKey.show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="state.pineconeKey.show ? 'text' : 'password'"
        @input="v$.name.$touch"
        @blur="v$.name.$touch"
        @click:append-inner="state.pineconeKey.show = !state.pineconeKey.show"
      />

      <div class="mt-5">
        <v-btn
          class="me-4"
          @click="v$.$validate"
          color="primary"
          width="120"
          elevation="0"
        >
          submit
        </v-btn>
        <v-btn @click="clear" border="" elevation="0"> clear </v-btn>
      </div>
    </form>
  </v-responsive>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

const initialState = {
  openaiKey: {
    value: '',
    show: false,
  },
  pineconeKey: {
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

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
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
