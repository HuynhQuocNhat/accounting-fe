<script setup>
import {inject, reactive, ref, watch} from "vue";
import axios from "axios";

import AddDataModal from "@/components/Modal/AddDataModal.vue";

const unitOfGoods = ref(null);
const isShowUpdateUnitOfGood = ref(false);

const unitOfGoodData = reactive({
  nameUpdate: '',
  currentUnit: {
    id: '',
    name: ''
  },
  newName: ''
})

const alertObj = reactive({
  type: '',
  message: ''
})

const modalObj = reactive({
  title: '',
  content: '',
  type: null
})

const props = defineProps({
  unitOfGoods: Array
})

const showLoading = inject("showLoading")
const hideLoading = inject("hideLoading")
const emits = defineEmits("getUnitOfGoodData");

const addUnitOfGood = async () => {
  showLoading();
  await axios({
    method: "POST",
    url: 'http://127.0.0.1/api/v1/goods/unit-of-goods',
    data: {unit: {...[unitOfGoodData.newName]}}
  }).then(async (res) => {
    emits("getUnitOfGoodData");
    showAlert("success", `Đã thêm ĐVT ${unitOfGoodData.newName} thành công!`)
    hideLoading()
  }).catch((res) => {
    if (res.response.status === 422) {
      showAlert("danger", res.response.data.data)
    } else {
      showAlert("danger", 'Something Wrong !!!')
    }
    hideLoading()
  })
}

watch(() => props.unitOfGoods, () => {
  changeUnitOfGoodEvent()
}, {deep: true})

const updateUnitOfGood = async () => {
  showLoading();
  await axios({
    method: "PATCH",
    url: `http://127.0.0.1/api/v1/goods/unit-of-goods/${unitOfGoodData.currentUnit.id}`,
    data: {name: unitOfGoodData.newName}
  }).then(async (res) => {
    emits("getUnitOfGoodData")
    showAlert("success", `Đã sửa ${unitOfGoodData.currentUnit.name} -> ${unitOfGoodData.newName} thành công`)
    hideLoading();
  }).catch((res) => {
    if (res.response.status === 422) {
      showAlert("danger", res.response.data.message)
    } else {
      showAlert("danger", "Something Wrong !!!")
    }
    hideLoading()
  })
}

const removeUnitOfGood = async () => {
  showLoading();
  await axios({
    method: "DELETE",
    url:`http://127.0.0.1/api/v1/goods/unit-of-goods/${unitOfGoodData.currentUnit.id}`,
  }).then(async () => {
    emits("getUnitOfGoodData")
    showAlert("success", `Đã xóa ĐVT "${unitOfGoodData.currentUnit.name}"`)
    unitOfGoodData.currentUnit.id = ''
    unitOfGoodData.currentUnit.name = unitOfGoodData.newName = ''
    hideLoading()
  }).catch((res) => {
    if (res.response.status === 422) {
      showAlert("danger", res.response.data.message)
    } else {
      showAlert("danger", "Something Wrong !!!")
    }
    hideLoading()
  })
}

const changeUnitOfGoodEvent = () => {
  if (unitOfGoodData.currentUnit.id) {
    let unit = props.unitOfGoods.find(obj => {
      return obj.id === unitOfGoodData.currentUnit.id;
    })
    unitOfGoodData.currentUnit.name = unitOfGoodData.newName = unit.name
  }
}

watch(() => props.unitOfGoods, () => {
  changeUnitOfGoodEvent()
}, {deep: true})

const handleUnitOfGoodData = () => {
  if (modalObj.type === 0) {
    addUnitOfGood();
  } else if (modalObj.type === 1) {
    updateUnitOfGood();
  } else {
    removeUnitOfGood();
  }
  document.querySelector('button.btn-close').click();
}

const showAlert = (type, message) => {
  alertObj.type = type;
  alertObj.message = message;
  setTimeout(() => {
    alertObj.type = '';
    alertObj.message = null;
  }, 3000)
}
</script>

<template>
  <form class="form">
    <div class="alert-block"></div>
    <alert v-if="alertObj.type && alertObj.message" :type="alertObj.type" :message="alertObj.message"/>
    <div class="add-block">
      <div class="input-block">
        <div class="unit-of-good-current">
          <label class="text-form" for="unit-of-good-selector">Đơn Vị Tính</label>
          <select id="unit-of-good-selector" class="drop-down input-box text-form" @change="changeUnitOfGoodEvent"
                  v-model="unitOfGoodData.currentUnit.id">
            <option v-for="unitOfGood in props.unitOfGoods" :key="unitOfGood.id" :value="unitOfGood.id">
              {{ unitOfGood.name }}
            </option>
          </select>
          <input @click="isShowUpdateUnitOfGood = !isShowUpdateUnitOfGood"
                 class="unit-of-good-event button" type="button"
                 :value="isShowUpdateUnitOfGood ? 'Ẩn Cập Nhật' : 'Cập Nhật ĐVT'">
        </div>
        <div v-if="isShowUpdateUnitOfGood" class="unit-of-good-update">
          <input type="text" placeholder="ĐVT" class="w-input input-box text-form" v-model="unitOfGoodData.newName"><br>
          <div class="button-block">
            <input
              @click="modalObj.type = 0; modalObj.title = 'Thêm ĐVT'; modalObj.content = `Hoa có muốn thêm ĐVT: ${unitOfGoodData.newName} ?`"
              :disabled="!unitOfGoodData.newName"
              :class="unitOfGoodData.newName ? 'add-button' : ''"
              class="button" type="button" value="Thêm" data-bs-toggle="modal"
              data-bs-target="#exampleModal">
            <input
              @click="modalObj.type = 1; modalObj.title = 'Sửa ĐVT'; modalObj.content=`Hoa có muốn sửa ĐVT: ${unitOfGoodData.currentUnit.name} -> ${unitOfGoodData.newName} ? `"
              :disabled="!unitOfGoodData.currentUnit.id"
              :class="unitOfGoodData.currentUnit.id ? 'update-button' : ''"
              class="button" type="button" value="Sửa" data-bs-toggle="modal"
              data-bs-target="#exampleModal">
            <input
              @click="modalObj.type = 2; modalObj.title = 'Xoá ĐVT'; modalObj.content=`Hoa có muốn xóa ĐVT: ${unitOfGoodData.currentUnit.name} ?`"
              :disabled="!unitOfGoodData.currentUnit.id"
              :class="unitOfGoodData.currentUnit.id ? 'delete-button' : ''"
              class="button" type="button" value="Xóa" data-bs-toggle="modal"
              data-bs-target="#exampleModal">
          </div>
        </div>
      </div>
    </div>
  </form>
  <add-data-modal :modal="modalObj" @handle-unit-of-good-data="handleUnitOfGoodData"/>
</template>

<style scoped>


.unit-of-good-event {
  margin-left: 20px;
  width: 130px;
  height: 45px;
}

.unit-of-good-update {
  margin-top: 20px;
  padding-left: 85px;
}

.unit-of-good-update input {
  font-size: 13px;
}

.unit-of-good-update input.button {
  width: 70px;
}

.unit-of-good-update .button-block {
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  width: 62%;
  margin-top: 10px;
}
</style>
