<script setup>
import UnitOfGood from "@/components/goods/UnitOfGood.vue";
import AddGood from "@/components/goods/AddGood.vue";

import {inject, onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref} from "vue";
import axios from "axios";

const showLoading = inject("showLoading")
const hideLoading = inject("hideLoading")

const unitOfGoods = ref(null);

const getUnitOfGoodData = () => {
  showLoading();
  axios({
    method: 'GET',
    url: 'http://127.0.0.1/api/v1/goods/unit-of-goods',
  }).then(res => {
    if (res.status === 200) {
      unitOfGoods.value = res.data.data;
    }
    hideLoading()
  }).catch(() => {
    hideLoading()
  })
}

getUnitOfGoodData();
</script>

<template>
  <div class="container">
    <left-nav/>
    <div class="content">
      <unit-of-good :unit-of-goods="unitOfGoods" @get-unit-of-good-data="getUnitOfGoodData"/>
      <AddGood :unitOfGoods="unitOfGoods"/>
    </div>
  </div>
</template>

<style>

.content {
  flex: 1;
  width: 85%;
  padding: 20px;
}

body {
  overflow: auto !important;
}

label.text-form {
  font-weight: bold;
}

.add-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.input-box {
  margin-left: 10px;
}

.text-form {
  vertical-align: middle;
}

.input-block {
  display: inline-block;
}

.form {
  padding-right: 100px;
  border: 1px solid #e9e5dd;
  border-radius: 30px;
  padding: 20px 50px;
}


</style>
