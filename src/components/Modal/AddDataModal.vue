<script setup>

import {computed, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref, watch} from "vue";

const props = defineProps({
  modal: Object,
})

const className = ref('')
const buttonText = ref('OK')

const emit = defineEmits(['handleUnitOfGoodData'])

const okEvent = () => {
  emit("handleUnitOfGoodData");
}

onBeforeUpdate(() => {
  if (props.modal.type === 0) {
    className.value = "add-button"
    buttonText.value = "Thêm"
  } else if (props.modal.type === 1) {
    className.value = "update-button"
    buttonText.value = "Sửa"
  } else {
    className.value = "delete-button"
    buttonText.value = "Xóa"
  }
})

</script>

<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ props.modal.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{ props.modal.content }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary"
                  :class="className"
                  @click="okEvent">
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
