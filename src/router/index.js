import { createRouter, createWebHistory } from 'vue-router'
import GoodsView from "@/views/goods/GoodsView.vue";
import Goods from "@/components/goods/Goods.vue";
import AddGoods from "@/components/goods/AddGoods.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/goods',
      name: 'goodsView',
      component: GoodsView,
      children: [
        {
          path: '',
          name: 'goods',
          component: Goods
        },
        {
          path: 'add-goods',
          name: 'addGoods',
          component: AddGoods
        }
      ]
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
