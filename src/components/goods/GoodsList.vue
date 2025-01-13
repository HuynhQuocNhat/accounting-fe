<script setup>
import VueTableLite from "vue3-table-lite";
import {computed, inject, reactive, ref, watch} from "vue";
import LoadingComponent from "@/components/common/LoadingComponent.vue";
import UnitOfGoodsSelect from "@/components/common/unit-of-goods/unit-of-goods-select.vue";

import axios from "axios";
import Alert from "@/components/Modal/alert.vue";
import AddDataModal from "@/components/Modal/AddDataModal.vue";
import {Modal} from 'bootstrap'

const editRows = ref([])
const goodsDelete = reactive({
  id: '',
  index: ''
})

const props = defineProps({
  searchParams: Object,
  searchTriggered: Boolean,
})

const emits = defineEmits([
  "resetSearchTrigger",
  "disableSearch",
  "errorAlert"
])

const goodsData = ref([])
const totalData = ref(0)
const pageTable = ref(1)
const pageSizeTable = ref(25)

const showLoading = inject("showLoading")
const hideLoading = inject("hideLoading")
const alertObj = inject("alertObj")
const setAlertMessage = inject("setAlertMessage")

const getGoodsData = async (offset = 0, limit = 25, order, sort, page, pageSize) => {
  const pageParams = {
    offset: offset,
    limit: limit,
    order: order,
    sort: sort,
  }

  pageTable.value = page
  pageSizeTable.value = pageSize

  const params = {...props.searchParams, ...pageParams}
  table.isLoading = true

  emits("disableSearch", true)

  await axios({
    "method": "GET",
    "url": "http://127.0.0.1/api/v1/goods/",
    "params": params
  }).then((res) => {
    if (res.status === 200) {
      const dataList = res.data.data.data
      let count = 0
      goodsData.value = []
      totalData.value = res.data.data.total
      dataList.forEach((data) => {
        goodsData.value.push({
          numerical_order: offset + (++count),
          id: data.id,
          code: data.code,
          name: data.name,
          unit_of_goods: {
            id: data.unit_of_good.id,
            name: data.unit_of_good.name,
          }
        })
      })
    }
    emits("disableSearch", false)
  })
}

const table = reactive({
  isLoading: true,
  isSlotMode: true,
  columns: [
    {
      label: "STT",
      field: "numerical_order",
      width: "0.5%",
      sortable: true,
      headerStyles: {
        textAlign: "center"
      },
      columnStyles: {
        textAlign: "center"
      }
    },
    {
      label: "Mã Hàng",
      field: "code",
      width: "10%",
      sortable: true,
      isKey: true,
      headerStyles: {
        textAlign: "center"
      },
    },
    {
      label: "Tên Hàng",
      field: "name",
      width: "10%",
      sortable: true,
      headerStyles: {
        textAlign: "center"
      },
    },
    {
      label: "ĐVT",
      field: "unit_of_goods",
      width: "3%",
      sortable: true,
      headerStyles: {
        textAlign: "center"
      },
    },
    {
      label: "",
      field: "action",
      width: "3%",
      sortable: true,
      columnStyles: {
        textAlign: "center",
      },
    },
  ],
  rows: computed(() => {
    return goodsData.value
  }),
  pageOptions: [
    {
      value: 25,
      text: 25,
    },
    {
      value: 50,
      text: 50,
    },
    {
      value: 100,
      text: 100,
    },
    {
      value: 250,
      text: 250,
    },
    {
      value: 500,
      text: 500,
    },
  ],
  page: computed(() => {
    return pageTable.value
  }),
  pageSize: computed(() => {
    return pageSizeTable.value
  }),
  messages: {
    pagingInfo: "Danh Sách: {0}-{1} Tổng: {2}",
    pageSizeChangeLabel: "Số Hàng: ",
    gotoPageLabel: "Trang: ",
    noDataAvailable: "Chưa Có Hàng",
  },
  totalRecordCount: computed(() => {
    return goodsData.value.length
  }),
  total: computed(() => {
    return totalData.value
  }),
  sortable: {
    order: "code",
    sort: "asc",
  },
});

const changeRowToEdit = (row) => {
  if (!editRows.value[row.value.id]) {
    editRows.value[row.value.id] = {
      "code": row.value.code,
      "name": row.value.name,
      "unit_id": row.value.unit_of_goods.id,
      "unit_name": row.value.unit_of_goods.name
    }
  }
}

const isDisableUpdate = (row) => {
  if (!editRows.value[row.value.id]) {
    return true
  } else if (
    editRows.value[row.value.id].code
    && editRows.value[row.value.id].name
    && editRows.value[row.value.id].unit_id
    && (editRows.value[row.value.id].code !== row.value.code
    || editRows.value[row.value.id].name !== row.value.name
    || editRows.value[row.value.id].unit_id !== row.value.unit_of_goods.id)
  ) {
    return false
  }

  return true
}

getGoodsData()

watch(() => props.searchTriggered, () => {
  if (props.searchTriggered) {
    getGoodsData()
    pageSizeTable.value = 25
    pageTable.value = 1
    emits("resetSearchTrigger")
  }
})

const modalObj = reactive({
  title: '',
  content: '',
  isShowOk: true,
  type: null
})

const updateGoods = async (row) => {
  const data = {
    'id': row.value.id,
    'code': editRows.value[row.value.id].code,
    'name': editRows.value[row.value.id].name,
    'unit_of_good_id': editRows.value[row.value.id].unit_id,
  }

  showLoading()

  await axios({
    method: "PATCH",
    url: "http://127.0.0.1/api/v1/goods/" + data.id,
    data: data
  }).then((res) => {
    row.value.code = editRows.value[row.value.id].code
    row.value.name = editRows.value[row.value.id].name
    row.value.unit_of_goods.id = editRows.value[row.value.id].unit_id
    row.value.unit_of_goods.name = editRows.value[row.value.id].unit_name
    delete editRows.value[row.value.id]

    hideLoading();
    setAlertMessage("success", res.data.message)
  }).catch((error) => {
    modalObj.title = "Cập Nhật Thất Bại!!!"
    modalObj.isShowOk = false
    modalObj.content = error.response.data.errors

    const modal = new Modal(document.getElementById("exampleModal"))
    modal.show();
    hideLoading();
  })
}

const confirmDeleteGoods = (row) => {

  goodsDelete.id = row.value.id
  goodsDelete.index = row.index

  console.log(goodsDelete)
  console.log(goodsData.value)

  modalObj.title = "Xóa Hàng ?"
  modalObj.isShowOk = true
  modalObj.content = `Hoa muốn xóa hàng ${row.value.name} ?`
  const modal = new Modal(document.getElementById("exampleModal"))
  modal.show();
}

const deleteGoods = async () => {
  showLoading()
  document.querySelector('button.btn-close').click();
  await axios({
    method: "DELETE",
    url: "http://127.0.0.1/api/v1/goods/" + goodsDelete.id,
  }).then((res) => {
    if (res.data.status === 200) {console.log(res)
      goodsData.value.splice(goodsDelete.index, 1)
      setAlertMessage("success", res.data.message)
    }
    hideLoading()
  }).catch((error) => {
    hideLoading()
    setAlertMessage("danger", "Bị Lỗi rồi! LH anh fix nghe")
  })
}

</script>

<template>
  <add-data-modal @ok-event="deleteGoods" :is-show-ok="modalObj.isShowOk" :modal="modalObj"/>
  <alert style="margin: 20px 0" v-if="alertObj.type && alertObj.message" :type="alertObj.type" :message="alertObj.message"/>
  <VueTableLite
    :is-loading="table.isLoading"
    :is-slot-mode="table.isSlotMode"
    :columns="table.columns"
    :rows="table.rows"
    :page="table.page"
    :page-size="table.pageSize"
    :total="table.total"
    :sortable="table.sortable"
    :pageOptions="table.pageOptions"
    :messages="table.messages"
    @do-search="getGoodsData"
    @is-finished="table.isLoading = false">

    <!--  Goods-Code Slot  -->
    <template #code="row">
      <template v-if="editRows[row.value.id]">
        <input type="text" v-model="editRows[row.value.id].code" class="input-box text-form"><br>
      </template>
      <template v-else>
        <span>{{ row.value.code }}</span>
      </template>
    </template>

    <!--  Goods-Name Slot  -->
    <template #name="row">
      <template v-if="editRows[row.value.id]">
        <input type="text" v-model="editRows[row.value.id].name" class="input-box text-form"><br>
      </template>
      <template v-else>
        <span>{{ row.value.name }}</span>
      </template>
    </template>

    <!--  Unit Of Goods Slot  -->
    <template #unit_of_goods="row">
      <template v-if="editRows[row.value.id]">
        <suspense>
          <template #default>
            <UnitOfGoodsSelect v-model:unit-of-goods-id="editRows[row.value.id].unit_id"
              @selected-unit-name="(unitName) => editRows[row.value.id].unit_name = unitName"
            />
          </template>
          <template #fallback>
            <LoadingComponent/>
          </template>
        </suspense>
      </template>
      <template v-else>
        <span>{{ row.value.unit_of_goods.name }}</span>
      </template>
    </template>


    <!--  Action Slot  -->
    <template #action="row">

      <template v-if="editRows[row.value.id]">
        <button data-type="add" :data-index="row.index" :data-goods-id="row.value.id" class="add-button button"
                :disabled="isDisableUpdate(row)"
                @click="updateGoods(row)">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
          </svg>
        </button>
        <button data-type="cancel" :data-goods-id="row.value.id" class="button"
                @click="delete editRows[row.value.id]">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </button>
      </template>

      <template v-else>
        <button data-type="update" :data-goods-id="row.value.id" class="button"
                @click="changeRowToEdit(row)">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
               class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>\n' +
            <path fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>\n' +
          </svg>
        </button>
        <button data-type="delete" data-goods-id="row.value.id" class="button delete-button"
          @click="confirmDeleteGoods(row)">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>\n' +
          </svg>
        </button>
      </template>

    </template>

  </VueTableLite>
</template>

<style>

.vtl.vtl-card {
  margin-top: 30px;
}

table.vtl-table {
  max-height: 700px;
  overflow-y: auto;
}

span.vtl-paging-page-label {
  margin-left: 10px;
}
</style>
