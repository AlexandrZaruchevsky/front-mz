export default [
    {
      path: '/admin/departments',
      name: 'Departments',
      component: () => import("@/pages/DepsPage.vue"),
      meta: {
        layout: "admin-layout",
        authRequired: true
      },
      children: [
        {
          path: ':id',
          component: ()=> import("@/pages/DepPage.vue"),
          meta:{
            authRequired: true
          }
        }
      ]
    },
  ]