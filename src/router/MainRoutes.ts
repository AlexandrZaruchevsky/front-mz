export default [
  {
    path: '/phone',
    name: 'Phone',
    component: () => import("@/pages/PhonePage.vue"),
    meta: {
      layout: "default-layout",
      authRequired: true
    },
    children: [
      {
        path: ':id',
        component: () => import("@/pages/PhoneDetailPage.vue"),
        meta: {
          authRequired: true
        }
      }
    ]
  },
]