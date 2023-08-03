<template>
  <Topbar />
  <Banner />

  <section class="-mt-20 min-w-[1080px]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      class="dark:stroke-light-second dark:fill-light-second"
    >
      <path
        fill-opacity="1"
        d="M0,32L60,64C120,96,240,160,360,160C480,160,600,96,720,80C840,64,960,96,1080,117.3C1200,139,1320,149,1380,154.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
      ></path>
    </svg>

    <div class="bg-black dark:bg-light-second z-10">
      <div
        class="main_size -mt-20 text-light-second dark:text-dark-second"
      >
        <div class="pb-32 flex">
          <div
            class="w-6/12 border-2 p-3 border-light-main dark:border-dark-main cursor-pointer rounded-xl"
          >
            <video
              src="https://img-1259503340.cos.ap-shanghai.myqcloud.com/img/videoPic/MT2_Twitter_30sec_1280x720.mp4"
              controls
              controlsList="nodownload nofullscreen noremoteplayback"
            ></video>
          </div>

          <div class="flex-1 pl-40">
            <div class="text-3xl font-bold mb-10 mt-12">
              如何运作 ？
            </div>
            <div class="text-xl">
              <p class="mb-1">
                Tracklib 是世界上唯一用于采样真实音乐的服务。
              </p>
              <p class="mb-1">观看视频以获取简短说明，</p>
              <p>
                并阅读以下内容或继续我们的支持部分以获取完整详细信息。
              </p>
            </div>
            <div>
              <button
                class="flex items-center py-3 px-7 mt-7 rounded-lg bg-light-main dark:bg-dark-main text-sm text-dark-main dark:text-light-main"
              >
                了解更多
                <ChevronRightIcon
                  class="w-4 pb-0.5"
                ></ChevronRightIcon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="main_size w-full flex relative">
    <div class="py-60 pl-10">
      <div class="text-3xl font-bold mb-10">学会合作</div>
      <div class="text-xl">
        <p class="mb-1">音乐是合作的产物</p>
        <p class="mb-1">做音乐不可以固步自封，离开舒适圈</p>
        <p class="mb-1">与那些成熟或充满创造性的制作人展开合作</p>
        <p>或使用他们优秀的产品为你的作品添加色彩</p>
      </div>
      <div>
        <button
          class="flex items-center py-3 px-7 mt-7 rounded-lg bg-dark-main dark:bg-light-main text-sm text-light-main dark:text-dark-main"
        >
          前往浏览
          <ChevronRightIcon class="w-4 pb-0.5" />
        </button>
      </div>
    </div>
    <div class="absolute h-[650px] w-[650px] right-10 top-10">
      <Read
        class="dark:fill-light-second stroke-dark-main dark:stroke-light-main"
      />
    </div>
  </section>

  <section class="py-32 bg-light-second dark:bg-dark-second">
    <div class="main_size">
      <div class="text-center text-3xl font-black mb-20">
        谈论我们
      </div>
      <div class="grid grid-cols-3">
        <div class="flex flex-col items-center" v-for="i in comments">
          <img
            :src="i.cover"
            class="border-2 border-color p-2 rounded-full aspect-[1/1] w-72"
          />
          <div class="w-60 mt-7 ml-3">
            <div class="text-lg">
              {{ i.content }}
            </div>
            <div class="text-sm mt-2">{{ i.roller }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-32">
    <div
      class="main_size text-dark-main dark:text-light-main flex flex-col items-center justify-center"
    >
      <div class="text-3xl mb-5">
        “ 建造你自己的金字塔，写下属于你的象形文字 ”
      </div>
      <div class="text-lg">
        "Build your own pyramids, write your own hieroglyphs."
      </div>
      <div class="w-[1px] h-32 bg-dark-gray-text my-10"></div>
      <div class="text-lg mb-2">Kendrick Lamar</div>
      <div class="text-sm italic">Hiii Power (Prod. by J Cole)</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import Banner from '@/components/Banner.vue'
import Topbar from '@/components/Topbar.vue'

const comments = [
  {
    cover:
      'https://splice-res.cloudinary.com/image/upload/f_auto,q_auto,w_360,dpr_1.0/v1533337259/marketing_site/sounds/2018-08/featuresSounds-quote_TRAKGIRL_2x.png',
    content:
      '音乐没有限制。Splice Sounds 有助于激发我的创造力和灵感。',
    roller: 'TRAKGIRL',
  },
  {
    cover:
      'https://splice-res.cloudinary.com/image/upload/f_auto,q_auto,w_360,dpr_1.0/v1532630471/marketing_site/sounds/2018-08/featuresSounds-quote_ChadHugo_2x.png',
    content:
      '释放我的声乐包让我能够帮助这么多制作人，同时以我无法想象的方式影响我的职业生涯。',
    roller: 'Leco',
  },
  {
    cover:
      'https://d2umolmz9zcmr8.cloudfront.net/unsafe/1024x0/filters:no_upscale():format(webp)/original_images/testimonials-scott-storch.png',
    content:
      '制作人应该用我的包中的声音来激发他们的灵感——分层、过滤、扭曲它们。创作自由。',
    roller: 'TRAKGIRL',
  },
]
</script>

<style scoped lang="scss">
.start_btn {
  transition: 0.1s ease-in;

  .right {
    opacity: 0;
    transition: 0.1s ease-in;
  }
}
.start_btn:hover {
  .right {
    opacity: 1;
  }
}
</style>
