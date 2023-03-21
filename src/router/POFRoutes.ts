export default [
  {
    path: '/admin/point-of-presences',
    name: 'PointOfPresences',
    component: () => import("@/pages/POFsPage.vue"),
    meta: {
      layout: "admin-layout",
      authRequired: true
    },
    children: [
      {
        path: ':id',
        component: () => import("@/pages/POFPage.vue"),
        meta: {
          authRequired: true
        }
      }
    ]
  },
]