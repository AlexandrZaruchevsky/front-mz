export default [
  {
    path: '/admin/employees',
    name: 'Employees',
    component: () => import("@/pages/admin-page/EmplsPage.vue"),
    meta: {
      layout: "admin-layout",
      authRequired: true
    },
    children: [
      {
        path: ':id',
        component: () => import("@/pages/admin-page/EmplPage.vue"),
        meta: {
          authRequired: true
        }
      }
    ]
  },
]