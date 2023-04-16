export default [
  {
    path: '/auth/login',
    name: 'LoginPage',
    component: () => import("@/pages/LoginPage.vue"),
    meta: {
      layout: "main-layout",
      authRequired: false
    }
  },
]