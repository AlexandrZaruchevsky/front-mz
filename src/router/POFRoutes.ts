export default [
  {
    path: '/admin/point-of-presences',
    name: 'PointOfPresences',
    component: () => import("@/pages/admin-page/POPsPage.vue"),
    meta: {
      layout: "admin-layout",
      authRequired: true
    },
    children: [
      {
        path: ':id',
        component: () => import("@/pages/admin-page/POPPage.vue"),
        meta: {
          authRequired: true
        }
      }
    ]
  },
]