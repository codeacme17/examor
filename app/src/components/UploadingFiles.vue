<template>
  <section class="container" v-if="!!FILE_STORE.uploadingFiles.length">
    <Transition name="scale-transition" mode="out-in">
      <v-btn
        icon="mdi-folder-upload"
        v-if="isExpend"
        @click="isExpend = !isExpend"
      >
      </v-btn>

      <v-card :loading="true" v-else width="330px" elevation="6">
        <v-list lines="one" :bg-color="'transparent'" density="compact">
          <v-list-subheader>
            <div class="d-flex justify-space-between align-center">
              正在上传
              <v-btn
                icon="mdi-close"
                class="ml-auto"
                variant="plain"
                size="s-small"
                style="font-size: 12px"
                @click="isExpend = !isExpend"
              />
            </div>
          </v-list-subheader>

          <v-divider class="my-1"></v-divider>

          <v-list-item
            v-for="item in FILE_STORE.uploadingFiles"
            :key="item.id"
            :title="item.file_name"
          >
            <template #append> <v-icon icon="mdi-file-upload" /> </template>
          </v-list-item>
        </v-list>
      </v-card>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFileStore } from '@/store'

const FILE_STORE = useFileStore()

const isExpend = ref(false)
</script>

<style scoped lang="scss">
.container {
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 9999;
}

:deep(.v-list-subheader__text) {
  width: 100% !important;
}

:deep(.v-list-item) {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}

:deep(.v-list-item-title) {
  font-size: 14px !important;
}
</style>
