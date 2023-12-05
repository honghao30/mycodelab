<template>
  <div class="dropdown" v-click-outside="onClickOutside">
    <a role="button"
       class="dropdown__trigger"
       :title="label"
       @click="toggleSelect"><span>{{ selectedOption }}</span>
    </a>
    <div class="dropdown__menu" v-if="isOpen">
      <div class="search__area" v-if="searchable">
        <span class="input search"><input type="text" :placeholder="searchPlaceholder" v-model="searchWord" @input="searchWord=$event.target.value"/></span>
      </div>
      <ul class="drodown__option">
        <li  v-for="(option, i) in filteredOption" :key="i" @click="selectOption(option)" :data-value="option.title">
          <span class="option-name">
            {{option.title}}
          </span>
          <!-- <span
            class="flag"
            v-if="option.flag"
            :class="[{'done' : option.flag === '승인완료'}, {'ing' : option.flag === '임시저장'}, {'reject' : option.flag === '반려'}]"
          >{{ option.flag }}</span> -->
        </li>
        <li class="no-result" v-if="filteredOption.length === 0">
          검색결과가 없습니다.
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onBeforeMount, onUnmounted } from 'vue'

const props = defineProps({
  filteredOption: {
    type: Array,
    default: ''
  },
  label: {
    type: String,
    default: '선택하세요'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  searchable: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(false)
const searchPlaceholder = ref('검색어를 입력하세요')
const selectedOption = ref('선택하세요')

const emit = defineEmits(["selectedOption"])

const toggleSelect = () => {
  isOpen.value = !isOpen.value
}
const selectOption = (option) => {  
  emit('selectedOption', option)
  console.log(option)  
  selectedOption.value = option.title
  isOpen.value = !isOpen.value
}

const onClickOutside = () => {  
  isOpen.value = false
}
</script>
