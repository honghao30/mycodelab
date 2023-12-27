<template>
    <swiper
        :direction="'vertical'"
        :slidesPerView="1"
        :spaceBetween="0"
        :mousewheel="true"
        :pagination="{
            clickable: true,
        }"
        :modules="modules"
        :onSwiper="onSwiper"
        :onSlideChange="onSlideChange"
        @slideChangeTransitionEnd="onSlideChangeTransitionEnd"               
    >
        <swiper-slide
            v-for="(video, index) in 10"
            :key="index"
        >
            <div class="video__wrap">                                                  
                {{ video }}
            </div>
        </swiper-slide>  
    </swiper>  
</template>

<script setup>
// import
import { ref, watch, computed, onMounted, nextTick } from 'vue'
 // import Swiper core and required modules
import { Mousewheel  } from 'swiper/modules'
import getTodayDate from '@/utils/time'
const [TodayDateFull, TodayData, currentTime, TodayDateFullDash] = getTodayDate()

// Swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
const modules = [ Mousewheel ]

</script>

<style>

</style>