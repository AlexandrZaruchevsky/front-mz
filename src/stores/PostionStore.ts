import type { Organization } from "@/model/Organization";
import { PageRequest } from "@/model/Page";
import { Position, PositionPage } from "@/model/Position";
import type { ServiceRequest } from "@/model/ServiceRequest";
import router from "@/router";
import OrgService from "@/services/OrgService";
import PosService from "@/services/PosService";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";


export const usePositionStore = defineStore('positionStore', () => {

  const orgService = new OrgService("organizations");
  const positionService = new PosService("positions");

  const pageRequest = reactive<PageRequest>(new PageRequest());
  const serviceRequest = reactive<ServiceRequest>(positionService.getServiceRequest());

  const postionPage = ref<PositionPage>(new PositionPage());
  const positions = computed<Array<Position>>(() => postionPage.value.content);
  const position = ref<Position>(new Position());
  const orgs = ref<Array<Organization>>(new Array());

  async function fetchOrgs() {
    await orgService.getAllOrgs().then(response => {
      orgs.value = [...response];
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  // function orgsClear() {
  //   orgs.value = new Array();
  // }

  async function fetchPositions() {
    await positionService.getEntities(pageRequest).then(response => {
      postionPage.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function fetchPosition(id: Number = -1) {
    await positionService.getEntity(id).then(response => {
      position.value = response;
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  function setAdd(val: Boolean = true) {
    serviceRequest.add(val)
    if (serviceRequest.isAdd()) {
      position.value = new Position();
    }
  }

  async function savePosition() {
    let flag = false;
    if (serviceRequest.isAdd()) {
      await positionService.addEntity(position.value).then(response => {
        position.value = response
        flag = true;
      })
    } else {
      await positionService.updateEntity(position.value).then(response => {
        position.value = response
        flag = true;
      })
    }
    if (flag) {
      await fetchPositions()
      router.push({ name: 'Positions' })
    }
  }

  async function deletePosition(id:Number=-1){
    const flag = await positionService.deleteEntity(id);
    if(flag){
      await fetchPositions();
      router.push({ name: 'Positions' })
    }
  }


  return {
    orgs,
    position,
    positions,
    serviceRequest,
    setAdd,
    fetchOrgs,
    fetchPositions,
    fetchPosition,
    savePosition,
    deletePosition
  }


})