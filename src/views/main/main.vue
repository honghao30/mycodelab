<template>
  <div class="main-container">
    <WeatherCard />
    <luckCard
      v-if="luckCardShow"
     />
    <div class="main-swiper">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="0"     
        :loop="true"
        navigation
        :parallax="true"
        :pagination="{ clickable: true }"             
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide
          v-for="(slide, index) in MainImg"
          :key="index"
        >
          <div class="swiper-inner">
              <div class="inner-text">
                <h3 data-swiper-parallax="-100" data-swiper-parallax-duration="1000">{{ slide.title }}</h3>
                <p data-swiper-parallax="-200" data-swiper-parallax-duration="1500">{{ slide.description }}</p>
              </div>
              <img :src="slide.url" alt="">  
          </div>          
        </swiper-slide>   
      </swiper>
    </div>
    <div class="text-ani__wrap">
        
    </div>
    <div class="movie-card__wrap">
        
    </div>    
    <div class="biz-card__wrap">
        
    </div>    
    <div class="online-request__wrap">
        
    </div>    
  </div>
</template>
<script setup>
import { ref } from 'vue'
import WeatherCard from './components/WeatherCard.vue'
import luckCard from '@/components/minicard/card.vue'
// :autoplay="{
//           delay: 3500,
//           disableOnInteraction: false,
//         }"   
 // import Swiper core and required modules
 import { Navigation, Pagination, A11y, EffectFade, Autoplay, Parallax  } from 'swiper/modules';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/parallax'

const modules = [Pagination, Navigation, A11y, EffectFade, Autoplay, Parallax ]

const luckCardShow = ref(false)

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
};

const MainImg = ref([
  {
    title: '나래 함초롱하다 감또개 아름드리 아름드리',
    description: '나래 함초롱하다 감또개 아름드리 아름드리 도담도담 아슬라 바나나 바나나 도서관 그루잠 도담도담 달볓 아련 늘품 여우별 로운 도르레 달볓 아련 도담도담 곰다시 사과 소솜 옅구름 아련',
    url: '/src/assets/images/main/main02.jpg'
  },
  {
    title: '옅구름 늘품 예그리나 여우별 다솜 아리아 별하',
    description: '옅구름 늘품 예그리나 여우별 다솜 아리아 별하 가온누리 도서관 그루잠 여우비 달볓 그루잠 예그리나 아련 늘품 여우별 로운 도르레 달볓 아련 도담도담 곰다시 사과 소솜 옅구름 아련',
    url: '/src/assets/images/main/main01.jpg'
  },
  {
    title: '도르레 로운 산들림 이플 소록소록 함초롱하다',
    description: '도르레 로운 산들림 이플 소록소록 함초롱하다 곰다시 안녕 미쁘다 노트북 아름드리 바나나 여우비 사과 산들림 바나나 아련 늘품 여우별 로운 도르레 달볓 아련 도담도담 곰다시 사과 소솜 옅구름 아련',
    url: '/src/assets/images/main/main03.jpg'
  }    
])

</script>