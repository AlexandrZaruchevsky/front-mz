export default [
  {
    path: '/admin/users',
    name: 'Users',
    component: () => import("@/pages/UsersPage.vue"),
    meta: {
      layout: "admin-layout",
      authRequired: true
    },
    children: [
      {
        path: ':id',
        component: ()=> import("@/pages/UserPage.vue"),
        meta:{
          authRequired: true
        }
      }
    ]
  },
]