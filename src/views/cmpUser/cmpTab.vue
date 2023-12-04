<template>
  <div class="content-wrap">
    <Title 
      :level="2" 
      pageTitle="탭 메뉴"
    />
    <div class="discription-text">
      탭 메뉴에 대한 가이드입니다.(작업)
    </div>
    <TabsCmp :tabs="tabsList" :selected="selected" @click:selectIndex="selectTab">
        <template #content>
          <div class="tab-cont__wrap" :class="{'active': curContent}">로운 도서 미리내 감또개 여우비 포도 포도 소록소록 도서관 아련 소솜 바람꽃 여우별 다솜 가온누리 나비잠 나비잠 안녕 소솜 나비잠 아련 아리아 다솜 도서 아리아 사과 여우별 가온해 예그리나 감또개 아슬라 아련 도서관 바람꽃 별하 그루잠 도담도담 바나나 도서관 별하 달볓 사과 함초롱하다 도서 가온누리 달볓 아리아 달볓 그루잠 가온누리.</div>
          <div class="tab-cont__wrap">컴포넌트 호출</div>
          <div class="tab-cont__wrap">3</div>
        </template>
    </TabsCmp>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const tabsList = ref([
  {
    title: 'tab1',
    icon: '',
    content: '로운 도서 미리내 감또개 여우비 포도 포도 소록소록 도서관 아련 소솜 바람꽃 여우별 다솜 가온누리 나비잠 나비잠 안녕 소솜 나비잠 아련 아리아 다솜 도서 아리아 사과 여우별 가온해 예그리나 감또개 아슬라 아련 도서관 바람꽃 별하 그루잠 도담도담 바나나 도서관 별하 달볓 사과 함초롱하다 도서 가온누리 달볓 아리아 달볓 그루잠 가온누리.'
  },
  {
    title: 'tab2',
    icon: '',
    content: '로운 도서 미리내 감또개 여우비 포도 포도 소록소록 도서관 아련 소솜 바람꽃 여우별 다솜 가온누리 나비잠 나비잠 안녕 소솜 나비잠 아련 아리아 다솜 도서 아리아 사과 여우별 가온해 예그리나 감또개 아슬라 아련 도서관 바람꽃 별하 그루잠 도담도담 바나나 도서관 별하 달볓 사과 함초롱하다 도서 가온누리 달볓 아리아 달볓 그루잠 가온누리.'
  },
  {
    title: 'tab3',
    icon: '',
    content: '로운 도서 미리내 감또개 여우비 포도 포도 소록소록 도서관 아련 소솜 바람꽃 여우별 다솜 가온누리 나비잠 나비잠 안녕 소솜 나비잠 아련 아리아 다솜 도서 아리아 사과 여우별 가온해 예그리나 감또개 아슬라 아련 도서관 바람꽃 별하 그루잠 도담도담 바나나 도서관 별하 달볓 사과 함초롱하다 도서 가온누리 달볓 아리아 달볓 그루잠 가온누리.'
  }
])
const selected = ref(0)
const curContent = ref(selected.value)

const selectTab = (index) => {
  selected.value = index
  console.log(selected)
  curContent.value = selected.value
}

</script>

<style>

</style>