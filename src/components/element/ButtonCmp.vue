<template>
  <button
    type="button"
    class="btn"
    :class="[iconOnly ? 'btn-' + iconName : [types, size, iconName, activeClass]]"
    :disabled="disabled"    
    @mousedown="$emit('mousedown')"
  >
    <i
      v-if="iconName !== ''"
      :class="iconName"    
    >
      <span v-if="iconOnly" class="irtext">{{ buttonName }}</span>
    </i>
    <template v-if="!iconOnly">
      {{ buttonName }}
    </template>    
    <!-- <slot></slot> -->
  </button>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  buttonName: {
    type: String,
    default: '버튼명 미지정'
  },
  types: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  iconName: {
    type: String,
    default: ''
  },
  iconOnly: {
    type: Boolean,
    default: false
  },
  activeClass: {
    type: String,
    default: ''
  }
})
</script>