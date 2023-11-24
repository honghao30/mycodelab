<template>
    <div class="content-wrap">
      <Title 
        :level="2" 
        pageTitle="상영중 영화"
      />
      <div class="movie-list__wrap">
          <div class="movie-item"   
            v-for="movie in nowPlayingList" :key="movie.id"         
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
          </div>
      </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const MovieBaseUrl = 'https://api.themoviedb.org/3/movie/';
const MovieKey = 'd2bb40d5b45665c9a72ed5938162a943';

const getMovie = () => {
  const nowPlayingList = ref([]);

  const nowPlaying = async () => {
    try {
      const response = await axios.get(`${MovieBaseUrl}now_playing?api_key=${MovieKey}&language=ko-KR&append_to_response=images,videos`);
      const data = response.data;
      data.results.forEach(result => {
        nowPlayingList.value.push(result);
      });
      // console.log(nowPlayingList);
    } catch (error) {
      console.log(error.message);
    }
  };

  nowPlaying();

  return { nowPlayingList };
};

const { nowPlayingList } = getMovie();
</script>

<style>

</style>