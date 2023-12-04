<template>
  <div class="tab__wrap">
    <ul
      class="tab-list"
      role="tablist"
    >
      <li        
        class="tab-item"    
        v-for="(tab, index) in tabs"
        :key="index"    
        :class="[selected === index ? 'active' : '']"    
        @click="handleSelected(index)"             
      >
          <a href="#" role="button">
            {{ tab.title }}
          </a>
      </li>
    </ul>
    <div class="tab-contents">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  selected: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['click:selectIndex'])
const handleSelected = (index) => {  
  emit('click:selectIndex', index)
  console.log(index)
};
</script>
