<template>
    <div class="content-wrap">
      <div class="movie-post__slide">
        <div class="main-swiper">
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
          >
            <swiper-slide
              v-for="(slide, index) in nowPlayingList"
              :key="index"
            >
              <div class="swiper-inner">
                  <div class="inner-text">
                    <h3 data-swiper-parallax="-100" data-swiper-parallax-duration="1000">{{ slide.title }}</h3>
                    <p data-swiper-parallax="-200" data-swiper-parallax-duration="1500">{{ slide.description }}</p>
                  </div>
                  <img :src="`https://image.tmdb.org/t/p/original/${slide.backdrop_path}`" alt=""> 
              </div>          
            </swiper-slide>   
          </swiper>
        </div>
      </div>
      <Title 
        :level="2" 
        pageTitle="상영중 영화"
      />
      <div class="movie-list__wrap">
          <div class="movie-item"   
            v-for="movie in nowPlayingList" :key="movie.id"         
          >
            <div class="movie-item__img">
              <img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" alt="">
            </div>
            <div class="movie-item__info">
              <div class="movie-item__info-title">
                <h3>{{ movie.title }}</h3>
              </div>
              <div class="movie-item__info-desc">
                <p class="data">개봉일 : {{ movie.release_date }}</p>
                <p>{{ movie.overview }}</p>
              </div>
            </div>
          </div>
      </div>

    </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import axios from 'axios';
const MovieBaseUrl = 'https://api.themoviedb.org/3/movie/';
const MovieKey = 'd2bb40d5b45665c9a72ed5938162a943';


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

const getMovie = () => {
  const nowPlayingList = ref([]);  

  const nowPlaying = async () => {
    try {
      const response = await axios.get(`${MovieBaseUrl}now_playing?api_key=${MovieKey}&language=ko-KR&append_to_response=images,videos`);
      const data = response.data;
      data.results.forEach(result => {
        nowPlayingList.value.push(result);  
        console.log(nowPlayingList.value)
      })
      console.log(playImages.value);
    } catch (error) {
      console.log(error.message);
    }
  }

  nowPlaying();

  return { nowPlayingList };
};

const { nowPlayingList } = getMovie();
</script>

<style>

</style>