<template>
  <v-main>
    <TopBar />

    <section class="mt-3">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition name="fade-transition" mode="out-in">
            <Suspense>
              <component :is="Component" :key="$route.fullPath"></component>

              <template #fallback> Loading... </template>
            </Suspense>
          </Transition>
        </template>
      </RouterView>
    </section>
  </v-main>
</template>

<script lang="ts" setup>
import TopBar from './TopBar.vue'
</script>
