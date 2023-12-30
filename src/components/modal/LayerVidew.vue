<template>
    <div class="layer__wrap"
        :class="{mask: mask}"
        :style="{
            width: width ? width : '',
            height: height ? height : '',
            top: top ? top : '',
            left: left ? left : '',
            right: right ? right : '',
            bottom: bottom ? bottom : ''
        }"
    >
        <div class="layer__container"
          :tabindex="tabindex ? '0' : ''"
        >
            <slot name="layerContent">
            </slot>
            <MyBtn
                buttonName="닫기" 
                iconOnly="true"  
                iconName="close-layer"                   
                @click="$emit('closeLy')"      
                v-if="closeBtn"            
            >
            <template #svg-icon>                
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729"/>
                </svg>
            </template>
            </MyBtn>
        </div>
    </div>
</template>

<script setup>
import { defineProps, onBeforeUnmount, onMounted, ref } from 'vue'

const tabindex = ref(false)

const props = defineProps({
  mask: {
    type: Boolean,
    default: false
  },    
  width: {
    type: Number,
    default: '100%'
  },
  height: {
    type: Number,
    default: '100%'
  },  
  left: {
    type: Number,
    default: ''
  },  
  right: {
    type: Number,
    default: ''
  },   
  top: {
    type: Number,
    default: ''
  },        
  bottom: {
    type: Number,
    default: ''
  },
  closeBtn: {
    type: Boolean,
    default: true
  }      
}) 
onMounted(() => {
  document.body.classList.add('modal-open')
  document.documentElement.classList.add('modal-open')
  tabindex.value = true
})
onBeforeUnmount(() => {
  document.body.classList.remove('modal-open')
  document.documentElement.classList.remove('modal-open')
  tabindex.value = false
})
</script>

<style>

</style>