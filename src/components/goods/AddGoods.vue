<script setup>
import UnitOfGoodForm from "@/components/goods/UnitOfGoodForm.vue";
import AddGoodsForm from "@/components/goods/AddGoodsForm.vue";

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
  <unit-of-good-form :unit-of-goods="unitOfGoods" @get-unit-of-good-data="getUnitOfGoodData"/>
  <add-goods-form :unitOfGoods="unitOfGoods"/>
</template>

<style>

</style>
