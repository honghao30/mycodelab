<template>
    <div class="tiktok__wrap">
        <div class="tiktok__wrap--inner">
            <swiper
                :direction="'vertical'"
                :slidesPerView="1"
                :spaceBetween="0"
                :mousewheel="true"
                :pagination="{
                    clickable: true,
                }"
                :modules="modules"
            >
                <swiper-slide
                    v-for="video in videoList"
                    :key="video.id"
                >
                    <div class="video__wrap" @click="doubleClick($event, video.uid)">
                        <Button                            
                            buttonName="재생"                                
                            iconName="icon_play_video"
                            iconOnly="true"
                            @click="playVideo(video.id)"
                            v-if="videoStatus"
                        />
                        <Button                            
                            buttonName="정지"                                
                            iconName="icon_pause_video"
                            iconOnly="true"
                            @click="pauseVideo(video.id)"
                            v-else
                        />                                                    
                       <video :id="'v-'+video.uid" x5-video-player-fullscreen="true" webkit-playsinline="true" x-webkit-airplay="true"
				        playsinline="true" x5-playsinline :src="video.url"></video>
                    </div>
                </swiper-slide>  
            </swiper>            
        </div>
    </div>  
</template>

<script setup>
import { ref } from 'vue'
 // import Swiper core and required modules
import { Mousewheel  } from 'swiper/modules'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const modules = [ Mousewheel ]

const videoStatus = ref('true')
const lastIndex = ref(0)
const currentIndex = ref(0)
const timer = ref(null)
const db_star = ref(0)
const hearts = ref([])

const videoList = [
    {
        id: 1,
        title: '안녕하세요 이제 시작해주세요1',
        url: './video/1.mp4',
        nickName: '@Jone',
        statistics: {
            "comment_count": 0,
            "like_count": 0,
            "play_count": 0,
        },
        playing: false
    },
    {
        id: 2,
        title: '안녕하세요 이제 시작해주세요2',
        url: './video/2.mp4',
        nickName: '@Mari',
        statistics: {
            "comment_count": 0,
            "like_count": 0,
            "play_count": 0,
        },
        playing: false
    },
    {
        id: 3,
        title: '안녕하세요 이제 시작해주세요3',
        url: './video/3.mp4',
        nickName: '@YYY',
        statistics: {
            "comment_count": 0,
            "like_count": 0,
            "play_count": 0,
        },
        playing: false
    },
    {
        id: 4,
        title: '안녕하세요 이제 시작해주세요4',
        url: './video/4.mp4',
        nickName: '@KKK',        
        statistics: {
            "comment_count": 0,
            "like_count": 0,
            "play_count": 0,
        },
        playing: false
    },
    {
        id: 5,
        title: '안녕하세요 이제 시작해주세요5',
        url: './video/5.mp4',
        nickName: '@gp1',
        statistics: {
            "comment_count": 0,
            "like_count": 0,
            "play_count": 0,
        },
        playing: false
    }
]

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
};

const doubleClick = (e, id) => {
    console.log('좋아요')
}
const playVideo = (id) => {
    console.log('재생', id)
    videoStatus.value = false
}
const pauseVideo = (id) => {
    console.log('정지')
    videoStatus.value = true
}
</script>

<style lang="scss">
.tiktok__wrap {
    padding: 50px 0;
    .tiktok__wrap--inner {
        border-radius: 12px;
        border: 5px solid #ccc;
        width: 100%;
        max-width: 360px;
        margin: 0 auto;
        height: 640px;
        background: #000;
    }
    .swiper-vertical {
        height: 100%;
    }
    .video__wrap {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        video {
            object-fit: cover;
        }
    }
}
</style>