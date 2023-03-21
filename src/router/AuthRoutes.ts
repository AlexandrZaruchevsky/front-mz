export default [
  {
    path: '/auth/login',
    name: 'LoginPage',
    component: () => import("@/pages/LoginPage.vue"),
    meta: {
      layout: "auth-layout",
      authRequired: false
    }
  },
]