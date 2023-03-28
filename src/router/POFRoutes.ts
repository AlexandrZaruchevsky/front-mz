export default [
  {
    path: '/admin/point-of-presences',
    name: 'PointOfPresences',
    component: () => import("@/pages/POPsPage.vue"),
    meta: {
      layout: "admin-layout",
      authRequired: true
    },
    children: [
      {
        path: ':id',
        component: () => import("@/pages/POPPage.vue"),
        meta: {
          authRequired: true
        }
      }
    ]
  },
]