export default [
    {
      path: '/admin/departments',
      name: 'Departments',
      component: () => import("@/pages/DepartmentsPage.vue"),
      meta: {
        layout: "admin-layout",
        authRequired: true
      },
      children: [
        {
          path: ':id',
          component: ()=> import("@/pages/DepartmentPage.vue"),
          meta:{
            authRequired: true
          }
        }
      ]
    },
  ]