import { CardData, CardFunction, PageGen, PageRequest, SelectOption } from "@/model/Page";
import { Role } from "@/model/Role";
import type { ServiceRequest } from "@/model/ServiceRequest";
import router from "@/router";
import RoleServiceV1 from "@/services/RoleServiceV1";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";

export const useRoleStoreV1 = defineStore("roleStoreV1", () => {

  const route = useRoute();

  const roleService = new RoleServiceV1("roles");
  const page = ref<PageGen<Role>>(new PageGen());
  const roles = computed<Array<Role>>(() => page.value.content);
  const role = ref<Role>(new Role());

  const isAdd = ref<boolean>(false);

  const pageRequest = reactive<PageRequest>(new PageRequest(0, 20, "name"));
  const serviceRequest = reactive<ServiceRequest>(roleService.getServiceRequest());


  /**Common card data and function */

  const pageSizeList = [
    new SelectOption(10, 10),
    new SelectOption(20, 20),
    new SelectOption(50, 50)
  ]

  const sortByList = [
    new SelectOption("name", "Name"),
  ]

  const addEntity = async () => {
    router.push({ path: "/v1/security/users/add" })
  }

  const search = async () => {
    pageRequest.pageCurrent = 0;
    fetchRoles()
  }

  const setSearchText = async (searchText: string = "") => {
    pageRequest.search = searchText;
  }

  const changeSort = async (sort: string = "username") => {
    pageRequest.sortBy = sort;
    pageRequest.search = ""
    await fetchRoles();
  }

  const previosPage = async () => {
    if (!page.value.first) {
      pageRequest.pageCurrent -= 1;
      await fetchRoles();
    }
  }

  const nextPage = async () => {
    if (!page.value.last) {
      pageRequest.pageCurrent += 1;
      await fetchRoles();
    }
  }

  const setPageSize = async (pageSize: number | string = 20) => {
    pageRequest.pageSize = pageSize as number
    pageRequest.pageCurrent = 0;
    await fetchRoles();
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

  const cardFunction = computed<CardFunction>(() => {
    return new CardFunction(
      role.value.id,
      saveUser,
      deleteUser,
      () => {
        router.push({ name: "RolList" })
      }
    )
  })

  /**End */

  async function fetchRoles(){
    page.value = await roleService.getEntities();
  }

  async function initForm(): Promise<void> {
    const id = route.params.id;
    console.log("Init Form");
    
    if (typeof id == "string" && parseInt(id)) {
      isAdd.value = false;
      await fetchRole(parseInt(id))
    } else {
      isAdd.value = true;
      role.value = new Role();
    }
  }

  async function fetchRole(id:number=-1){
    role.value = await roleService.getEntity(id);
  }

  async function saveUser() {
    if (isAdd.value) {
      await roleService.addEntity(role.value).then(async (resp) => {
        // isAdd.value = false
        router.push({ path: `/v1/security/users/${resp.id}` })
      });
    } else {
      await roleService.updateEntity(role.value);
    }
    await fetchRoles();
  }

  async function deleteUser() {
    await roleService.deleteEntity(role.value.id).then(async () => {
      await fetchRoles();
      router.push({ name: "UserList" })
    });
  }


  return{
    roles,
    role,
    serviceRequest,
    cardData,
    fetchRoles,
    initForm,
    isAdd,
    cardFunction
  }

})