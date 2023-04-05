import { ArmDetail } from "@/model/Arm";
import { CardFunction } from "@/model/Page";
import type { ServiceRequest } from "@/model/ServiceRequest";
import router from "@/router";
import { defineStore, storeToRefs } from "pinia";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useArmStore } from "./ArmStore";
import ArmDetailServiceV1 from "@/services/ArmDetailServiceV1";

export const useArmDetailStore = defineStore("armDetailStore", () => {

  const entityService = new ArmDetailServiceV1("arm-details");
  const { entity } = storeToRefs(useArmStore());
  const { fetchEntity } = useArmStore();

  const serviceRequest = reactive<ServiceRequest>(entityService.getServiceRequest());

  const armDetailList = ref<Array<ArmDetail>>(new Array());
  const armDetail = ref<ArmDetail>(new ArmDetail());


  /**Common card data and function */


  const cardFunction = computed<CardFunction>(() => {
    return new CardFunction(
      armDetail.value.id,
      saveEntity,
      deleteEntity,
      () => {
        router.push({ path: `/arms/${entity.value.id}` })
      }
    )
  })

  /**End */

  function setAdd(val: Boolean = true) {
    serviceRequest.add(val)
    if (serviceRequest.isAdd()) {
      armDetail.value = new ArmDetail();
    }
  }


  async function initForm() {
    const paramId = useRoute().params.id as string;
    if (parseInt(paramId) && entity.value.id < 0) {
      await fetchEntity(parseInt(paramId));
    }
    await fetchArmDetailsByAmrId();
  }

  async function editForm() {
    const paramId = useRoute().params.id as string;
    if (!parseInt(paramId)) {
      if (paramId === "add") {
        setAdd();
      } else {
        setAdd(false);
        router.push({ name: "ArmDetails" })
      }
    }
    else {
      setAdd(false);
      await fetchArmDetail(parseInt(paramId));
    }
  }


  async function fetchArmDetailsByAmrId() {
    await entityService.fetchArmDetailsByArmId(entity.value.id).then(response => {
      armDetailList.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function fetchArmDetail(id: Number = -1) {
    await entityService.getEntity(id).then(async response => {
      armDetail.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
  }
  async function saveEntity() {
    let flag = false;
    if (serviceRequest.isAdd()) {
      await entityService.addEntity(armDetail.value).then(async response => {
        flag = true;
        await fetchArmDetail(response.id);
        serviceRequest.add(false);
        router.push({ path: `/arm-details/${entity.value.id}` })
      })
    } else {
      await entityService.updateEntity(armDetail.value).then(async response => {
        flag = true;
        await fetchArmDetail(response.id);
      })
    }
    if (flag) {
      await fetchArmDetailsByAmrId();
    }
  }

  async function deleteEntity(id: number = -1) {
    await entityService.deleteEntity(id).then(async () => {
      await fetchArmDetailsByAmrId();
      router.push({ name: "ArmDetails" })
    }).catch(err => {
      console.log(err.response.data);
    })
  }


  return {
    armDetailList,
    armDetail,
    entity,
    serviceRequest,
    cardFunction,
    headerForm: computed(() => {
      return serviceRequest.isAdd() ? "ArmDetail | Add" : "ArmDetail | Update"
    }),
    fetchArmDetailsByAmrId,
    editForm,
    initForm
  }

})