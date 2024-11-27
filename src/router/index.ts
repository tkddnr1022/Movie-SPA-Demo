import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getSession } from '@/scripts/utils/storage';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignInView.vue'),
      meta: { hideNavbar: true },
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 세션 유무 확인
  if (to.meta.requiresAuth && !getSession()) {
      next({ name: 'signin' });
  }
  next();
});

export default router
