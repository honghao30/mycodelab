<template>
    <div class="input">
        <label :for="randomId" v-if="label">{{ label }}</label>
        <input 
            :type="types"                                        
            :placeholder="placeholder" 
            :title="placeholder" 
            :id="randomId"       
            value=""     
            @input="$emit('update:modelValue', $event.target.value)"     
         >
        <div class="guide-text__input--bottom" v-if="errorMsg">                  
            <p class="error-text">{{ errorMsg }}</p>            
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onBeforeMount, onUnmounted } from 'vue'
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '입력하세요'
  },  
  types: {
    type: String,
    default: 'text'
  },  
  guideMsg: {
    type: Array,
    default: ''
  },  
  errorMsg: {
    type: String,
    default: ''
  },  
  modelValue: String,
  disabled: {
    type: Boolean,
    default: false
  }
})

let emit = defineEmits(['update:modelValue'])

const randomId = ref('')

const randomNumber = () => {
  let N = 1000000;
  let M = 1;
  let tt = Math.random()*N;
  return Math.floor(tt)+M;
}
randomId.value = randomNumber()
</script>

<style>
.error-text {color: red;}
</style>