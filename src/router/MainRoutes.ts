export default [
  {
    path: '/phone',
    name: 'Phone',
    component: () => import("@/pages/user-page/PhonePage.vue"),
    meta: {
      layout: "default-layout",
      authRequired: true
    },
    children: [
      {
        path: ':id',
        component: () => import("@/pages/user-page/PhoneDetailPage.vue"),
        meta: {
          authRequired: true
        }
      }
    ]
  },
]