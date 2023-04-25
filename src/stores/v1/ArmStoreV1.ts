import { Arm, ArmDetail } from "@/model/Arm";
import { CardDataV1, CardFunction, PageGen, PageRequest, SelectOption } from "@/model/Page";
import router from "@/router";
import ArmDetailServiceV1 from "@/services/ArmDetailServiceV1";
import ArmServiceV1 from "@/services/ArmServiceV1";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";

export const useArmStoreV1 = defineStore('armStoreV1', () => {

  const route = useRoute();
  const armServiceV1 = new ArmServiceV1("arms");
  const page = ref<PageGen<Arm>>(new PageGen());
  const arms = computed<Array<Arm>>(() => page.value.content);
  const arm = ref<Arm>(new Arm());

  const isAdd = ref<boolean>(false);
  const pageRequest = reactive<PageRequest>(new PageRequest(0, 20, "name"));

  const armDetailService = new ArmDetailServiceV1("arm-details");
  const armDetail = ref<ArmDetail>(new ArmDetail());
  const isAddArmDetail = ref<boolean>(false);



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
    router.push({ path: "/v1/arms/add" })
  }

  const search = async () => {
    pageRequest.pageCurrent = 0;
    await fetchArms()
  }

  const setSearchText = async (searchText: string = "") => {
    pageRequest.search = searchText;
  }

  const changeSort = async (sort: string = "name") => {
    pageRequest.sortBy = sort;
    pageRequest.search = ""
    await fetchArms();
  }

  const previosPage = async () => {
    if (!page.value.first) {
      pageRequest.pageCurrent -= 1;
      await fetchArms();
    }
  }

  const nextPage = async () => {
    if (!page.value.last) {
      pageRequest.pageCurrent += 1;
      await fetchArms();
    }
  }

  /**Add functions for CardDataV1 */
  const firstPage = async () => {
    if (!page.value.first) {
      pageRequest.pageCurrent = 0;
      await fetchArms();
    }
  }

  const lastPage = async () => {
    if (!page.value.last) {
      pageRequest.pageCurrent = page.value.totalPages - 1;
      await fetchArms();
    }
  }

  const setPageSize = async (pageSize: number | string = 20) => {
    pageRequest.pageSize = pageSize as number
    pageRequest.pageCurrent = 0;
    await fetchArms();
  }

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
      arm.value.id,
      saveArm,
      deleteArm,
      () => {
        router.push({ path: `/v1/arms` })
      }
    )
  })

  async function initForm(): Promise<void> {
    const id = route.params.id;
    if (typeof id == "string") {
      if (Number(id)) {
        isAdd.value = false;
        await fetchArm(Number(id));
      } else if (id == "add") {
        isAdd.value = true;
        arm.value = new Arm();
      } else {
        router.go(-1);
      }
    } else {
      router.go(-1);
    }
  }

  /**End */

  async function fetchArms(): Promise<void> {
    page.value = await armServiceV1.getEntities(pageRequest);
  }

  async function fetchArm(id: number = -1): Promise<void> {
    if (id > 0) {
      arm.value = await armServiceV1.getEntity(id);
    }
  }

  async function saveArm() {
    if (isAdd.value) {
      await armServiceV1.addEntity(arm.value).then(async (resp) => {
        router.push({ path: `/v1/arms/${resp.id}` })
      });
    } else {
      await armServiceV1.updateEntity(arm.value);
    }
    await fetchArms();
  }

  async function deleteArm() {
    await armServiceV1.deleteEntity(arm.value.id).then(async () => {
      await fetchArms();
      router.push({ path: `/v1/arms` })
    });
  }

  async function fetchArmDetail(id: number = -1):Promise<ArmDetail> {
    if (id > 0) {
      armDetail.value = await armDetailService.getEntity(id)
    }
    return armDetail.value
  }

  async function initFormArmDetail(): Promise<void> {
    const id = route.params.idArmDetail;
    if (typeof id == "string") {
      if (Number(id)) {
        isAddArmDetail.value = false;
        await fetchArmDetail(Number(id));
      } else if (id == "add") {
        isAddArmDetail.value = true;
        armDetail.value = new ArmDetail();
        armDetail.value.armId = arm.value.id;
      } else {
        router.go(-1);
      }
    } else {
      router.go(-1);
    }
  }

  async function saveArmDetail() {
    if (isAddArmDetail.value) {
      await armDetailService.addEntity(armDetail.value).then(async (resp) => {
        armDetail.value = await fetchArmDetail(resp.id)
        router.push({ path: `/v1/arms/${arm.value.id}/details/${resp.id}` })
      });
    } else {
      await armDetailService.updateEntity(armDetail.value);
    }
    await fetchArm(arm.value.id);
  }

  async function deleteArmDetail() {
    await armDetailService.deleteEntity(armDetail.value.id).then(async () => {
      await fetchArm(arm.value.id);
      router.push({ path: `/v1/arms/${arm.value.id}` })
    })
  }

  const cardFunctionDetail = computed<CardFunction>(() => {
    return new CardFunction(
      armDetail.value.id,
      saveArmDetail,
      deleteArmDetail,
      () => {
        router.push({ path: `/v1/arms/${arm.value.id}` })
      }
    )
  })


  return {
    arms,
    arm,
    fetchArms,
    cardDataV1,
    cardFunction,
    initForm,
    armDetail,
    initFormArmDetail,
    cardFunctionDetail
  }

})