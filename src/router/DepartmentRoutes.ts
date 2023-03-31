export default [
    {
      path: '/admin/departments',
      name: 'Departments',
      component: () => import("@/pages/admin-page/DepsPage.vue"),
      meta: {
        layout: "admin-layout",
        authRequired: true
      },
      children: [
        {
          path: ':id',
          component: ()=> import("@/pages/admin-page/DepPage.vue"),
          meta:{
            authRequired: true
          }
        }
      ]
    },
  ]