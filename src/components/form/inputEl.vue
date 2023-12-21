<template>
    <div class="input">
        <label :for="randomId" v-if="label">{{ label }}
          <span v-if="required" :class="required">*</span>
        </label>
        <input 
            :type="types"                                        
            :placeholder="placeholder" 
            :title="placeholder" 
            :id="randomId"      
            :ref="refInfo"        
            :value="modelValue"     
            @input="$emit('update:modelValue', $event.target.value)"    
            @focusout="checkValue($event)" 
         >
         <MyBtn                            
            buttonName="검색어 삭제"
            iconOnly="true"
            iconName="btn-close-circle"     
            v-if="modelValue"                        
            @click="ClearInput($event)"                                                                      
        >  
        </MyBtn>           
        <div class="guide-text__input--bottom" v-if="required && errorMsgCheck">                  
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
  refInfo: {
    type: String,
    default: ''
  },
  guideMsg: {
    type: Array,
    default: ''
  },  
  autoComplete: {
    type: Boolean,
    default: ''
  },
  videoList: {
    type: Object,
    default: () => ({})
  },
  errorMsg: {
    type: String,
    default: ''
  },  
  required: {
    type: Boolean,
    default: false
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

const errorMsgCheck = ref(null)

const checkValue = (event) => {
  if (event.target.value === '') {
    errorMsgCheck.value = true
  } else {
    errorMsgCheck.value = false
  }
}
const ClearInput = (event) => {  
  emit('update:modelValue')    
}
</script>

<style>
.error-text {color: red;}
</style>