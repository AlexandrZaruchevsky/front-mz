import DashboardMain from '@/pages/dashboard/DashboardMain.vue'
import AppBar from '@/components/AppBar.vue'
import AppBarV1 from '@/components/appbar/AppBarV1.vue'
import DashboardSidebar from '@/pages/dashboard/DashboardSidebar.vue'
import SidebarMain from '@/components/sidebar-main/SidebarMain.vue'
import UserListV1 from '@/components/users/UserListV1.vue'
import RoleListV1 from '@/components/roles/RoleListV1.vue'
import PhoneListV1 from '@/components/employees/PhoneListV1.vue'

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