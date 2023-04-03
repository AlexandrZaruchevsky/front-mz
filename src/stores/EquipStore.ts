import { Equip, EquipParents } from "@/model/Equip"
import type { EquipModel } from "@/model/EquipModel"
import type { EquipType } from "@/model/EquipType"
import { CardData, CardFunction, PageGen, PageRequestEquip, SelectOption } from "@/model/Page"
import type { ServiceRequest } from "@/model/ServiceRequest"
import router from "@/router"
import EquipService from "@/services/EquipServiceV1"
import { defineStore } from "pinia"
import { computed, reactive, ref, watch } from "vue"
import { useRoute } from "vue-router"

export const useEquipStore = defineStore('equipStore', () => {
  const page = ref<PageGen<Equip>>(new PageGen())
  const entities = computed<Array<Equip>>(() => page.value.content)
  const entity = ref<Equip>(new Equip);
  const entityService = new EquipService("equips");

  const equipParents = ref<EquipParents>(new EquipParents());
  const equipTypeList = computed<Array<EquipType>>(() => equipParents.value.equipTypes);
  const equipModelList = computed<Array<EquipModel>>(() => {
    return pageRequest.equipTypeId == -1
      ? []
      : equipParents.value.equipModels.filter(item => item.equipTypeId === pageRequest.equipTypeId)
  });

  const equipTypeListForEntity = computed<Array<EquipType>>(() => equipParents.value.equipTypes);
  const equipModelListForEntity = computed<Array<EquipModel>>(() => {
    return entity.value.equipTypeId == -1
      ? []
      : equipParents.value.equipModels.filter(item => item.equipTypeId === entity.value.equipTypeId)
  });

  const serviceRequest = reactive<ServiceRequest>(entityService.getServiceRequest());
  const pageRequest = reactive<PageRequestEquip>(new PageRequestEquip(0, 20, "shortName"));

  const equipTypeId = computed<number>(() => pageRequest.equipTypeId)
  const equipModelId = computed<number>(() => pageRequest.equipModelId)
  const equipTypeIdEntity = computed<number>(() => entity.value.equipTypeId);
  const isGroupAccounting = computed<boolean>(() => entity.value.groupAccounting);

  const equipChildren = ref<Array<Equip>>(new Array());
  const equipChild = ref<Equip>(new Equip());


  const equipTypeListForChild = computed<Array<EquipType>>(() => equipParents.value.equipTypes);
  const equipModelListForChild = computed<Array<EquipModel>>(() => {
    return equipChild.value.equipTypeId == -1
      ? []
      : equipParents.value.equipModels.filter(item => item.equipTypeId === equipChild.value.equipTypeId)
  });

  const equipTypeIdChild = computed(()=>equipChild.value.equipTypeId)

  watch(equipTypeIdChild,()=>{
    if(equipTypeIdChild.value==-1){
      equipChild.value.equipModelId = -1;
    }
  })

  watch(equipModelListForChild,()=>{
    if(equipModelListForChild.value.length==0){
      equipChild.value.equipModelId = -1;
    }
  })

  watch(equipTypeIdEntity, () => {
    if (equipTypeIdEntity.value == -1) {
      entity.value.equipModelId = -1
    }
  })

  watch(equipTypeId, async () => {
    pageRequest.equipModelId = -1
    await fetchEntities();
  })

  watch(equipModelId, async () => {
    await fetchEntities();
  })

  async function editForm() {
    const paramId = useRoute().params.id as string;
    if (!parseInt(paramId)) {
      if (paramId === "add") {
        setAdd();
        entity.value.equipTypeId = pageRequest.equipTypeId;
        entity.value.equipModelId = pageRequest.equipModelId;
      } else {
        setAdd(false);
        router.push({ name: "Equips" })
      }
    }
    else {
      setAdd(false);
      await fetchEntity(parseInt(paramId));
    }
  }

  async function editChildForm() {
    const paramId = useRoute().params.idChild as string;
    const id = useRoute().params.id as string;
    console.log("editChild");
    
    if (!parseInt(paramId)) {
      if (paramId === "add") {
        setAddChild();
        equipChild.value.equipTypeId = -1;
        equipChild.value.equipModelId = -1;
        equipChild.value.parentId = parseInt(id);
      } else {
        setAddChild(false);
        // router.push({ name: "Equips" })
      }
    }
    else {
      setAdd(false);
      await fetchEquipChild(parseInt(paramId));
      // await fetchEntity(parseInt(paramId));
    }
  }

  async function detailForm() {
    const paramId = useRoute().params.id as string;
    if (parseInt(paramId)) {
      fetchEntity(parseInt(paramId)).then(async () => {
        await fetchEquipChildren()
      })

    }
  }

  const pageSizeList = [
    new SelectOption(10, 10),
    new SelectOption(20, 20),
    new SelectOption(50, 50)
  ]

  const sortByList = [
    new SelectOption("shortName", "Наименование"),
    new SelectOption("inventoryNumber", "Инвентарный номер"),
    new SelectOption("serialNumber", "Серийный номер"),
  ]

  const addEntity = async () => {
    router.push({ path: "/equips/add" })
  }

  const search = async () => {
    pageRequest.pageCurrent = 0;
    fetchEntities()
  }

  const setSearchText = async (searchText: string = "") => {
    pageRequest.search = searchText;
  }

  const changeSort = async (sort: string = "shortName") => {
    pageRequest.sortBy = sort;
    pageRequest.search = ""
    await fetchEntities();
  }

  const previosPage = async () => {
    if (!page.value.first) {
      pageRequest.pageCurrent -= 1;
      await fetchEntities();
    }
  }

  const nextPage = async () => {
    if (!page.value.last) {
      pageRequest.pageCurrent += 1;
      await fetchEntities();
    }
  }

  const setPageSize = async (pageSize: number | string = 20) => {
    pageRequest.pageSize = pageSize as number
    pageRequest.pageCurrent = 0;
    await fetchEntities();
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
      entity.value.id,
      saveEntity,
      deleteEntity,
      () => {
        router.go(-1)
      }
    )
  })

  const cardFuncChild = computed<CardFunction>(() => {
    return new CardFunction(
      equipChild.value.id,
      saveChild,
      deleteChild,
      () => {
        router.go(-1)
      }
    )
  })

  async function fetchEntities() {
    await entityService.getEntities(pageRequest).then(response => {
      page.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
  }


  function setAdd(val: Boolean = true) {
    serviceRequest.add(val)
    if (serviceRequest.isAdd()) {
      entity.value = new Equip();
    }
  }

  function setAddChild(val: Boolean = true) {
    serviceRequest.add(val)
    if (serviceRequest.isAdd()) {
      equipChild.value = new Equip();
      equipChild.value.children = true
    }
  }

  async function fetchEntity(id: Number = -1) {
    await entityService.getEntity(id).then(async response => {
      entity.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function fetchEquipChild(id: Number = -1) {
    await entityService.getEntity(id).then(async response => {
      equipChild.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function saveEntity() {
    let flag = false;
    if (serviceRequest.isAdd()) {
      await entityService.addEntity(entity.value).then(response => {
        entity.value = response
        flag = true;
      })
    } else {
      await entityService.updateEntity(entity.value).then(response => {
        entity.value = response
        flag = true;
      })
    }
    if (flag) {
      await fetchEntities();
      router.go(-1)
    }
  }

  async function saveChild() {
    let flag = false;
    if (serviceRequest.isAdd()) {
      await entityService.addEntity(equipChild.value).then(response => {
        equipChild.value = response
        flag = true;
      })
    } else {
      await entityService.updateEntity(equipChild.value).then(response => {
        equipChild.value = response
        flag = true;
      })
    }
    if (flag) {
      await fetchEquipChildren();
      router.go(-1)
    }
  }

  async function deleteEntity(id: number = -1) {
    await entityService.deleteEntity(id).then(async () => {
      await fetchEntities();
      router.go(-1);
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function deleteChild(id: number = -1) {
    await entityService.deleteEntity(id).then(async () => {
      await fetchEquipChildren();
      router.go(-1);
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function fetchEquipParents(): Promise<void> {
    await entityService.fetchEquipParents().then(response => {
      equipParents.value = response
    })
  }

  async function fetchEquipChildren() {
    await entityService.fetchChildren(entity.value.id).then(response => {
      equipChildren.value = response
    })
  }


  return {
    entities,
    entity,
    cardData,
    cardFunction,
    cardFuncChild,
    serviceRequest,
    equipTypeList,
    equipModelList,
    equipTypeListForEntity,
    equipModelListForEntity,
    equipTypeListForChild,
    equipModelListForChild,
    pageRequest,
    headerForm: computed(() => {
      return serviceRequest.isAdd() ? "Equip | Add" : "Equip | Update"
    }),
    isGroupAccounting,
    equipChildren,
    equipChild,
    editForm,
    detailForm,
    fetchEntities,
    fetchEntity,
    editChildForm,
    saveEntity,
    fetchEquipParents
  }
})