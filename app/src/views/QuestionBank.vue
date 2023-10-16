<template>
  <v-container style="max-width: 1080px">
    <h2>
      {{ $t('menus.questionBank') }}
    </h2>
    <h5 class="text-medium-emphasis">{{ $t('subTitle.questionBank') }}</h5>

    <v-divider class="mt-8"></v-divider>

    <section class="mt-3 w-full">
      <v-btn
        v-for="item in bankCategories"
        size="small"
        class="mr-2 mt-2"
        :variant="selectedCategory === item.label ? 'flat' : 'tonal'"
        :color="selectedCategory === item.label ? 'primary' : ''"
        :key="item.label"
        :elevation="0"
        @click="selectedCategory = item.label"
      >
        {{ item.label }}
      </v-btn>
    </section>
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'QuesitonBank',
}
</script>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const selectedCategory = ref('All')
const bankCategories = reactive([
  {
    label: 'All',
  },
  {
    label: 'Java',
  },
  {
    label: 'Python',
  },
  {
    label: 'C++',
  },
  {
    label: 'C',
  },
  {
    label: 'JavaScript',
  },
  {
    label: 'HTML',
  },
  {
    label: 'CSS',
  },
  {
    label: 'SQL',
  },
  {
    label: 'Other',
  },
])
</script>
