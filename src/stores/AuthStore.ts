import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { LoginPassword, User, UserAuth } from '@/model/User'
import { AuthSevice } from '@/services/AuthService';
import router from '@/router';

export const useAuthStore = defineStore('authStore', () => {
  const userAuth = ref<UserAuth>(new UserAuth());
  const isAuth = ref<Boolean>(false);
  const token = computed<string>(() => `Bearer ${userAuth.value.token}`);
  const user = computed<User>(() => userAuth.value.user);


  const shortFIO = computed(() => {
    return user.value
      ? user.value.lastName?.concat(' ', user.value.firstName?.substring(0, 1).concat("."), user.value.middleName?.substring(0, 1).concat("."))
      : "NoName"
  })

  const isAdmin = computed<boolean>(() => user.value.roles.filter(role => role.name.includes("ADMIN")).length > 0)
  const isGuardian = computed<boolean>(() => user.value.roles.filter(role => {
    return role.name.toLocaleLowerCase().includes('security') || role.name.toLocaleLowerCase().includes('super_admin')
  }).length > 0)

  const isAuthError = ref<Boolean>(false);
  const errorMessage = ref<String>("");

  const isLoaded = ref<Boolean>(false);

  function login(loginPassword: LoginPassword) {
    isLoaded.value = true;
    isAuthError.value = false;
    AuthSevice.getAuth(loginPassword)
      .then(response => {
        userAuth.value = response;
        isAuth.value = true;
        saveToLocalStorage();
        isLoaded.value = false
        errorMessage.value = "";
        router.back();
      }).catch(err => {
        logout();
        isLoaded.value = false
        isAuthError.value = true
        errorMessage.value = err.response.data
      });
  }

  async function validateToken() {
    if (!isAuth.value) {
      return
    }
    isLoaded.value = true;
    isAuthError.value = false;
    await AuthSevice.validateToken(token.value).then(response => {
      userAuth.value.user = { ...response }
      isLoaded.value = false;
      errorMessage.value = "";
      // router.push({ path: "/" })
    }).catch(() => {
      isAuthError.value = true;
      errorMessage.value = "Invalidate token";
      logoutWithGoHome();
    })
  }

  function logout() {
    userAuth.value = new UserAuth();
    isAuth.value = false;
    clearLocalStorage()
    router.push({ path: '/v1/dashboard' })
  }

  function logoutWithGoHome() {
    logout()
    router.push({
      name: "Home"
    })
  }

  function saveToLocalStorage() {
    if (isAuth.value) {
      localStorage.setItem("user", JSON.stringify(userAuth.value));
      localStorage.setItem("isAuth", isAuth.value ? "true" : "false");
    }
  }

  function loadFromLocalStorage() {
    const auth = localStorage.getItem("isAuth");
    const user = localStorage.getItem("user");
    if (auth && user) {
      isAuth.value = auth == "true" ? true : false;
      userAuth.value = JSON.parse(user);
    }
  }

  function clearLocalStorage() {
    localStorage.clear();
  }

  async function init() {
    loadFromLocalStorage()
    await validateToken();
  }

  function authPage() {
    router.push({ name: 'LoginPage' })
  }

  return {
    isAuth,
    token,
    user,
    shortFIO,
    isAuthError,
    errorMessage,
    isLoaded,
    isAdmin,
    isGuardian,
    init,
    login,
    logout,
    validateToken,
    authPage
  }

})
