import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoryView,
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetailView,
      props: true
    },
  ],
})

export default router
