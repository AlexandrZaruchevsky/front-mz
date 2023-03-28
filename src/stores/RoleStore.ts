import { PageRequest } from '@/model/Page';
import { Role, RolePage } from '@/model/Role'
import RoleService from '@/services/RoleService';
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useRoleStore = defineStore('roleStore', () => {
  const rolePage = ref<RolePage>(new RolePage());
  // const permissions = ref<Array<String>>(new Array());

  const roles = computed<Array<Role>>(() => rolePage.value.content);

  const isLoading = ref<Boolean>(false);
  const isError = ref<Boolean>(false);
  const errorMessage = ref<String>("");

  const fetchRoles = (pageRequest: PageRequest = new PageRequest()) => {
    isLoading.value = true;
    isError.value = false;
    errorMessage.value = "";

    RoleService.getUsers(pageRequest).then(response => {
      rolePage.value = response
      isLoading.value = false;
    }).catch(err => {
      console.log(err);
      isError.value = true;
      errorMessage.value = "Error fetch Roles";
      isLoading.value = false;
    })

  }

  return {
    roles,
    isLoading,
    isError,
    errorMessage,

    fetchRoles
  }

})
