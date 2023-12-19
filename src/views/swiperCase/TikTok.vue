<template>
    <div class="tiktok__wrap">
        <div class="tiktok__wrap--inner">
            <TopToolBar  @sortVideos="sortVideos" @openSeach="openSeach" />
            <LoadingDot v-if="Loading" />
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
                    v-for="(video, index) in displayVideos"
                    :key="index"
                >
                    <div class="video__wrap">
                        <div class="screen-heart" :class="{'is-active': video.bigHeart == true}">
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
                                    @click="commandLyOpen(video)"                                                                  
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
                        <VideoInfo :video="video" />                                   
                       <video 
                            :id="'v-' + video.id"
                            x5-video-player-fullscreen="true"
                            webkit-playsinline="true"
                            x-webkit-airplay="true"
                            playsinline="true"
                            x5-playsinline
                            :src="video.url"
                            muted
                            loop="true"
                            ref="videoRef"
                            @click="screenEvent(video, index)"
                        ></video>
                    </div>
                </swiper-slide>  
            </swiper>    
            <BottomBar @goHome="goHome" @videoUpload="videoUpload" @mypageOpen="mypageOpen" />
            <!-- layer 검색-->
            <MyLy                
                height="100%"
                left="0"
                top="0"
                v-if="topSearch"
                @closeLy="topSearch = false" 
            >
                <template #layerContent>
                    <div class="video-upload">
                        <Title 
                            pageTitle="검색"
                            :level="3" 
                        />
                        <div class="video-upload-form">
                            <MyInput >
                                <template #input>
                                    <InputEl                                        
                                        v-model="searchText"                                                 
                                        placeholder="검색어를 입력하세요"
                                    />
                                    <Button
                                        buttonName="검색"
                                        types="btn-primary-line"
                                        size="medium"
                                        :disabled="searchText.length <= 2"
                                        @click="fileteredVideos"
                                    />
                                </template>
                            </MyInput>                        
                        </div>
                        <div class="search-results">
                            <strong>{{ SearchResults.length }}</strong> 건의 비디오가 검색 되었습니다.
                            <ul>
                                <li v-for="(video, index) in SearchResults" :key="index">
                                    <div v-if="SearchResults.length > 0">
                                        <div class="small-video">
                                            <video 
                                            :id="'v-' + video.id"
                                            x5-video-player-fullscreen="true"
                                            webkit-playsinline="true"
                                            x-webkit-airplay="true"
                                            playsinline="true"
                                            x5-playsinline
                                            :src="video.url"
                                            muted                                                                                                                                 
                                        ></video>                                            
                                        </div>
                                        <p class="tit">{{ video.title }}</p>
                                        <p class="info">{{ video.nickName }} | {{ video.statistics.like_count }}</p>                                    
                                    </div>
                                    <div v-else class="nodata">
                                        비디오가 없습니다.
                                    </div>                                    
                                </li>
                            </ul>
                        </div>
                    </div>                    
                </template>

            </MyLy>
            <!-- //layer 검색-->
            <!-- layer 영상 댓글-->
            <MyLy                
                height="80%"
                left="0"
                bottom="0"
                v-if="commandLy"
                @closeLy="commandLy = false" 
            >
                <template #layerContent>
                    <Command :SelectVideo="SelectVideo" @closeLy="commandLy = false" />                   
                </template>

            </MyLy>     
            <!-- // layer 영상 댓글-->
            <!-- layer 영상 공유-->
            <MyLy                
                height="50%"
                left="0"
                bottom="0"
                v-if="videoShareLy"
                @closeLy="videoShareLy = false" 
            >
                <template #layerContent>
                    <ShareVideo :SelectVideo="SelectVideo" @videoShareConfirm="videoShareConfirm" @closeLy="videoShareLy = false"  />               
                </template>

            </MyLy>    
            <!-- //layer 영상 공유-->
            <!-- 공통 알림 -->
            <MyLy         
                width="80%"       
                height="0px"
                left="10%"
                right="10%"
                bottom="50%"
                :closeBtn="false"
                v-if="newVideoAlert"
                @closeLy="newVideoAlert = false" 
            >
                <template #layerContent>
                    <div class="new-video-msg-box">
                        새로운 영상이 있습니다.
                    </div>                    
                </template>

            </MyLy>    
            <!-- // 하단 기능 -->
            <!-- // layer 영상 업로드-->
            <MyLy                
                height="100%"
                left="0"
                bottom="0"
                v-if="uploadLy"
                @closeLy="uploadLy = false" 
            >
                <template #layerContent>
                    <VideoUpload :UpLoadForm="UpLoadForm" :user_command="user_command" @uploadVideoConfirm="uploadVideoConfirm" @cancelUploadVideo="cancelUploadVideo" />                   
                </template>

            </MyLy>     
            <!-- // layer 영상 마이페이지-->
            <MyLy           
                height="100%"
                left="0"
                bottom="0"
                v-if="mypageLy"
                @closeLy="mypageLy = false" 
            >
                <template #layerContent>
                    <div class="video-upload">
                        <Title 
                            pageTitle="마이 페이지"
                            :level="3" 
                        />
                    </div>                    
                </template>

            </MyLy>             
        </div>          
    </div>  
</template>

<script setup>
// 컴포넌트 호출
import BottomBar from './components/BottomBar.vue'
import VideoUpload from './components/VideoUpload.vue'
import ShareVideo from './components/ShareVideo.vue'
import Command from './components/Command.vue'
import VideoInfo from './components/VideoInfo.vue'
import TopToolBar from './components/TopToolBar.vue'

import { ref, watch, computed, onMounted, nextTick } from 'vue'
 // import Swiper core and required modules
import { Mousewheel  } from 'swiper/modules'
import getTodayDate from '@/utils/time'
const [TodayDateFull, TodayData, currentTime, TodayDateFullDash] = getTodayDate()

// 비디오 리스트
import VideoData from './videoList'
const videoList = ref(VideoData)
let sorted = ref(false); 

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
const heart = ref([])
const SelectVideo = ref('')

const searchText = ref('')
const searchInput = ref(null)

const Loading = ref(false)
const uploadLy = ref(false)
const topSearch = ref(false)
const mypageLy = ref(false)
const commandLy = ref(false)
const videoShareLy = ref(false)
const newVideoAlert = ref(false)


const SearchResults = ref([])

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
const screenEvent = (video,index) => {  
    const videoElement = videoRef.value[index]  
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      clearTimeout(timer.value)      
      db_star.value = 0
      if(videoElement.paused) {        
         videoElement.play()
         video.playing = true
      } else {
         videoElement.pause()
         video.playing = false
      }      
    }, 300)
    if (db_star.value === 0) {
        db_star.value = new Date().getTime()
    } else {
      let now = new Date().getTime()
      let del = now - db_star.value
      if (del <= 300) {        
        clearTimeout(timer.value)
        console.log('더블클릭')        
        video.statistics.like_count++ 
        video.bigHeart = true     
        video.active = true    
        setTimeout (() => {            
            video.bigHeart = false
        },1000) 
      }
      db_star.value = 0
    }
}

// 댓글
const commandLyOpen = (video) => {
    commandLy.value = true
    SelectVideo.value = video
    console.log(SelectVideo)    
}

// 영상 공유
const videoShare = (video) => {
    SelectVideo.value = video    
    videoShareLy.value = true
}
const videoShareConfirm = (SelectVideo) => { 
    console.log(SelectVideo)
    SelectVideo.statistics.share_count++ 
    videoShareLy.value = false    
}

// 추천영상 정렬
const displayVideos = computed(() => {
    if (sorted.value) {
        return [...videoList.value].sort((a, b) => b.statistics.like_count - a.statistics.like_count);
    } else {
        return videoList.value;
    }
})
const sortVideos = () => {    
    sorted.value = !sorted.value;
}
// 검색
const openSeach  = () => {
    topSearch.value = true
    nextTick(() => {
        console.log(searchInput.value)
        // setTimeout (() => {            
        //     searchInput.value.$el.focus()
        // },1000)
    })        
}
const fileteredVideos = () => {
    const filteredVideos = videoList.value.filter(video => {
    return video.title.includes(searchText.value);
  });

  SearchResults.value = filteredVideos;
}
// 하단 바 이벤트 처리
const goHome = () => { 
    console.log(videoList.value.length, videoLength)
    if(videoList.value.length === videoLength) {
        Loading.value = true
        setTimeout (() => {
            alert('새로운 비디오가 없습니다.')
            window.location.reload()
        },500)    
    }
}

// 영상 업로드
// 등록 v-model
const UpLoadForm = ref([
  {
    vselected: ref(''),
    videoRandomId: ref(''),
    videoTitle: ref(''),
    videoDescription: ref(''),
    videoTag: ref(''),
    videoUploadForm: ref(''),
    uploadtime: ref(TodayData),
    videoThumbnail: ref(''),
    videoUrl: ref(''),
    youtubeUrl: ref('')
  }
])

const videoUpload = () => {
    uploadLy.value = true
}
const randomId = () => {
  let N = 1000000;
  let M = 1;
  let tt = Math.random()*N;
  return Math.floor(tt)+M;
}

const uploadVideoConfirm = () => {
    videoRandomId.value = randomId()
    let newVideo = {
        id: videoRandomId.value,
        title: videoTitle.value,
        url: videoUrl.value,   
        videoUploadForm: videoUploadForm.value,        
        nickName: 'manage',      
        uploadtime: TodayDateFullDash,  
        videoDescription: videoDescription.value,
        videoTag: videoTag.value,  
        youtubeUrl: youtubeUrl.value,
        statistics: {
                comment_count: 0,
                like_count: 0,
                play_count: 0,
                share_count: 0
            },
        comments: [],
        playing: false,
        active: false                             
    }
    videoList.value.push(newVideo)    
    videoTitle.value = ''   
    videoDescription.value = ''
    videoTag.value = ''
    videoUploadForm.value = ''    
    console.log(VideoData)
    Loading.value = true
        setTimeout (() => {            
            Loading.value = false
            uploadLy.value = false
            newVideoAlert.value = true
    },3000)
    setTimeout (() => {            
        newVideoAlert.value = false
    },5000)     
}
const cancelUploadVideo = () => {
    uploadLy.value = false
}

const mypageOpen = () => {
    mypageLy.value = true
}
</script>

<style lang="scss" scope>
html,
body,
.wrap,
#app {
    height: 100%;
}
.tiktok__wrap {
    width: 100%;
    height: 100%;
    .tiktok__wrap--inner {
        position: relative;
        width: 100%;
        height: 100%;        
        margin: 0 auto;        
        background: #000;
        overflow: hidden;
    
    }
    .swiper-vertical {
        height: calc(100% - 50px);
    }
    .video__wrap {
        width: 100%;
        height: 100%;
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
            background-color: rgba(0,0,0,0.3);
            color:#fff;
            width: calc(100% - 20px);
            padding: 10px 10px;
            position: absolute;
            left:0;
            bottom:0px;
            .tit {
                font-size: 18px;
            }
            .description {
                font-size: 16px;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                -webkit-line-clamp:1;
            }
        }
        video {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }
    .user-action {
        position: absolute;
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
        height: 40%;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 24;
        display: none;
        opacity: 0;
        &.is-active {
            opacity: 1;
            display: flex;
            .heart__wrap {
                animation: Beat 2s infinite ease-in-out;      
            }
        }
        .heart__wrap {
            position: relative;
            max-width: 5vw;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;                             
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

    .video-upload-form {
        padding: 20px 0;
        .input__wrap {
            label {
                font-size: 16px;
                font-weight: 500;
                margin-bottom: 5px;
                display: block;                
            }
        }
    }
}
.new-video-msg-box {
    text-align: center;
    display: flex;
    align-content: center;
    justify-content: center;
    background: #000;
    color: #fff;
    height: 30px;
}
.loading__wrap--round {
    background-color: rgba(0,0,0,0.5);
    z-index: 25; 
}
.search-results {
    padding: 10px 0;
    height: 500px;
    ul {
        padding-top: 5px;
        height: 100%;
        overflow-y: auto;
        li {
                padding: 15px 0;
                border-bottom: 1px solid #ccc;
                .small-video {
                    width: 50%;
                }
                .nodata {
                    text-anchor: center;
                }
            }  
    }
}
.layer__container {
    height: 100%;
}
.btn-icon-arrow-upload {
    width: 40px;
    height:40px;
    .icon-arrow-upload {
        display: block;
        width: 100%;
        height: 100%;
        background: url('@/assets/images/icon/icon-arrow-upload.svg') no-repeat  50%;
        background-size: 100% auto;
    }
}
</style>