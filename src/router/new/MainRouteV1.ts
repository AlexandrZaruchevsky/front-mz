import DashboardMain from '@/pages/dashboard/DashboardMain.vue'
import AppBar from '@/components/AppBar.vue'
import AppBarV1 from '@/components/appbar/AppBarV1.vue'
import DashboardSidebar from '@/pages/dashboard/DashboardSidebar.vue'

export default [
  {
    path: "/v1/dashboard",
    name: "DashboardV1",

    components: {
      header: AppBarV1,
      default: DashboardMain,
      sidebar: DashboardSidebar
    },
    // redirect: () => {
    //   return { path: '/v1/dashboard' }
    // },
    meta: {
      authRequired: false,
      layout: "main-layout"
    },
  }
]