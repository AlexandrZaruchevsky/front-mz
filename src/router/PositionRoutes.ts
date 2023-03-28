export default [
  {
    path: '/admin/positions',
    name: 'Positions',
    component: () => import("@/pages/PossPage.vue"),
    meta: {
      layout: "admin-layout",
      authRequired: true
    },
    children: [
      {
        path: ':id',
        component: () => import("@/pages/PosPage.vue"),
        meta: {
          authRequired: true
        }
      }
    ]
  },
]