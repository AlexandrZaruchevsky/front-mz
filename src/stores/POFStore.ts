import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import POFService from '@/services/POFService';
import { POF, POFPage } from '@/model/POF';
import OrgService from '@/services/OrgService';
import type { Organization } from '@/model/Organization';
import { PageRequest } from '@/model/Page';
import type { ServiceRequest } from '@/model/ServiceRequest';
import router from '@/router';


export const usePOFStore = defineStore('pOFStore', () => {

  const pOFService = new POFService("point-of-presences");
  const orgService = new OrgService("organizations");

  const pageRequest = reactive<PageRequest>(new PageRequest());
  const serviceRequest = reactive<ServiceRequest>(pOFService.getServiceRequest());
  
  const pOFPage = ref<POFPage>(new POFPage());
  const pOFs = computed<Array<POF>>(() => pOFPage.value.content);
  const pOF = ref<POF>(new POF());
  const orgs = ref<Array<Organization>>(new Array());

  async function fetchOrgs() {
    await orgService.getAllOrgs().then(response => {
      orgs.value = [...response];
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  function pOFsClear() {
    orgs.value = new Array();
  }

  async function fetchPOFs() {
    await pOFService.getEntities(pageRequest).then(response => {
      pOFPage.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function fetchPOF(id: Number = -1) {
    await pOFService.getEntity(id).then(response => {
      pOF.value = response;
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  function setAdd(val: Boolean = true) {
    serviceRequest.add(val)
    if (serviceRequest.isAdd()) {
      pOF.value = new POF();
    }
  }

  async function savePOF() {
    let flag = false;
    if (serviceRequest.isAdd()) {
      await pOFService.addEntity(pOF.value).then(response => {
        pOF.value = response
        flag = true;
      })
    } else {
      await pOFService.updateEntity(pOF.value).then(response => {
        pOF.value = response
        flag = true;
      })
    }
    if (flag) {
      await fetchPOFs()
      router.push({ name: 'PointOfPresence' })
    }
  }

  async function deletePOF(id: Number) {
    await pOFService.deleteEntity(id).then(async () => {
      await fetchPOFs();
      router.push({ name: 'Departments' })
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  return {
    pOFs,
    pOF,
    orgs,
    serviceRequest,
    pOFsClear,
    fetchOrgs,
    fetchPOFs,
    fetchPOF,
    setAdd,
    savePOF,
    deletePOF
  }

})
