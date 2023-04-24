import { defineStore } from "pinia";
import { CardData, CardDataV1, CardFunction, PageGen, PageRequest, SelectOption } from "@/model/Page";
import type { ServiceRequest } from "@/model/ServiceRequest";
import { User } from "@/model/User";
import router from "@/router";
import { computed, reactive, ref } from "vue";
import UserServiceV1 from "@/services/UserServiceV1";
import { useRoute } from "vue-router";
import RoleServiceV1 from "@/services/RoleServiceV1";
import { Role } from "@/model/Role";

export const useUserStoreV1 = defineStore('userStoreV1', () => {

  const route = useRoute();

  const userService = new UserServiceV1('users');
  const page = ref<PageGen<User>>(new PageGen());
  const users = computed<Array<User>>(() => page.value.content);
  const user = ref<User>(new User());

  const pageRequest = reactive<PageRequest>(new PageRequest(0, 20, "username"));
  const serviceRequest = reactive<ServiceRequest>(userService.getServiceRequest());

  const isAdd = ref<boolean>(false);

  const roleService = new RoleServiceV1("roles");
  const roles = ref<Array<Role>>(new Array());


  /**Common card data and function */

  const pageSizeList = [
    new SelectOption(10, 10),
    new SelectOption(20, 20),
    new SelectOption(50, 50)
  ]

  const sortByList = [
    new SelectOption("username", "Username"),
    new SelectOption("fio", "Ф.И.О."),
  ]

  const addEntity = async () => {
    router.push({ path: "/v1/security/users/add" })
  }

  const search = async () => {
    pageRequest.pageCurrent = 0;
    fetchUsers()
  }

  const setSearchText = async (searchText: string = "") => {
    pageRequest.search = searchText;
  }

  const changeSort = async (sort: string = "username") => {
    pageRequest.sortBy = sort;
    pageRequest.search = ""
    await fetchUsers();
  }

  const previosPage = async () => {
    if (!page.value.first) {
      pageRequest.pageCurrent -= 1;
      await fetchUsers();
    }
  }

  const nextPage = async () => {
    if (!page.value.last) {
      pageRequest.pageCurrent += 1;
      await fetchUsers();
    }
  }

  /**Add functions for CardDataV1 */
  const firstPage = async () => {
    if (!page.value.first) {
      pageRequest.pageCurrent = 0;
      await fetchUsers();
    }
  }

  const lastPage = async () => {
    if (!page.value.last) {
      pageRequest.pageCurrent = page.value.totalPages - 1;
      await fetchUser();
    }
  }

  const setPageSize = async (pageSize: number | string = 20) => {
    pageRequest.pageSize = pageSize as number
    pageRequest.pageCurrent = 0;
    await fetchUsers();
  }

  const cardData = computed<CardData>(() => {
    return new CardData(
      page.value,
      pageRequest,
      [...pageSizeList],
      [...sortByList],
      addEntity,
      search,
      setSearchText,
      changeSort,
      previosPage,
      nextPage,
      setPageSize
    )
  })

  const cardDataV1 = computed<CardDataV1>(() => {
    return new CardDataV1(
      page.value,
      pageRequest,
      [...pageSizeList],
      [...sortByList],
      addEntity,
      search,
      setSearchText,
      changeSort,
      previosPage,
      nextPage,
      firstPage,
      lastPage,
      setPageSize
    );
  })

  const cardFunction = computed<CardFunction>(() => {
    return new CardFunction(
      user.value.id,
      saveUser,
      deleteUser,
      () => {
        router.push({ name: "UserList" })
      }
    )
  })

  /**End */

  async function fetchUsers() {
    userService.getEntities(pageRequest).then(resp => {
      page.value = resp
    })
  }

  async function initForm(): Promise<void> {
    const id = route.params.id;
    console.log("Init Form");

    if (typeof id == "string" && parseInt(id)) {
      isAdd.value = false;
      await fetchUser(parseInt(id))
    } else {
      isAdd.value = true;
      user.value = new User();
    }
    if (roles.value.length == 0) {
      roles.value = await roleService.getAllEntities();
    }
  }

  async function saveUser() {
    if (isAdd.value) {
      await userService.addEntity(user.value).then(async (resp) => {
        // isAdd.value = false
        router.push({ path: `/v1/security/users/${resp.id}` })
      });
    } else {
      await userService.updateEntity(user.value);
    }
    await fetchUsers();
  }

  async function deleteUser() {
    await userService.deleteEntity(user.value.id).then(async () => {
      await fetchUsers();
      router.push({ name: "UserList" })
    });
  }

  async function fetchUser(id: number = -1) {
    user.value = await userService.getEntity(id);
  }

  function addRole(role: Role = new Role()) {
    if (role.id > 0) {
      const roles1 = user.value.roles.filter(r => r.id !== role.id)
      user.value.roles = [...roles1, role]
    }
  }

  function deleteRole(role: Role = new Role) {
    if (role.id > 0) {
      user.value.roles = [...user.value.roles.filter(r => r.id !== role.id)]
    }
  }


  return {
    users,
    user,
    serviceRequest,
    cardData,
    cardDataV1,
    fetchUsers,
    cardFunction,
    initForm,
    isAdd,
    roles,
    addRole,
    deleteRole
  }

})