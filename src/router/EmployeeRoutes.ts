export default [
  {
    path: '/admin/employees',
    name: 'Employees',
    component: () => import("@/pages/EmplsPage.vue"),
    meta: {
      layout: "admin-layout",
      authRequired: true
    },
    children: [
      {
        path: ':id',
        component: () => import("@/pages/EmplPage.vue"),
        meta: {
          authRequired: true
        }
      }
    ]
  },
]