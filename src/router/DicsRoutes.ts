export default [
  {
    path: "/dictionaries",
    name: "Dictionaries",
    redirect: () => {
      return {name:"EquipTypes"}
    }
  },
  {
    path: "/dictionaries/equip-models",
    name: "EquipModels",
    components: {
      Sidebar:()=> import("@/pages/dictionaries/DicsSidebar.vue"),
      Content:() => import("@/pages/dictionaries/EquipModelsPage.vue")
    },
    meta: {
      layout: "layout-z",
      authRequired: true
    },
    children: [
      {
        path: ':id',
        component: ()=> import("@/pages/dictionaries/EquipModelPage.vue"),
        meta:{
          authRequired: true
        }
      }
    ]
  },{
    path: "/dictionaries/equip-types",
    name: "EquipTypes",
    components: {
      Sidebar:()=> import("@/pages/dictionaries/DicsSidebar.vue"),
      Content:() => import("@/pages/dictionaries/EquipTypesPage.vue")
    },
    meta: {
      layout: "layout-z",
      authRequired: true
    },
    children: [
      {
        path: ':id',
        component: ()=> import("@/pages/dictionaries/EquipTypePage.vue"),
        meta:{
          authRequired: true
        }
      }
    ]
  },
]