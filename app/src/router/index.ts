import { createRouter, createWebHistory } from 'vue-router'
import NProgress from '@/plugins/nprogress'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: '/notes',
        name: 'Notes',
        component: () => import('@/views/Notes.vue'),
      },
      {
        path: '/random',
        name: 'Random',
        component: () => import('@/views/Random.vue'),
      },
      {
        path: '/addNote',
        name: 'AddNote',
        component: () => import('@/views/AddNote.vue'),
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/Profile.vue'),
      },
      {
        path: '/note/:noteName',
        name: 'Note',
        component: () => import('@/views/Note.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((a, b, next) => {
  NProgress.start()
  console.log(2)
  next()
})

router.afterEach(() => {
  console.log(1)
  NProgress.done()
  NProgress.remove()
})

export default router
