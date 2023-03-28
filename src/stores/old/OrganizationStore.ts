import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Organization, OrganizationPage } from '@/model/Organization';
import OrganizationService from '@/services/OrganizationService';
import router from '@/router';

export const useOrganizationStore = defineStore('organizationStore', () => {
  const orgPage = ref<OrganizationPage>(new OrganizationPage());
  const org = ref<Organization>(new Organization());

  const isLoading = ref<Boolean>(false);
  const isError = ref<Boolean>(false);
  const errorMessage = ref<String>("");

  const isAdd = ref<Boolean>(false);

  const orgs = computed<Array<Organization>>(() => orgPage.value.content)


  async function fetchOrganizations() {
    isLoading.value = true;
    isError.value = false;
    errorMessage.value = "";
    await OrganizationService.getOrgs().then(response => {
      orgPage.value = response
      isLoading.value = false;
    }).catch(err => {
      console.log(err);
      isError.value = true;
      errorMessage.value = "Error fetch Organizations";
      isLoading.value = false;
    })
  }

  async function fetchOrganization(id: Number = -1) {
    isLoading.value = true;
    isError.value = false;
    errorMessage.value = "";
    await OrganizationService.getOrg(id).then(response => {
      org.value = response
      isLoading.value = false;
    }).catch(err => {
      console.log(err);
      isError.value = true;
      errorMessage.value = "Error fetch Organization";
      isLoading.value = false;
    })

  }

  function setAdd(val: Boolean = true) {
    isAdd.value = val;
    if (isAdd.value) {
      org.value = new Organization();
    }
  }

  async function saveOrganization() {
    let flag = false;
    if (isAdd.value) {
      await OrganizationService.addOrg(org.value).then(response => {
        org.value = response
        flag = true;
      })
    } else {
      await OrganizationService.updateOrg(org.value).then(response => {
        org.value = response
        flag = true;
      })
    }
    if (flag) {
      await fetchOrganizations()
      router.push({ name: 'Organizations' })
    }
  }

  return {
    orgs,
    org,
    isAdd,
    isLoading,
    isError,
    errorMessage,
    fetchOrganizations,
    fetchOrganization,
    setAdd,
    saveOrganization
  }

})
