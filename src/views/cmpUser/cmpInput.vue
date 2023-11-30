<template>
  <div class="content-wrap">
    <Title 
      :level="2" 
      pageTitle="FORM 요소에 대한 가이드"
    />
    <div class="discription-text">
      폼 요소에 대한 가이드 입니다.<br>
      일부는 element ui plus 를 기반으로 합니다.
    </div>
    <Title 
      :level="3" 
      pageTitle="INPUT "
    />
    <div class="guide-context">

    </div>
    <Title 
      :level="3" 
      pageTitle="Select"
    />
    <div class="guide-context">
        <MySelect
           label="셀렉트박스 컴포넌트" 
           searchable="searchable"                
          :filteredOption="options"
          @selectedOption="changeSelected"
         />
         <p>선택된 항목 : {{ selected  }}</p>
    </div>

  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onBeforeMount, onUnmounted } from 'vue'
const options = [
  {
    title: '카테고리명1',
    code: '카테고리명1',
  },
  {
    title: '카테고리명2',
    code: '카테고리명2',
  },
  {
    title: '카테고리명3',
    code: '카테고리명3',
  },
  {
    title: '카테고리명4',
    code: '카테고리명4',
  }
]
const selected = ref('')
const changeSelected = (option) => {
  console.log('왔니?', option)
  selected.value = option.title
}
</script>

<style lang="scss">
.discription-text {
  margin: 10px 0 30px;
  font-size: 15px;
}
.guide-context {
  margin-top: 30px;
}
</style>