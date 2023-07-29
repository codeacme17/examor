<template>
  <section class="mt-8">
    <v-tabs v-model="currentTab" density="compact">
      <v-tab value="answer"> {{ $t('label.answer') }}</v-tab>

      <v-tab value="lastAnswer" :disabled="!isFinishExamining">
        <v-icon icon="mdi-clipboard-text-clock" class="mr-2" />
        {{ $t('label.lastAnswer') }}
      </v-tab>

      <v-tab value="document" :disabled="!isFinishExamining">
        <v-icon icon="mdi-notebook-heart" class="mr-2" />
        {{ $t('label.document') }}
      </v-tab>
    </v-tabs>

    <section v-show="currentTab === 'answer'">
      <!-- answer block -->
      <v-textarea
        v-model="answerValue"
        variant="solo"
        auto-grow
        :bg-color="defaultBgColor"
        :flat="true"
        :rows="7"
        :disabled="isShowExamine"
        :placeholder="$t('placeholder.answer')"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
      />

      <!-- examine block -->
      <Transition name="scroll-x-reverse-transition">
        <v-card
          v-if="isShowExamine"
          variant="tonal"
          class="mb-3"
          :border="true"
          :elevation="0"
          :color="'primary'"
          :loading="isThinking"
        >
          <h3 class="mx-6 my-3" :style="fontColor">
            {{ $t('label.examine') }}
          </h3>
          <v-divider></v-divider>

          <div
            v-html="toMarkdown(examineContent)"
            class="show-markdown-box"
            :style="fontColor"
          />
        </v-card>
      </Transition>

      <v-btn
        v-if="!isShowExamine"
        :elevation="0"
        :block="true"
        :border="true"
        @click="handleSubmit"
      >
        {{ $t('button.submit') }}
      </v-btn>
    </section>

    <section v-show="currentTab === 'lastAnswer'">
      <v-card :elevation="0" :color="defaultBgColor">
        <div v-html="toMarkdown(answer)" class="show-markdown-box" />
      </v-card>
    </section>

    <section v-show="currentTab === 'document'">
      <v-card :elevation="0" :color="defaultBgColor">
        <div v-html="toMarkdown(temp)" class="show-markdown-box" />
      </v-card>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick, onUnmounted } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { defaultBgColor, fontColor } from '@/utils'
import MarkdownIt from 'markdown-it'

const { locale } = useI18n()
const currentTab = ref<'answer' | 'lastAnswer' | 'document'>('answer')

const props = defineProps(['id', 'note_name', 'document_id', 'content'])

const answerValue = useLocalStorage(`pending-answer-value-${props.id}`, '')
const toMarkdown = (text: string) => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
  })
  const res = md.render(text)
  return res
}

const ctrlTrigger = ref(false)
const handleKeydown = (e: KeyboardEvent) => {
  if (e.code === 'ControlLeft') ctrlTrigger.value = true
  if (ctrlTrigger.value && e.code === 'Enter') handleSubmit()
}
const handleKeyup = () => {
  if (ctrlTrigger.value) ctrlTrigger.value = false
}

const isShowExamine = ref(false)
const examineContent = ref('')
const isFinishExamining = ref(false)
const isThinking = ref(false)
const handleSubmit = async () => {
  const temp = answerValue.value
  localStorage.removeItem(`pending-answer-value-${props.id}`)
  answerValue.value = temp
  isShowExamine.value = !isShowExamine.value
  await submitAnswer()
}
const submitAnswer = async () => {
  isThinking.value = true
  const response = await fetch('/api/question/answer', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: props.id,
      note_name: props.note_name,
      document_id: props.document_id,
      question_content: props.content,
      answer: answerValue.value,
      language: locale.value,
    }),
  })
  isThinking.value = false

  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { value, done } = await reader.read()
    if (done) {
      isFinishExamining.value = true
      break
    }
    examineContent.value += decoder.decode(value)
  }
}

const scrollToBottom = () => {
  const el = document.getElementById('#app')
  const currentHeight = el!.scrollHeight

  nextTick(() => {
    el!.scrollTo({
      top: currentHeight,
      left: 0,
      behavior: 'smooth',
    })
  })
}

onUnmounted(() => {
  const id = `pending-answer-value-${props.id}`
  if (localStorage.getItem(id) === '') localStorage.removeItem(id)
})

const answer =
  'Vue3 相对于 Vue2 进行了以下方面的优化：\n 1. 更小的体积：Vue3 移除了一些过时或不常用的特性，并对代码进行了优化，使得 Vue3 的体积比 Vue2 更小。此外，Vue3 还将编译器和运行时进行了拆分，使得在运行时只需加载运行时的代码，而编译器的代码只在开发阶段使用。\n 2. 更快的渲染速度：Vue3 的渲染引擎采用了编译时优化技术，通过静态分析模板代码生成优化后的渲染函数，从而提升了渲染速度。此外，Vue3 的编译器在编译模板时会将模板编译成渲染函数并进行缓存，避免了每次渲染时都需要重新编译模板的开销。 \n 3. 更好的 TypeScript 支持：Vue3 提供了更好的 TypeScript 支持，包括更完善的类型定义和类型判断等，使得开发者能够更好地组织代码，提供可读性和可维护性。 \n 4. 虚拟 DOM 优化：Vue3 中引入了静态提升、懒执行和缓存等优化技术。静态提升可以将被标记为静态的节点优化为常量，避免在 diff 算法中进行不必要的比较。懒执行可以使用 `suspense` 和 `lazy` 指令实现组件的懒加载。缓存可以避免不必要的重新渲染，通过 `cacheHandlers` 编译选项来开启缓存。 \n 5. 响应式系统优化：Vue3 使用了 ES6 的 `Proxy` 类来监听对象的变化，相较于 Vue2 中使用的 `Object.defineProperty`，`Proxy` 可以观察整个对象，包括 `Map` 和 `Set` 类型的属性。此外，Vue3 还引入了新的 `reactive` 和 `readonly` API，提供了更细粒度的响应式控制。\n 综上所述，Vue3 在体积、渲染速度、TypeScript 支持、虚拟 DOM 优化、响应式系统优化、Tree-Shaking、代码分割和懒加载、模板编译等方面进行了优化。'

const temp =
  '# Vue\n\n### **Vue3 相比于 Vue2 的优化**\n\n- 更小的体积\n    - Vue3 的体积比 Vue2 要小很多，这是因为 Vue3 移除了一些过时或者不常用的特性，并对代码进行了优化。\n    - Vue3 中将编译器和运行时进行了拆分，这使得在运行时只需要加载运行时的代码，而编译器的代码只在开发阶段使用\n- 更快的渲染速度\n    - Vue3 的渲染引擎使用了 **编译时优化**（Compile-time Optimizations）技术，通过静态分析模版代码，生成优化后的渲染函数，提升了渲染速度\n    - Vue3 的编译器会在编译模版时，将模版编译成渲染函数并缓存，避免每次渲染时都需要重新编译模版的开销\n- 更好的 Typescript 支持\n    \n    Vue3 提供了更好的 Typescript 支持，包括更完善的类型定义、更好的类型判断等，能够更好的组织代码，提供可读性和可维护性\n    \n- 虚拟 DOM 优化\n    - 静态提升：在 Vue 3 中，标记为静态的节点可以被优化为一个常量，避免在 diff 算法中对其进行不必要的比较。静态节点是指在渲染过程中不会变化的节点，可以通过 `hoistStatic` 编译选项开启静态提升\n    - 懒执行：在 Vue 3 中，可以使用 `suspense` 和 `lazy` 指令来实现懒执行\n        - `suspense` 是一种占位符组件，他可以在异步组件加载完成之前显示占位符\n        - `lazy` 指令可以在组件首次渲染时不立即渲染，而是等到组件进入视口时才渲染\n    - 缓存：Vue 可以缓存已经渲染的组件，以避免不必要的重新渲染，可以通过 `cacheHandlers` 编译选项来开启缓存\n- 响应式系统优化\n    - Vue 3 使用了 ES6 的 `Proxy` 类来监听对象的变化，原因是 `Proxy` 可以观察整个对象，而 `Object.definProperty` 只能监听对象中的某个属性，如果要监听整个对象需要递归遍历，另外 `Map` / `Set` 类型的属性也可以进行监听\n    - Vue 3 还引入了新的 `reactive` 和 `readonly` 来提供更细粒度的控制，可以用 `reactive` 创建可响应的对象，使用 `readonly` 来创建只读对象\n- 更好的 Tree-Shaking\n    \n    Vue3 改进了对 Tree-shaking 的支持，可以更好的从代码中剔除没用到的模块，减少打包后的文件大小\n    \n- 更好的代码分割和懒加载\n    \n    Vue3 使用了 **动态 import** 技术，能够将组件按需进行代码分割和懒加载，减小初始加载文件的大小\n    \n- 更好的模版编译\n    \n '
</script>
