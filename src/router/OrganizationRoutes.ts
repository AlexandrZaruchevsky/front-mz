export default [
    {
      path: '/admin/organizations',
      name: 'Organizations',
      component: () => import("@/pages/OrganizationsPage.vue"),
      meta: {
        layout: "admin-layout",
        authRequired: true
      },
      children: [
        {
          path: ':id',
          component: ()=> import("@/pages/OrganizationPage.vue"),
          meta:{
            authRequired: true
          }
        }
      ]
    },
  ]