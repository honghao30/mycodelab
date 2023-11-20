<template>
  <div class="main-container">
    <el-card class="box-card main-weather">
      <div class="text item">
        안녕하세요?<br>
        <strong>{{today}} 현재 시각 {{ current }}</strong> 서울 날씨 입니다.<br>
        오늘은 <strong>{{ todayWeather  }}</strong>, 현재 온도는  <strong>{{ todaytemp }} °C</strong>,<br> 습도는 <strong>{{ todayhumidity }}</strong> 입니다.<br>
        <strong>{{today}} 일출 {{ sunriseTimeIs  }}, 일몰 {{ sunsetTimeIs  }}</strong> 입니다.<br>
        여러분이 계신곳은 어떠신가요?<br>
        <router-link to="/cmpKoreaWeather">지역별 날씨 페이지</router-link>
      </div>
    </el-card>    
    <luckCard />
    <div class="main-swiper">
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
      </swiper>
    </div>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import luckCard from '@/components/minicard/card.vue'

import SwiperCore, { Navigation, Pagination, A11y, Parallax } from "swiper"
SwiperCore.use([Navigation, Pagination, A11y, Parallax])

import "swiper/swiper.scss"
import "swiper/components/navigation/navigation.scss"
import "swiper/components/pagination/pagination.scss"

import axios from 'axios'
import { ref } from 'vue'

import { getWeathers } from '@/api/getWeather'

const weatherData = getWeathers()
const todayWeather = weatherData.todayWeather
const todaytemp = weatherData.todaytemp
const todaywind = weatherData.todaywind
const todayhumidity = weatherData.todayhumidity
const sunriseTimeIs = weatherData.sunriseTimeIs
const sunsetTimeIs = weatherData.sunsetTimeIs
const WeatherIcon = weatherData.WeatherIcon

import { getTodayDate } from '@/utils/time'
const [TodayDateFull, TodayData, currentTime] = getTodayDate()
const today = TodayData
const current = currentTime


</script>