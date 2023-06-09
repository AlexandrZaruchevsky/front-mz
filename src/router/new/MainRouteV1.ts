import AppBarV1 from '@/components/appbar/AppBarV1.vue'
import SidebarMain from '@/components/sidebar-main/SidebarMain.vue'
import UserListV1 from '@/components/users/UserListV1.vue'
import RoleListV1 from '@/components/roles/RoleListV1.vue'
import PhoneListV1 from '@/components/employees/PhoneListV1.vue'
import EquipListV1 from '@/components/equips/EquipListV1.vue'
import ArmListV1 from '@/components/arms/ArmListV1.vue'


export default [
  {
    path: "/v1/dashboard",
    name: "DashboardV1",
    components: {
      header: AppBarV1,
      default: PhoneListV1,
      sidebar: SidebarMain
    },
    meta: {
      authRequired: false,
      layout: "main-layout"
    },
  },
  {
    path: '/v1/security/users',
    name: 'UserList',
    components: {
      header: AppBarV1,
      sidebar: SidebarMain,
      default: UserListV1
    },
    meta: {
      authRequired: true,
      layout: "main-layout"
    },
    children: [
      {
        path: ':id',
        component: () => import('@/components/users/UserEdit.vue')
      }
    ]
  },
  {
    path: '/v1/equips',
    name: 'EquipList',
    components: {
      header: AppBarV1,
      sidebar: SidebarMain,
      default: EquipListV1
    },
    meta: {
      authRequired: true,
      layout: "main-layout"
    },
    children: [
      {
        path: ':id',
        component: () => import('@/components/equips/EquipEditV1.vue'),
        children: [
          {
            path: 'children/:childId',
            component: () => import('@/components/equips/EquipChildV1.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/v1/arms',
    name: 'ArmList',
    components: {
      header: AppBarV1,
      sidebar: SidebarMain,
      default: ArmListV1
    },
    meta: {
      authRequired: true,
      layout: 'main-layout'
    },
    children: [
      {
        path: ':id',
        component: () => import('@/components/arms/ArmEditV1.vue'),
        children: [
          {
            path: 'details/:idArmDetail',
            component: () => import('@/components/arms/ArmDetailEditV1.vue'),
            
          }
        ]
            
      }
    ]
  },
  {
    path: '/v1/security/roles',
    name: 'RoleList',
    components: {
      header: AppBarV1,
      sidebar: SidebarMain,
      default: RoleListV1
    },
    meta: {
      authRequired: true,
      layout: "main-layout"
    },
    children: [
      {
        path: ':id',
        component: () => import('@/components/roles/RoleEditV1.vue')
      }
    ]
  },
]