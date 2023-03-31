export default [
  {
    path: '/admin/positions',
    name: 'Positions',
    component: () => import("@/pages/admin-page/PossPage.vue"),
    meta: {
      layout: "admin-layout",
      authRequired: true
    },
    children: [
      {
        path: ':id',
        component: () => import("@/pages/admin-page/PosPage.vue"),
        meta: {
          authRequired: true
        }
      }
    ]
  },
]