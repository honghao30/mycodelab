<template>
  <transition
      name="fade"
  >
    <div
    class="modal__wrap"
    >
      <div class="overlay-mask" @click="$emit('closeModal')"></div>
      <div
          class="modal__content"
          :style="{ width: modalSize + 'px' }"
      >
        <div class="modal__content--inner">
          <template v-if="modalTitle !== ''">
            <div class="modal__content--title">
              {{ modalTitle }}
            </div>
          </template>
          <div class="modal__content--body">
            <slot name="content"></slot>
          </div>
          <div class="modal__content--footer">
            <slot name="footer"></slot>
          </div>
        </div>

      </div>        
    </div>
  </transition>
</template>

<script setup>
import { defineProps, onBeforeUnmount, onMounted } from 'vue'

const props = defineProps({
  modalTitle: {
    type: String,
    default: ''
  },
  modalSize: {
    type: Number,
    default: ''
  }
}) 

onMounted(() => {
  document.body.classList.add('modal-open')
  document.documentElement.classList.add('modal-open')
})
onBeforeUnmount(() => {
  document.body.classList.remove('modal-open')
  document.documentElement.classList.remove('modal-open')
})
</script>
