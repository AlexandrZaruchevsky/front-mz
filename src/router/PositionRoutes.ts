export default [
  {
    path: '/admin/positions',
    name: 'Positions',
    component: () => import("@/pages/PositionsPage.vue"),
    meta: {
      layout: "admin-layout",
      authRequired: true
    },
    // children: [
    //   {
    //     path: ':id',
    //     component: () => import("@/pages/POFPage.vue"),
    //     meta: {
    //       authRequired: true
    //     }
    //   }
    // ]
  },
]