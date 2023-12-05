<template>
  <div class="main-container"  ref="content">
    <WeatherCard
      @luckCardShow="onLuckCardShow"
      v-if="weatherShow"
    />
    <luckCard      
      @luckCardShow="onLuckCardShow"
      v-if="luckCardShow"      
     />
    <div class="main-swiper" ref="mainSwiper">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="0"     
        :loop="true"
        :autoplay="{
          delay: 3500,
          disableOnInteraction: false,
        }"
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
    <div class="movie-card__wrap slideup">
      <Title 
        pageTitle="인기 영화"
        :level="3" 
        alignType="center"
      />
      <MovieRangkings />
    </div>    
    <div class="biz-card__wrap slideup">
        <Title 
          pageTitle="하는 일"
          :level="3" 
          alignType="center"
        />
        <ul class="biz-list">
          <li>
            <div class="icon"></div>
            <div class="title">퍼블리싱</div>
            <div class="description">HTML, CSS, JAVASCRIPT</div>
          </li>
          <li>
            <div class="icon"></div>
            <div class="title">프레임웍</div>
            <div class="description">Vue3.js & React</div>
          </li>
          <li>
            <div class="icon"></div>
            <div class="title">웹접근성</div>
            <div class="description">인증 심사 컨설팅</div>
          </li>          
        </ul>
    </div>    
    <div class="online-request__wrap slideup">
        <div class="button__wrap">
          <Button
            buttonName="프로젝트 가치 해요?"
            types="primary"                              
            @click="goMail"
          />          
        </div>
    </div>    
  </div>
</template>
<script setup>
import { ref, onBeforeUnmount, onMounted, defineEmits  } from 'vue'
import WeatherCard from './components/WeatherCard.vue'
import luckCard from '@/components/minicard/card.vue'
import MovieRangkings from '@/views/movie/MovieRangkings.vue'

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

const MainImg = ref([
  {
    title: '나래 함초롱하다 감또개 아름드리 아름드리',
    description: '나래 함초롱하다 감또개 아름드리 아름드리 도담도담 아슬라 바나나 바나나 도서관 그루잠 도담도담 달볓 아련 늘품 여우별 로운 도르레 달볓 아련 도담도담 곰다시 사과 소솜 옅구름 아련',
    url: './src/assets/images/main/main02.jpg'
  },
  {
    title: '옅구름 늘품 예그리나 여우별 다솜 아리아 별하',
    description: '옅구름 늘품 예그리나 여우별 다솜 아리아 별하 가온누리 도서관 그루잠 여우비 달볓 그루잠 예그리나 아련 늘품 여우별 로운 도르레 달볓 아련 도담도담 곰다시 사과 소솜 옅구름 아련',
    url: './src/assets/images/main/main01.jpg'
  },
  {
    title: '도르레 로운 산들림 이플 소록소록 함초롱하다',
    description: '도르레 로운 산들림 이플 소록소록 함초롱하다 곰다시 안녕 미쁘다 노트북 아름드리 바나나 여우비 사과 산들림 바나나 아련 늘품 여우별 로운 도르레 달볓 아련 도담도담 곰다시 사과 소솜 옅구름 아련',
    url: './src/assets/images/main/main03.jpg'
  }    
])

// ref
const luckCardShow = ref(false)
const weatherShow = ref(true)
const swiperHeight = ref(0)
const mainSwiper = ref(null)
const emits = defineEmits(['luckCardShow'])

const content = ref(null)

const onLuckCardShow = (value) => {
  luckCardShow.value = value;
}

const mainHandleScroll = () => {
    let scrollY = window.scrollY
    swiperHeight.value = mainSwiper.value.clientHeight
    console.log(scrollY, swiperHeight.value)
    if(scrollY > (swiperHeight.value * 0.3)) {
      weatherShow.value = false
    }

    const obj = content.value.querySelectorAll('.slideup')
    const height = document.documentElement.clientHeight
    obj.forEach(section => {
      const { top, bottom } = section.getBoundingClientRect()
      const isInViewport = top < height && bottom > 0
      if (isInViewport && !section.classList.contains('slideInUp')) {
        section.classList.add('slideInUp')
      }
    })    
}
onMounted(() => {
    window.addEventListener('scroll', mainHandleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', mainHandleScroll)
})
</script>