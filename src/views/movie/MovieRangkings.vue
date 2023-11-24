<template>
    <div class="movie-popular__wrap">
      <swiper
        :modules="modules"
        :slides-per-view="5"
        :space-between="30"     
        :loop="true"
        :autoplay="{
          delay: 3500,
          disableOnInteraction: false,
        }"
        navigation
        :parallax="true"
      >
          <swiper-slide  
            v-for="movie in popularList" :key="movie.id"         
          >
            <div class="movie-item__img">
              <img :src="`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`" alt="">
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
          </swiper-slide>
      </swiper>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/parallax'

import axios from 'axios';
const MovieBaseUrl = 'https://api.themoviedb.org/3/movie/';
const MovieKey = 'd2bb40d5b45665c9a72ed5938162a943';

import { Navigation, Pagination, A11y, EffectFade, Autoplay, Parallax  } from 'swiper/modules';
const modules = [Navigation,Pagination, A11y, EffectFade, Autoplay, Parallax ]

const getMovie = () => {
  const popularList = ref([]);

  const nowPlaying = async () => {
    try {
      const response = await axios.get(`${MovieBaseUrl}popular?api_key=${MovieKey}&language=ko-KR&append_to_response=images,videos`);
      const data = response.data;
      data.results.forEach(result => {
        popularList.value.push(result);
      });
      console.log(popularList);
    } catch (error) {
      console.log(error.message);
    }
  };

  nowPlaying();

  return { popularList };
};

const { popularList } = getMovie();
</script>

<style lang="scss">

</style>