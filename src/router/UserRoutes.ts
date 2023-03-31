export default [
  {
    path: '/admin/users',
    name: 'Users',
    component: () => import("@/pages/admin-page/UsersPage.vue"),
    meta: {
      layout: "admin-layout",
      authRequired: true
    },
    children: [
      {
        path: ':id',
        component: ()=> import("@/pages/admin-page/UserPage.vue"),
        meta:{
          authRequired: true
        }
      }
    ]
  },
]