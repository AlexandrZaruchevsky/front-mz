import { ref, computed, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { CardData, CardFunction, PageRequest, SelectOption } from '@/model/Page'
import type { ServiceRequest } from '@/model/ServiceRequest';
import EntityService from '@/services/EntityService';
import router from '@/router';
import { Organization, type OrganizationPage } from '@/model/Organization';
import { Employee, EmployeePage } from '@/model/Employee';
import type { DepV1 } from '@/model/DepV1';
import EmplService from '@/services/EmplService';
import DepService from '@/services/DepService';
import type { POF } from '@/model/POF';
import type { Position } from '@/model/Position';

export const useEmplStore = defineStore('emplStore', () => {

  const page = ref<EmployeePage>(new EmployeePage());
  const entityService = new EmplService("employees");
  const serviceRequest = reactive<ServiceRequest>(entityService.getServiceRequest());
  const orgService = new EntityService<Organization, OrganizationPage>("organizations");
  const depService = new DepService("departments");

  const pageRequest = reactive<PageRequest>(new PageRequest(0, 20, "fio"));
  const entities = computed<Array<Employee>>(() => page.value.content);
  const entity = ref<Employee>(new Employee());

  const orgList = ref<Array<Organization>>(new Array);
  const orgId = ref<number>(-1);
  const org = ref<Organization>(new Organization());

  const depList = computed<Array<DepV1>>(() => org.value.departments);
  const popList = computed<Array<POF>>(() => org.value.pofs);
  const posList = computed<Array<Position>>(() => org.value.positions);

  const pageSizeList = [
    new SelectOption(10, 10),
    new SelectOption(20, 20),
    new SelectOption(50, 50)
  ]

  const sortByList = [
    new SelectOption("fio", "Ф.И.О."),
    new SelectOption("kspd", "Телефон"),
  ]

  const addEntity = async () => {
    // fetchAllDepsByOrgId();
    router.push({ path: "/admin/employees/add" })
  }

  const search = async () => {
    pageRequest.pageCurrent = 0;
    fetchEntities()
  }

  const setSearchText = async (searchText: string = "") => {
    pageRequest.search = searchText;
  }

  const changeSort = async (sort: string = "fio") => {
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
        router.push({ name: "Employees" })
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
      entity.value = new Employee();
    }
  }

  async function fetchEntity(id: Number = -1) {
    await entityService.getEntity(id).then(async response => {
      entity.value = response
      if (orgId.value == -1 && entity.value.depId > 0) {
        await depService.getEntity(entity.value.depId).then(dep => {
          orgId.value = dep.orgId > 0 ? dep.orgId : -1
        })
      }
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
      router.push({ name: 'Employees' })
    }
  }

  async function deleteEntity(id: number = -1) {
    await entityService.deleteEntity(id).then(async () => {
      await fetchEntities();
      router.push({ name: 'Employees' })
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function fetchAllOrgs() {
    if (orgList.value.length == 0) {
      await orgService.getAllEntities().then(response => {
        orgList.value = response;
      })
    }
  }

  async function fetchOrgById(orgId: number) {
    await orgService.getEntity(orgId).then(resp => {
      org.value = resp
    })
  }

  watch(orgId, () => {
    if (orgId.value == -1) {
      org.value = new Organization();
    } else {
      fetchOrgById(orgId.value)
    }
  })

  return {
    cardData,
    cardFunction,
    entities,
    entity,
    serviceRequest,
    orgId,
    orgList,
    depList,
    popList,
    posList,
    fetchEntities,
    setAdd,
    fetchEntity,
    saveEntity,
    deleteEntity,
    fetchAllOrgs,
  }

})
