<template>
  <v-container class="main_width">
    <h2>Add Note</h2>
    <h5>Configuration items can be configured here what you need</h5>

    <section class="py-6">
      <v-select
        label="Select note type"
        :items="['Local Files', 'Notion']"
        variant="outlined"
        density="compact"
        class="mt-3"
      />

      <v-file-input
        v-model="files"
        counter
        label="Select your file"
        class="mt-3"
        multiple
        prepend-inner-icon="mdi-file-document-plus"
        variant="outlined"
        :show-size="1000"
      >
        <template v-slot:selection="{ fileNames }">
          <template v-for="(fileName, index) in fileNames" :key="fileName">
            <v-chip
              v-if="index < 2"
              color="primary"
              label
              size="small"
              class="me-2"
            >
              {{ fileName }}
            </v-chip>

            <span
              v-else-if="index === 2"
              class="text-overline text-grey-darken-3 mx-2"
            >
              +{{ files.length - 2 }} File(s)
            </span>
          </template>
        </template>
      </v-file-input>
    </section>
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'Add',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'

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
</style>
