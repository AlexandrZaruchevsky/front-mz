export default [
  {
    path: '/employees',
    name: 'Phone',
    component: () => import("@/pages/user-page/PhonePage.vue"),
    meta: {
      layout: "default-layout",
      authRequired: true
    },
    children: [
      {
        path: ':id',
        component: () => import("@/pages/user-page/PhoneDetailPage.vue"),
        meta: {
          authRequired: true
        }
      }
    ]
  },
  {
    path: '/equips',
    name: 'Equips',
    component: () => import("@/pages/user-page/equips/EquipsPage.vue"),
    meta: {
      layout: "default-layout",
      authRequired: true
    },
    children: [
      {
        path: ':id',
        component: () => import("@/pages/user-page/equips/EquipPage.vue"),
        meta: {
          authRequired: true
        }
      },
      {
        path: ':id/details',
        component: () => import("@/pages/user-page/equips/EquipDetailsPage.vue"),
        meta: {
          authRequired: true
        },
        children: [
          {
            path: ':idChild',
            component: () => import("@/pages/user-page/equips/EquipDetailPage.vue"),
            meta: {
              authRequired: true
            },
          }
        ]
      }
    ]
  }
]