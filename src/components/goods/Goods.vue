<script setup>
import SearchGoods from "@/components/goods/SearchGoods.vue";
import GoodsList from "@/components/goods/GoodsList.vue";
import {ref} from "vue";

const searchParams = ref({})
const searchTriggered = ref(false)
const isDisable = ref(false)

</script>

<template>
  <search-goods
    @search-triggered="(params) => {
          searchParams = params
          searchTriggered = true
        }"
    :is-disable="isDisable"
  />
  <goods-list
    :search-params="searchParams"
    :search-triggered="searchTriggered"
    @reset-search-trigger="searchTriggered = false"
    @disable-search="(isDis) => isDisable = isDis"
  />
</template>

<style scoped>

</style>
