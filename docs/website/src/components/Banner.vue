<template>
  <section class="main_size w-full flex relative">
    <div class="py-40 pl-20">
      <div class="text-[60px] font-black">
        <div>你能做的</div>
        <div>不仅仅只有BEAT</div>
      </div>
      <div class="text-xl mt-3">用更多的方式展现你的才华</div>
      <div class="text-xl mt-3">或者，</div>
      <div class="text-xl mt-3">借助他人的智慧给你带来灵感</div>
      <div class="mt-8">
        <button
          class="start_btn px-16 py-4 relative flex rounded-xl border-2 border-black dark:border-light-main bg-black dark:bg-light-main text-light-main dark:text-dark-main hover:pr-20"
        >
          Let's Go !
          <ChevronRightIcon class="right absolute right-2" />
        </button>
        <p class="mt-3 text-sm">
          想入驻成为 Roller ？欢迎进入
          <a href="" class="decoration-dashed underline">
            Roller Studio
          </a>
        </p>
      </div>
    </div>
    <div class="absolute h-[730px] w-[730px] right-0 top-0">
      <Hello
        class="dark:fill-light-second stroke-dark-main dark:stroke-light-main"
      />
    </div>
  </section>
</template>
