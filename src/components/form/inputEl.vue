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
            :value="modelValue"                 
            :maxlength="maxlength"                                 
            @input="$emit('update:modelValue', $event.target.value)"    
            @focusout="$emit('update:modelValue', $event.target.value)" 
         >
         <MyBtn                            
            buttonName="삭제"
            iconOnly="true"
            iconName="btn-close-circle"     
            v-if="modelValue"                        
            @click="ClearInput($event)"                                                                      
        >  
        </MyBtn>   
        <div class="guide-text__input--bottom" v-if="guideMsg">                  
            <p class="guide-text" v-for="msg in guideMsg" :key="msg">{{ msg }}</p>            
        </div>                
        <div class="guide-text__input--bottom" v-if="errorMsg">                  
            <p class="error-text">{{ errorMsg }}</p>            
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, watch, nextTick,onBeforeMount, onUnmounted } from 'vue'
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
  maxlength: {
    type: Number,
    default: ''
  },  
  guideMsg: {
    type: Array,
    default: ''
  },  
  isFailEl: {
    type: Boolean,
    default: ''
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  autoComplete: {
    type: Boolean,
    default: 'false'
  },
  errorMsg: {
    type: String,
    default: ''
  },  
  required: {
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
const autofocus = ref(false)

const randomNumber = () => {
  let N = 1000000;
  let M = 1;
  let tt = Math.random()*N;
  return Math.floor(tt)+M;
}
randomId.value = randomNumber()

const ClearInput = (event) => {  
  emit('update:modelValue')    
}
watch(props, (newProps) => {
  if (newProps.errorMsg !== undefined) {    
    console.log(newProps.errorMsg)    
  }
})
onMounted(() => {
  console.log(props.autofocus)
})
</script>

<style>
.error-text {color: red;}
</style>