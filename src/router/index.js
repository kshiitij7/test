import { createRouter, createWebHistory } from 'vue-router'
import HomeTest from '@/components/HomeTest.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import CarouselCard from '@/components/CarouselCard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeTest
  },
  {
    path: '/basin',
    name: 'Ganga Basin',
    component: HelloWorld
  },
  {
    path: '/about',
    name: 'About',
    component: CarouselCard
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
