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
        :variant="selectedCategory === item ? 'flat' : 'tonal'"
        :color="selectedCategory === item ? 'primary' : ''"
        :key="item"
        :elevation="0"
        @click="handleChangeCategory(item)"
      >
        {{ item }}
      </v-btn>
    </section>

    <v-row align="start" class="mt-2">
      <v-col
        v-for="item in bankList"
        :key="item.name"
        sm="6"
        md="4"
        align-self="stretch"
      >
        <question-bank-card
          v-bind="item"
          @clickImportButton="handleClickImportButton"
        />
      </v-col>
    </v-row>

    <import-question-bank-dialog
      v-model:isShowDialog="isShowDialog"
      :currentBank="currentBank"
    />
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'QuesitonBank',
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFetch } from '@/hooks'
import { BANK_API } from '@/apis'
import { QuesitonBankType } from '@/components/card/QuestionBankCard.vue'

const { locale } = useI18n()

// Hanlde question bank categories
const bankCategories = ref(['all'])
const selectedCategory = ref('all')
const [getCategories] = useFetch(BANK_API.getCategories)
const handleGetCategories = async () => {
  const res = await getCategories(locale.value === 'zh-CN' ? 'zh' : 'en')
  bankCategories.value.splice(1)
  bankCategories.value = bankCategories.value.concat(res.data)
}

// Handle question bank list
const bankList = ref<QuesitonBankType[]>([])
const [getBanks] = useFetch(BANK_API.getBanks)
const handleGetBanks = async () => {
  const res = await getBanks({
    language: locale.value === 'zh-CN' ? 'zh' : 'en',
    category: selectedCategory.value.toLowerCase(),
  })
  bankList.value = res.data
}
const handleChangeCategory = async (category: string) => {
  selectedCategory.value = category
  await handleGetBanks()
}

const isShowDialog = ref(false)
const currentBank = ref({})
const handleClickImportButton = (item: QuesitonBankType) => {
  currentBank.value = item
  isShowDialog.value = true
}

watch(
  locale,
  async () => {
    selectedCategory.value = 'all'
    await handleGetCategories()
    await handleGetBanks()
  },
  { immediate: true }
)
</script>
