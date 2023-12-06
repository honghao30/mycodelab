<template>
  <div class="content-wrap" ref="content">
    <Title 
        :level="2" 
        alignType="center" 
        pageTitle="Swiper 예제"
    />
    <div class="discription-text">
      swiper 의 사례들 정리 합니다.
    </div>    
    <Title 
        :level="3" 
        alignType="left" 
        pageTitle="영상 제어1"
    />    
    <div class="guide-context">
       <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="0"
        :speed="600"
        :parallax="true"
        navigation
        :pagination="{ clickable: true,  }"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :effect="'fade'"
        :onSwiper="onSwiper"
        :onSlideChange="onSlide"
      >
        <swiper-slide>
          <img src="@/assets/images/main/main02.jpg" alt="">
        </swiper-slide>
        <swiper-slide>
          <img src="@/assets/images/main/main01.jpg" alt="">
        </swiper-slide>
        <swiper-slide>
          <img src="@/assets/images/main/main03.jpg" alt="">
        </swiper-slide>     
      </swiper>
    </div>
    <Title 
        :level="3" 
        alignType="left" 
        pageTitle="영상 제어2"
    />    
    <div class="guide-context">

    </div>    
    <Title 
        :level="3" 
        alignType="left" 
        pageTitle="애니메이션"
    /> 
  </div>
</template>

<script setup>
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
const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
};
</script>

<style>

</style>