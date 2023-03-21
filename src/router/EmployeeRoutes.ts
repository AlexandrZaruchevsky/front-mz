export default [
  {
    path: '/admin/employees',
    name: 'Employees',
    component: () => import("@/pages/EmployeesPage.vue"),
    meta: {
      layout: "admin-layout",
      authRequired: true
    },
    children: [
      {
        path: ':id',
        component: () => import("@/pages/EmployeePage.vue"),
        meta: {
          authRequired: true
        }
      }
    ]
  },
]