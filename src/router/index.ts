import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
  if (to.meta.requiresAuth && !sessionStorage.getItem('user')) {
    // 자동 로그인 세션 확인
    const user = localStorage.getItem('user');
    if (user) {
      sessionStorage.setItem('user', user);
    }
    // 세션 없을 경우 로그인 페이지로 이동
    else {
      next({ name: 'signin' });
    }
  }
  next();
});

export default router
