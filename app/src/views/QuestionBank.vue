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

    <v-row align="center" class="mt-2">
      <v-col v-for="item in bankList" :key="item.name" sm="6" md="4">
        <question-bank-card
          v-bind="item"
          @clickImportButton="isShowDialog = true"
        />
      </v-col>
    </v-row>

    <import-question-bank-dialog v-model:isShowDialog="isShowDialog" />
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'QuesitonBank',
}
</script>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { QuesitonBankType } from '@/components/card/QuestionBankCard.vue'

const selectedCategory = ref('All')
const bankCategories = reactive([
  {
    label: 'All',
  },
  {
    label: 'Programming',
  },
])
const bankList = reactive<QuesitonBankType[]>([
  {
    icon: 'mdi-vuejs',
    name: 'Vue.js',
    category: 'Programming',
    link: 'https://vuejs.org/',
  },
  {
    icon: 'mdi-react',
    name: 'React',
    category: 'Programming',
    link: 'https://reactjs.org/',
  },
  {
    icon: '',
    name: 'Angular',
    category: 'Programming',
    link: 'https://angular.io/',
  },
])

const isShowDialog = ref(false)
</script>
