<template>
  <v-responsive style="max-width: 800px; margin: 0 auto">
    <h2>Profile</h2>
    <h5>Configuration items can be configured here what you need</h5>

    <form class="py-6">
      <v-text-field
        class="mt-2"
        label="OPENAI_KEY"
        variant="outlined"
        density="compact"
        v-model="state.openaiKey.value"
        :counter="10"
        :append-icon="state.openaiKey.show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="state.openaiKey.show ? 'text' : 'password'"
        @input="v$.name.$touch"
        @blur="v$.name.$touch"
        @click:append="state.openaiKey.show = !state.openaiKey.show"
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
}
</style>
