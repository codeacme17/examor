<template>
  <v-main>
    <TopBar />

    <v-container class="mt-3">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition name="fade-transition" mode="out-in">
            <Suspense>
              <component :is="Component" :key="$route.fullPath"></component>
            </Suspense>
          </Transition>
        </template>
      </RouterView>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import TopBar from './TopBar.vue'
</script>
