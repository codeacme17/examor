<template>
  <v-container class="main_width">
    <h2>{{ $t('title.addNote') }}</h2>
    <h5 class="text-medium-emphasis">{{ $t('subTitle.addNote') }}</h5>

    <v-divider class="my-8"></v-divider>

    <!-- Note's name input field -->
    <v-text-field
      v-model="noteName"
      class="mt-6"
      variant="outlined"
      density="compact"
      :label="$t('label.noteName')"
    />

    <upload-form
      :APIFun="NOTE_API.addNote"
      :noteName="noteName"
      @success="noteName = ''"
    />
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'AddNote',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { NOTE_API } from '@/apis'

const noteName = ref('')
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
