import { createRouter, createWebHistory } from 'vue-router'
import userRoutes from './UserRoutes'
import authRoutes from './AuthRoutes'
import roleRoutes from './RoleRoutes'
import organizationRoutes from './OrganizationRoutes'
import departmentRoutes from './DepartmentRoutes'
import pOFRoutes from './POFRoutes'
import positionRoutes from './PositionRoutes'
import employeeRoutes from './EmployeeRoutes'
import mainRoutes from './MainRoutes'
import dicsRoutes from './DicsRoutes'


import mainRouteV1 from './new/MainRouteV1'

import { useAuthStore } from "../stores/AuthStore"
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        return { name: "Dashboard" }
      }
    },
    {
      path: '/about',
      name: 'Home',
      component: () => import("@/pages/HomePage.vue"),
      meta: {
        layout: "default-layout",
        authRequired: false
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import("@/pages/dashboards/DashboardLayout.vue"),
      meta: {
        layout: "default-layout",
        authRequired: false
      }
    },
    {
      path: '/admin',
      redirect: () => {
        return { name: "Organizations" }
      }
    },
    {
      path: '/admin/upload',
      name: 'UploadPage',
      component: () => import('@/pages/admin-page/UploadPage.vue'),
      meta: {
        layout: "admin-layout",
        authRequired: true
      }
    },
    ...mainRoutes,
    ...userRoutes,
    ...authRoutes,
    ...roleRoutes,
    ...organizationRoutes,
    ...departmentRoutes,
    ...pOFRoutes,
    ...positionRoutes,
    ...employeeRoutes,
    ...dicsRoutes,
    ...mainRouteV1
  ]
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  const { isAuth } = storeToRefs(store);
  if (
    to.name === "Home" ||
    to.name === "LoginPage" ||
    to.name === "Dashboard" ||
    to.path.includes('/v1') ||
    (
      to.meta.authRequired &&
      isAuth.value
    )
  ) {
    next()
  } else {
    next({ name: 'LoginPage' })
  }
})

export default router
