<template>
  <div class="content-wrap" ref="content">
    <Title 
        :level="2" 
        alignType="center" 
        pageTitle="Swiper 예제"
    />
    <!-- <div class="discription-text">
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
      </swiper> -->
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
    <div class="guide-context">

    </div>    
    <Title 
        :level="3" 
        alignType="left" 
        pageTitle="모달창 내 실행"
    />    
    <div class="guide-context">d
    </div>    
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import luckCard from '@/components/minicard/card.vue'

import "swiper/components/navigation/navigation.scss"
import "swiper/components/pagination/pagination.scss"
</script>

<style>

</style>