import Main from '../pages/Main.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PostPage from '../pages/PostPage.vue'
import About from '../pages/About.vue'
import PostIdPage from '../pages/PostIdPage.vue'
import PostPageWithStore from '../pages/PostPageWithStore.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/posts',
    component: PostPage,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/posts/:id',
    component: PostIdPage,
  },
  {
    path: '/store',
    component: PostPageWithStore,
  },
]

const router = createRouter({
  history: createWebHistory('http://127.0.0.1:5173/'),
  routes,
})

export default router
