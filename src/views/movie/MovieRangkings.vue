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
              <Button
                v-if="movie.videoKey !== ''"
                buttonName="재생"                                
                iconName="icon-play"
                iconOnly="true"
                @click="playVideo(movie.id)"
              />
              <img :src="`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`" alt="">
            </div>
            <div class="movie-item__info">
              <div class="movie-item__info-title">
                <h3>{{ movie.title }}</h3>
              </div>
              <div class="movie-item__info-desc">
                <div class="rate">
                  <div class="rate-score">{{ movie.vote_average }}</div>
                </div>
                <p class="data">개봉일 : {{ movie.release_date }}</p>
                <p>{{ movie.overview }}</p>
              </div>
            </div>
          </swiper-slide>
      </swiper>
      <!-- //모달 -->
      <ModalView
        v-if="isModalViewed" @closeModal="isModalViewed = false"
        modalTitle="모달 컴포넌트"
        modalSize="500"
      >
        <template #content>
          <div class="youtube__wrap">
            <iframe
              class=""
              :src="`https://www.youtube.com/embed/${videoKey}`"
              style="border: 0"
              allow="autoplay; encrypted-media"
              allowfullscreen
            ></iframe>
          </div>
          <div class="video-name">{{ videoName }}</div>
        </template> 
        <template #footer>
          모달 창 제어 버튼등
        </template>       
      </ModalView>
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

const { popularList } = getMovie()
const isModalViewed = ref(false)
const videoKey = ref('')
const videoName = ref('')

const playVideo = (movieId) => {
  const movieVideo = ref({})
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${MovieKey}&language=ko-KR&append_to_response=images,videos`)  
  .then(res => {
    movieVideo.value = res.data.videos.results[0]    
    videoKey.value = movieVideo.value.key
    videoName.value = movieVideo.value.name
    console.log(videoName.value)
  }).catch(err => {
    error.value = err.message    
  });
  isModalViewed.value = true
}
</script>

<style lang="scss">

</style>