export default [
    {
      path: '/admin/organizations',
      name: 'Organizations',
      component: () => import("@/pages/admin-page/OrgsPage.vue"),
      meta: {
        layout: "admin-layout",
        authRequired: true
      },
      children: [
        {
          path: ':id',
          component: ()=> import("@/pages/admin-page/OrgPage.vue"),
          meta:{
            authRequired: true
          }
        }
      ]
    },
  ]