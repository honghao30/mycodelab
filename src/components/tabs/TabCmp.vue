<template>
  <div class="tab__wrap">
    <ul
      class="tab-list"
      role="tablist"
    >
      <li        
        class="tab-item"    
        v-for="(title, index) in titles"
        :key="index"        
        :class="[index === activeIndex ? 'active' : '']"    
        @click="activeIndex = index"         
      >
          <a href="#" role="button" v-text="title"></a>
      </li>
    </ul>
    <div class="tab-contents">
      <component :is="activeTab"></component>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'

const props = defineProps({
  titles: {
    type: Array,
    default: () => [],
  },
  tabs: {
    type: Array,
    default: () => [],
  },
})

const activeTab = computed(() => props.tabs[activeIndex.value])
const activeIndex = ref(0)
</script>
