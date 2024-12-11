import { createRouter, createWebHistory } from 'vue-router'
import AddGoodsView from "@/views/AddGoodsView.vue";
import GoodsView from "@/views/GoodsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/add-good',
      name: 'addGood',
      component: AddGoodsView,
    },
    {
      path: '/good',
      name: 'home',
      alias: '/',
      component: GoodsView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
