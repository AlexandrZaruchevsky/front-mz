export default [
    {
      path: '/admin/roles',
      name: 'Roles',
      component: () => import("@/pages/admin-page/RolesPage.vue"),
      meta: {
        layout: "admin-layout",
        authRequired: true
      },
    //   children: [
    //     {
    //       path: ':id',
    //       component: ()=> import("@/pages/UserPage.vue"),
    //       meta:{
    //         authRequired: true
    //       }
    //     }
    //   ]
    },
  ]