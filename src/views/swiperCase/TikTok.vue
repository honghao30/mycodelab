<template>
    <div class="tiktok__wrap">
        <div class="tiktok__wrap--inner">
            <div class="top-search">
                <MyBtn                            
                    buttonName="검색"
                    iconOnly="true"                    
                    @click="openSeach"                                                                       
                >
                    <template #svg-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1">
                        <g id="surface1">
                        <path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:#fff;stroke-opacity:1;stroke-miterlimit:4;" d="M 15.793753 15.812503 L 21.000003 21.000003 M 18.000003 10.500002 C 18.000003 14.640627 14.640627 18.000003 10.500002 18.000003 C 6.359376 18.000003 3 14.640627 3 10.500002 C 3 6.359376 6.359376 3 10.500002 3 C 14.640627 3 18.000003 6.359376 18.000003 10.500002 Z M 18.000003 10.500002 " transform="matrix(1.25,0,0,1.25,0,0)"/>
                        </g>
                        </svg>
                    </template>
                </MyBtn>
            </div>
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
                    v-for="(video, index) in videoList"
                    :key="index"
                >
                    <div class="video__wrap" 
                        :Counter="video.statistics.like_count"
                        @click="screenEvent(video)"
                    >
                        <div class="screen-heart" v-if="bigHeart">
                            <div class="heart__wrap">
                                <div class="left"></div>
                                <div class="right"></div>
                            </div>                             
                        </div>
                        <ul class="user-action">
                            <li>
                                <MyBtn                            
                                    buttonName="좋아요"
                                    iconOnly="true"
                                    :Counter="video.statistics.like_count"
                                    @click="videoLike(video)"                                                                       
                                >
                                    <template #svg-icon>
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="0 0 50 50" version="1.1">
                                        <g id="surface1">
                                            <path class="basic-color" :class="{'active-color': video.active == true}" style="stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 36.015625 1.5625 C 31.09375 1.5625 26.953125 4.375 25 8.4375 C 23.046875 4.375 18.90625 1.5625 13.984375 1.5625 C 7.1875 1.5625 1.5625 7.34375 1.5625 13.984375 C 1.5625 25.3125 25 48.4375 25 48.4375 C 25 48.4375 48.4375 25.3125 48.4375 13.984375 C 48.4375 7.34375 42.8125 1.5625 36.015625 1.5625 Z M 36.015625 1.5625 "/>
                                        </g>
                                        </svg>
                                    </template>
                                </MyBtn>
                            </li>
                            <li>
                                <MyBtn                            
                                    buttonName="댓글" 
                                    iconOnly="true"     
                                    :Counter="video.statistics.comment_count"  
                                    @click="videoComment(video)"                                                                  
                                >
                                <template #svg-icon>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="0 0 50 50" version="1.1">
                                    <g id="surface1">
                                    <path class="basic-color" style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 8.332031 2.082031 C 4.882812 2.082031 2.082031 4.882812 2.082031 8.332031 L 2.082031 31.25 C 2.082031 34.703125 4.882812 37.5 8.332031 37.5 L 12.5 37.5 L 12.5 45.832031 C 12.5 46.640625 12.96875 47.378906 13.699219 47.71875 C 14.433594 48.0625 15.296875 47.953125 15.917969 47.433594 L 27.835938 37.5 L 41.667969 37.5 C 45.117188 37.5 47.917969 34.703125 47.917969 31.25 L 47.917969 8.332031 C 47.917969 4.882812 45.117188 2.082031 41.667969 2.082031 Z M 8.332031 2.082031 "/>
                                    </g>
                                    </svg>
                                </template>
                                </MyBtn>
                            </li>
                            <li>
                                <MyBtn                            
                                    buttonName="공유하기"                                    
                                    iconOnly="true"     
                                    :Counter="video.statistics.share_count"  
                                    @click="videoShare(video)"                                                                                                                                    
                                >
                                <template #svg-icon>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="0 0 50 50" version="1.1">
                                    <g id="surface1">
                                    <path class="basic-color" style="stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 41.671875 33.328125 C 38.828125 33.328125 36.320312 34.765625 34.8125 36.933594 L 16.347656 27.160156 C 16.53125 26.464844 16.671875 25.753906 16.671875 25 C 16.671875 24.25 16.542969 23.535156 16.347656 22.84375 L 34.8125 13.066406 C 36.320312 15.246094 38.820312 16.671875 41.671875 16.671875 C 46.269531 16.671875 50 12.9375 50 8.339844 C 50 3.742188 46.269531 0 41.671875 0 C 37.070312 0 33.339844 3.730469 33.339844 8.328125 C 33.339844 8.40625 33.359375 8.484375 33.359375 8.5625 L 13.925781 18.859375 C 12.441406 17.507812 10.496094 16.671875 8.339844 16.671875 C 3.730469 16.671875 0 20.398438 0 25 C 0 29.601562 3.730469 33.328125 8.328125 33.328125 C 10.488281 33.328125 12.429688 32.492188 13.914062 31.144531 L 33.351562 41.4375 C 33.351562 41.515625 33.328125 41.59375 33.328125 41.671875 C 33.328125 46.269531 37.0625 50 41.660156 50 C 46.261719 50 49.992188 46.269531 49.992188 41.671875 C 49.992188 37.070312 46.269531 33.328125 41.671875 33.328125 Z M 41.671875 33.328125 "/>
                                    </g>
                                    </svg>
                                </template>
                                </MyBtn>
                            </li>                                                                                 
                        </ul>
                        <Button                            
                            buttonName="재생"                                
                            iconName="icon_play_video"
                            iconOnly="true"
                            @click="playVideo(video, index)"
                            v-if="!video.playing"
                        />                 
                        <Button                            
                            buttonName="정지"                                
                            iconName="icon_pause_video"
                            iconOnly="true"
                            @click="pauseVideo(video, index)"
                            v-else
                        />
                        <div class="video-info">
                            <p class="tit">{{ video.title }}</p>
                            <p class="description">
                                <strong>{{ video.nickName }}</strong> |  {{ video.statistics.play_count }}
                            </p>
                        </div>                                     
                       <video 
                            :id="'v-' + video.id"
                            x5-video-player-fullscreen="true"
                            webkit-playsinline="true"
                            x-webkit-airplay="true"
                            playsinline="true"
                            x5-playsinline
                            :src="video.url"
                            muted
                            ref="videoRef"
                        ></video>
                    </div>
                </swiper-slide>  
            </swiper>            
            <div class="bottom-util">
                <MyBtn                            
                    buttonName="홈"    
                    @click="goHome()"  
                >
                </MyBtn>      
                <MyBtn                            
                    buttonName="업로드"                                                                          
                >
                </MyBtn>
                <MyBtn                            
                    buttonName="마이페이지"                                                                          
                >
                </MyBtn>                                 
            </div>            
        </div>
    </div>  
</template>

<script setup>
import { ref, watch } from 'vue'
 // import Swiper core and required modules
import { Mousewheel  } from 'swiper/modules'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const modules = [ Mousewheel ]

const videoSwiper = ref(null)
const timer = ref(null)
const db_star = ref(0)
const videoRef = ref([])
const bigHeart = ref(false)

const videoList = ref([
    {
        id: 1,
        title: '싸이 춤 따라하는 어머니! 멋지다',
        url: './video/1.mp4',
        nickName: '@Jone',
        statistics: {
            comment_count: 0,
            like_count: 0,
            play_count: 0,
            share_count: 0
        },
        playing: false,
        active: false
    },
    {
        id: 2,
        title: '이 사람 정말 천재인데...생수병으로 이런걸다',
        url: './video/2.mp4',
        nickName: '@Mari',
        statistics: {
            comment_count: 0,
            like_count: 0,
            play_count: 0,
            share_count: 0
        },
        playing: false,
        active: false
    },
    {
        id: 3,
        title: '안녕하세요 이제 시작해주세요3',
        url: './video/3.mp4',
        nickName: '@YYY',
        statistics: {
            comment_count: 0,
            like_count: 0,
            play_count: 0,
            share_count: 0
        },
        playing: false,
        active: false
    },
    {
        id: 4,
        title: '안녕하세요 이제 시작해주세요4',
        url: './video/4.mp4',
        nickName: '@KKK',        
        statistics: {
            comment_count: 0,
            like_count: 0,
            play_count: 0,
            share_count: 0
        },
        playing: false,
        active: false
    },
    {
        id: 5,
        title: '안녕하세요 이제 시작해주세요5',
        url: './video/5.mp4',
        nickName: '@gp1',
        statistics: {
            comment_count: 0,
            like_count: 0,
            play_count: 0,
            share_count: 0
        },
        playing: false,
        active: false
    }
])

const videoLength = videoList.value.length

const onSwiper = (swiper) => {
    const i = swiper.activeIndex
    const videoElement = videoRef.value[i]    
    videoElement.play()  
    console.log(videoList.value[i], swiper.activeIndex)
    videoList.value[i].playing = true
}
const onSlideChange = () => {
  console.log('slide change') 

}
const onSlideChangeTransitionEnd = () => {        
    console.log('slide changeaaa')
    const allvideoElement = document.querySelectorAll('.swiper-slide video')        
    allvideoElement.forEach((video, index) => {
        if(video.parentElement.parentElement.classList.contains('swiper-slide-active')) {
            video.play()
            videoList.value[index].playing = true
            console.log('찾았다', index)
        } else {
            video.pause()
            videoList.value[index].playing = false
        }
    })
}
const playVideo = (video, index) => {  
    const videoElement = videoRef.value[index]  
    console.log(videoElement)
    videoElement.play()  
    video.playing = true
}
const pauseVideo = (video, index) => {
    const videoElement = videoRef.value[index]      
    console.log(videoElement)
    videoElement.pause()     
    video.playing = false
}
const videoLike = (video) => {
    console.log(video)
    video.statistics.like_count++     
    video.active = true     
}
const screenEvent = (video) => {
    console.log(video)
    video.statistics.like_count++    
    bigHeart.value = true 
    setTimeout (() => {
        bigHeart.value = false 
    },1000)       
    video.active = true  
}
const videoComment = (video) => {
    console.log(video)
    video.statistics.comment_count++
}
const videoShare = (video) => {
    console.log(video)
    video.statistics.share_count++
}
const goHome = () => { 
    console.log(videoList.value.length, videoLength)
    if(videoList.value.length === videoLength) {
        setTimeout (() => {
            alert('새로운 비디오가 없습니다.')
            window.location.reload()
        },500)    
    }
}
</script>

<style lang="scss">
.tiktok__wrap {
    padding: 50px 0;
    .tiktok__wrap--inner {
        position: relative;
        border-radius: 12px;
        border: 5px solid #ccc;
        width: 100%;
        max-width: 360px;
        margin: 0 auto;
        height: 640px;
        background: #000;
        overflow: hidden;
        .bottom-util {
            background: #000;
            color: #fff;
            height: 30px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-content: center;
            button {
                width: calc(100% / 3);
            }
        }
        .top-search {
            position: absolute;
            top:0;
            left:0;
            width: 100%;
            padding: 5px;
            z-index: 20;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }        
    }
    .swiper-vertical {
        height: calc(100% - 30px);
    }
    .video__wrap {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
            .btn-icon_play_video {
                opacity: 1;
                transition: all 0.3s ease-in;
            }
            .btn-icon_pause_video {
                opacity: 1;
                transition: all 0.3s ease-in;
            }
        }
        .video-info {
            background-color: rgba(0,0,0,0.7);
            color:#fff;
            width: 100%;
            padding: 5px 10px;
            position: fixed;
            left:0;
            bottom:0;
            .tit {
                font-size: 16px;
            }
        }
        video {
            object-fit: cover;
        }
    }
    .user-action {
        position: fixed;
        right: 10px;
        bottom: 20%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        z-index: 22;
    }
    .counter {
        margin-top: 10px;
        font-size: 22px;
        text-align: center;
        color: #fff;
    }
    .basic-color {
        fill:#fff;
        &.active-color {
            fill:red;
        }
    }
    .screen-heart {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 24;
        .heart__wrap {
            position: relative;
            max-width: 5vw;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: Beat 2s forwards ease-in-out;                       
        }

        .left {
            background-color: red;
            height: 10vw;
            aspect-ratio: 1/1.5;
            border-radius: 50% 50% 0% 0%;
            rotate: -47deg;
            translate: 30%;
            }
        .right {
            background-color: red;
            height: 10vw;
            aspect-ratio: 1/1.5;
            border-radius: 50% 50% 0% 0%;
            rotate: 47deg;
            translate: -30%;
        }
    }
    @keyframes Beat {
        0% {
            opacity: 0;
            transform: scale(120%);
        }
        40% {
            opacity: 1;
            transform: scale(100%);
        }
        100% {
            opacity: 0;
            transform: scale(120%);
        }
    }
    .btn-icon_play_video {
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%, -50%);  
        display: block;
        padding:0;
        width: 80px;
        height: 80px;
        max-width: 80%;
        min-width: 80px;
        z-index: 20;
        opacity: 0;
        transition: all 0.3s ease;        
        &::before {
            content: '';
            display: block;
            width: 80px;
            height: 80px;
            background-image: url("/src/assets/images/icon/icon_play_video.svg");
            background-repeat: no-repeat;
            background-position: center left;
            background-size: contain;  
        }  
    }
    .btn-icon_pause_video {
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%, -50%);  
        display: block;
        padding:0;
        width: 80px;
        height: 80px;
        max-width: 80%;
        min-width: 80px;
        z-index: 20;
        opacity: 0;
        transition: all 0.3s ease;
        &::before {
            content: '';
            display: block;
            width: 80px;
            height: 80px;
            background-image: url("/src/assets/images/icon/icon_pause_video.svg");
            background-repeat: no-repeat;
            background-position: center left;
            background-size: contain;  
        }  
    }    
}
</style>