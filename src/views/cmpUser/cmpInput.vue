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
    <div class="guide-context" style="padding-bottom: 50px;">
      <MyInput >
        <template #input>
          <InputEl
            label="아이디 입력"
            v-model="userName"            
            placeholder="아이디를 입력하세요"
            errorMsg="아이디를 입력하세요"            
          />
        </template>
      </MyInput>
      <p>입력한 값 실시간 반영: {{ userName }}</p>
      <MyInput >
        <template #input>
          <input-el
            types="password"
            placeholder="비밀번호를 입력하세요"
          />
        </template>
      </MyInput>      
    </div>
    <Title 
      :level="3" 
      pageTitle="Select"
    />
    <div class="guide-context" style="padding-bottom: 50px;">
        <VSelect
            label="항목 선택"
            v-model="vselected"
            :options="options"
            placeholder="항목 선택 선택하세요"
            errorMsg="필수 선택입니다."           
        />
        <p>선택: {{ vselected }}</p>
    </div>    
    <Title 
      :level="3" 
      pageTitle="커스텀 Select"
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
// import { isEmpty } from '@/utils/check'
const userName = ref('')

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
const vselected = ref('선택하세요')
const selected = ref('')
const changeSelected = (option) => {  
  selected.value = option.title
}
const onChangeNumber = (value) => {
  console.log('수신정보', value)
  userName.value = value
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