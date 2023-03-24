import { createRouter, createWebHistory } from 'vue-router'
import userRoutes from './UserRoutes'
import authRoutes from './AuthRoutes'
import roleRoutes from './RoleRoutes'
import organizationRoutes from './OrganizationRoutes'
import departmentRoutes from './DepartmentRoutes'
import pOFRoutes from './POFRoutes'
import positionRoutes from './PositionRoutes'
import employeeRoutes from './EmployeeRoutes'

import { useAuthStore } from "../stores/AuthStore"
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import("@/pages/HomePage.vue"),
      meta: {
        layout: "default-layout",
        authRequired: false
      }
    },
    {
      path: '/admin',
      redirect: to => {
        return {name:"Organizations"}
      }
    },
    {
      path:'/admin/upload',
      name:'UploadPage',
      component: ()=> import('@/pages/UploadPage.vue'),
      meta:{
        layout: "admin-layout",
        authRequired: true
      }
    },
    ...userRoutes,
    ...authRoutes,
    ...roleRoutes,
    ...organizationRoutes,
    ...departmentRoutes,
    ...pOFRoutes,
    ...positionRoutes,
    ...employeeRoutes
  ]
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  const { isAuth } = storeToRefs(store);
  if (
    to.name === "Home" ||
    to.name === "LoginPage" ||
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
