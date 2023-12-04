<template>
  <div>
    <div class="tab-cont__wrap" :class="{'active': curContent}">로운 도서 미리내 감또개 여우비 포도 포도 소록소록 도서관 아련 소솜 바람꽃 여우별 다솜 가온누리 나비잠 나비잠 안녕 소솜 나비잠 아련 아리아 다솜 도서 아리아 사과 여우별 가온해 예그리나 감또개 아슬라 아련 도서관 바람꽃 별하 그루잠 도담도담 바나나 도서관 별하 달볓 사과 함초롱하다 도서 가온누리 달볓 아리아 달볓 그루잠 가온누리.</div>
    <div class="tab-cont__wrap">컴포넌트 호출</div>
    <div class="tab-cont__wrap">3</div>    
  </div>
</template>

<script>
import { ref, defineProps, defineEmits } from 'vue';
const props = defineProps({
    curContent: {
        type: Number,
        default: 0
    }
});
</script>

<style>

</style>