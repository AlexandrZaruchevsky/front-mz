import { Equip, EquipParents } from "@/model/Equip";
import { CardDataV1, CardFunction, PageGen, PageRequestEquip, SelectOption } from "@/model/Page";
import router from "@/router";
import EquipService from "@/services/EquipServiceV1";
import { defineStore } from "pinia";
import { computed, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { arrayUtil } from "@/utils/ArrayUtil";

export const useEquipStoreV1 = defineStore('equipStoreV1', () => {

  const route = useRoute();

  const equipService = new EquipService("equips");
  const page = ref<PageGen<Equip>>(new PageGen());
  const equips = computed<Array<Equip>>(() => page.value.content);
  const equip = ref<Equip>(new Equip());

  const equipChildren = ref<Array<Equip>>(new Array());
  const equipChild = ref<Equip>(new Equip());

  const isAdd = ref<boolean>(false);
  const isAddChild = ref<boolean>(false);

  const pageRequest = reactive<PageRequestEquip>(new PageRequestEquip(0, 20, "shortName"));

  const equipParents = ref<EquipParents>(new EquipParents());

  const equipTypeList = computed<Array<SelectOption>>(() => arrayUtil.selectOptionsFromEquipType(equipParents.value.equipTypes));
  const equipModelList = computed<Array<SelectOption>>(() => {
    return arrayUtil.selectOptionsFromEquipModels(arrayUtil.equipModelsByTypeId(equipParents.value.equipModels, pageRequest.equipTypeId))
  });

  const changeTypeAndModel = computed(() => {
    return {
      type: pageRequest.equipTypeId,
      model: pageRequest.equipModelId
    }
  })

  const typeId = computed<number>(() => pageRequest.equipTypeId)

  watch(changeTypeAndModel, async () => {
    await fetchEquips();
  })

  watch(typeId, () => {
    pageRequest.equipModelId = -1
  })

  const equipTypeListForEquip = computed<Array<SelectOption>>(() => arrayUtil.selectOptionsFromEquipType(equipParents.value.equipTypes));
  const equipModelListForEquip = computed<Array<SelectOption>>(() => {
    return arrayUtil.selectOptionsFromEquipModels(arrayUtil.equipModelsByTypeId(equipParents.value.equipModels, equip.value.equipTypeId))
  });

  const equipTypeId = computed(() => equip.value.equipTypeId)
  watch(equipTypeId, () => {
    if (equipTypeId.value == -1) {
      equip.value.equipModelId = -1;
    }
  })

  watch(equipModelListForEquip, () => {
    if (
      equipModelListForEquip.value.length > 0 &&
      !arrayUtil.keyInSelectOptions(equipModelListForEquip.value, equip.value.equipModelId)
    ) {
        equip.value.equipModelId = -1;
    }
  })

  const equipTypeListForEquipChild = computed<Array<SelectOption>>(() => arrayUtil.selectOptionsFromEquipType(equipParents.value.equipTypes));
  const equipModelListForEquipChild = computed<Array<SelectOption>>(() => {
    return arrayUtil.selectOptionsFromEquipModels(arrayUtil.equipModelsByTypeId(equipParents.value.equipModels, equipChild.value.equipTypeId))
  });

  const equipTypeChildId = computed(()=>equipChild.value.equipTypeId);
  watch(equipTypeChildId, () => {
    if (equipTypeChildId.value == -1) {
      equipChild.value.equipModelId = -1;
    }
  })

  watch(equipModelListForEquipChild, () => {
    if (
      equipModelListForEquipChild.value.length > 0 &&
      !arrayUtil.keyInSelectOptions(equipModelListForEquipChild.value, equipChild.value.equipModelId)
    ) {
        equipChild.value.equipModelId = -1;
    }
  })

  const isDetails = ref<boolean>(false);

  /**Common card data and function */

  const pageSizeList = [
    new SelectOption(10, 10),
    new SelectOption(20, 20),
    new SelectOption(50, 50)
  ]

  const sortByList = [
    new SelectOption("shortName", "Наименование"),
    new SelectOption("inventoryNumber", "Инвентарный №"),
  ]

  const addEntity = async () => {
    router.push({ path: "/v1/equips/add" })
  }

  const search = async () => {
    pageRequest.pageCurrent = 0;
    await fetchEquips()
  }

  const setSearchText = async (searchText: string = "") => {
    pageRequest.search = searchText;
  }

  const changeSort = async (sort: string = "name") => {
    pageRequest.sortBy = sort;
    pageRequest.search = ""
    await fetchEquips();
  }

  const previosPage = async () => {
    if (!page.value.first) {
      pageRequest.pageCurrent -= 1;
      await fetchEquips();
    }
  }

  const nextPage = async () => {
    if (!page.value.last) {
      pageRequest.pageCurrent += 1;
      await fetchEquips();
    }
  }

  /**Add functions for CardDataV1 */
  const firstPage = async () => {
    if (!page.value.first) {
      pageRequest.pageCurrent = 0;
      await fetchEquips();
    }
  }

  const lastPage = async () => {
    if (!page.value.last) {
      pageRequest.pageCurrent = page.value.totalPages - 1;
      await fetchEquips();
    }
  }

  const setPageSize = async (pageSize: number | string = 20) => {
    pageRequest.pageSize = pageSize as number
    pageRequest.pageCurrent = 0;
    await fetchEquips();
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
      equip.value.id,
      saveEquip,
      deleteEquip,
      () => {
        router.push({ name: "EquipList" })
      }
    )
  })

  /**End */

  async function fetchEquips() {
    page.value = await equipService.getEntities(pageRequest);
  }

  async function initForm(): Promise<void> {
    const id = route.params.id;
    if (typeof id == "string") {
      if (Number(id)) {
        isAdd.value = false;
        await fetchEquip(parseInt(id));
      } else if (id == "add") {
        isAdd.value = true;
        equip.value = new Equip();
        isDetails.value = false;
      } else {
        router.go(-1);
      }
    } else {
      router.go(-1);
    }
  }

  async function fetchEquip(id: number = -1) {
    await equipService.getEntity(id).then(async resp => {
      equip.value = resp
      isDetails.value = resp.groupAccounting;
      if (isDetails.value) {
        await fetchChildren();
      } else {
        equipChildren.value = new Array();
      }
    })
  }

  async function saveEquip() {
    if (isAdd.value) {
      await equipService.addEntity(equip.value).then(async (resp) => {
        isDetails.value = resp.groupAccounting
        console.log(isDetails.value);
        router.push({ path: `/v1/equips/${resp.id}` })
      });
    } else {
      await equipService.updateEntity(equip.value).then(resp => {
        isDetails.value = resp.groupAccounting
      });
    }
    await fetchEquips();
  }

  async function deleteEquip() {
    await equipService.deleteEntity(equip.value.id).then(async () => {
      await fetchEquips();
      router.push({ name: "RoleList" })
    });
  }

  async function fetchEquipTypes(): Promise<void> {
    equipParents.value = await equipService.fetchEquipParents();
  }

  async function fetchChildren(): Promise<void> {
    if (isDetails.value) {
      equipChildren.value = await equipService.fetchChildren(equip.value.id);
    }
  }

  async function fetchEquipChild(id: number = -1): Promise<void> {
    equipChild.value = await equipService.getEntity(id);
  }

  async function initFormChild(): Promise<void> {
    const id = route.params.childId;
    if (typeof id == "string") {
      if (Number(id)) {
        isAddChild.value = false;
        await fetchEquipChild(Number(id));
      } else if (id == "add") {
        isAddChild.value = true;
        equipChild.value = new Equip();
        equipChild.value.equipTypeId = equip.value.equipTypeId;
        equipChild.value.equipModelId = equip.value.equipModelId;
        equipChild.value.children = true;
        equipChild.value.parentId = equip.value.id;
        equipChild.value.employeeMol = equip.value.employeeMol;
        equipChild.value.inventoryNumber=equip.value.inventoryNumber;
      } else {
        router.go(-1);
      }
    } else {
      router.go(-1);
    }
  }

  const cardFunctionChild = computed<CardFunction>(() => {
    return new CardFunction(
      equipChild.value.id,
      saveEquipChild,
      deleteEquipChild,
      () => {
        router.push({ path: `/v1/equips/${equip.value.id}` })
      }
    )
  })

  async function saveEquipChild() {
    if (isAddChild.value) {
      await equipService.addEntity(equipChild.value).then(async (resp) => {
        router.push({ path: `/v1/equips/${equip.value.id}/children/${resp.id}` })
      });
    } else {
      await equipService.updateEntity(equipChild.value);
    }
    await fetchEquips();
  }

  async function deleteEquipChild() {
    await equipService.deleteEntity(equipChild.value.id).then(async () => {
      await fetchChildren();
      router.push({ path: `/v1/equips/${equip.value.id}` })
    });
  }

  async function deleteChild(id: number = -1) {
    if (id > 0) {
      await equipService.deleteEntity(id).then(async () => {
        await fetchChildren();
      });
    }
  }

  return {
    equips,
    equip,
    equipChildren,
    equipChild,
    deleteChild,
    isDetails,
    fetchEquips,
    cardDataV1,
    cardFunction,
    cardFunctionChild,
    initForm,
    initFormChild,
    equipTypeList,
    equipModelList,
    fetchEquipTypes,
    equipTypeListForEquip,
    equipModelListForEquip,
    equipTypeListForEquipChild,
    equipModelListForEquipChild,
    pageRequest,
    equipParents
  }

})