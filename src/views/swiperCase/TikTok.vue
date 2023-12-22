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
                        <Heart :likeCondition="video.bigHeart" />
                        <UserTool :video="video" @userSubscription="userSubscription" @addFavorite="addFavorite"  @videoShare="videoShare" @commandLyOpen="commandLyOpen" @videoLike="videoLike"  />           
                        <template v-if="video.videoType === 'mp4' || !video.videoType">
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
                        </template>                         
                        <VideoInfo :video="video" />                                                                      
                       <video 
                            v-if="video.videoType === 'mp4' || !video.videoType"
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
                            @play="updateCount(video, index)"
                            @timeupdate="VideoUpdateTime(video, index)"
                            @click="screenEvent(video, index)"
                        ></video>
                        <div class="shorts-container"
                            v-else
                        >
                            <iframe class="shorts-iframe" :src="`https://www.youtube.com/embed/${video.youtubeUrl}`" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                            </iframe>
                        </div>                        
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
                    <Search :videoList="videoList" />
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
                    <LoginPage @closeLy="mypageLy = false" v-if="!userStore.isLoggedIn" />
                    <VideoUpload v-else :UpLoadForm="UpLoadForm" :user_command="user_command" @uploadVideoHandler="uploadVideoHandler" @cancelUploadVideo="cancelUploadVideo" />                   
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
                   <LoginPage @closeLy="mypageLy = false" v-if="!userStore.isLoggedIn" />
                   <Mypage  @closeLy="mypageLy = false" v-else />
                </template>

            </MyLy>             
        </div>          
    </div>  
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from "@/stores/user"
const userStore = useUserStore()

// 컴포넌트 호출
import BottomBar from './components/BottomBar.vue'
import VideoUpload from './components/VideoUpload.vue'
import ShareVideo from './components/ShareVideo.vue'
import Command from './components/Command.vue'
import VideoInfo from './components/VideoInfo.vue'
import TopToolBar from './components/TopToolBar.vue'
import Heart from './components/Heart.vue'
import UserTool from './components/UserTool.vue'
import Search from './components/Search.vue'
import LoginPage from './components/Login.vue'
import Mypage from './components/Mypage.vue'

import { ref, watch, computed, onMounted, nextTick } from 'vue'
 // import Swiper core and required modules
import { Mousewheel  } from 'swiper/modules'

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
const SelectVideo = ref('')

const videoInfo = ref([
    {
       duration: ref(0),
       currentTime: ref(0)
    }
])


const Loading = ref(false)
const uploadLy = ref(false)
const topSearch = ref(false)
const mypageLy = ref(false)
const commandLy = ref(false)
const videoShareLy = ref(false)
const newVideoAlert = ref(false)

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
  videoShareLy.value = false
}
// 비디오 제어
const onSlideChangeTransitionEnd = () => {        
    console.log('slide changeaaa')
    const allvideoElement = document.querySelectorAll('.swiper-slide video')        
    allvideoElement.forEach((video, index) => {
        if(video.parentElement.parentElement.classList.contains('swiper-slide-active')) {
            video.play()
            videoList.value[index].playing = true            
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
const VideoUpdateTime = (video, index) => {
    const videoElement = videoRef.value[index]
    const videoDurationInMinutes = Math.floor(videoElement.duration / 60)
    const videoSeconds = Math.floor(videoElement.duration % 60)
    videoInfo.duration = videoDurationInMinutes + ':' + videoSeconds

    const videoWatchTime = videoElement.currentTime    
}

const updateCount = (video, index) => {    
    video.statistics.play_count++    
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
    videoType: ref(''),
    videoRandomId: ref(''),
    videoTitle: ref(''),
    videoDescription: ref(''),
    videoTag: ref(''),
    videoUploadForm: ref(''),
    uploadtime: ref(),
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

const uploadVideoHandler = (newVideo) => {
    videoList.value.push(newVideo)      
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
// 마이페이지
const member = ref([
  {
    id: ref(''),
    password: ref(''),
    memberStatus: ref(false)
  }
])
const mypageOpen = () => {
    mypageLy.value = true
}
// 즐겨찾기
const addFavorite = (video) => {
    console.log('로그인이후 이용 가능합니다.')
}
const userSubscription = (video) => {
    console.log('로그인이후 이용 가능합니다.')
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
        &.search__wrap {
            width: 100%;
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
.shorts-container {
 position: relative;
 width: 100%;
 height: 0;
 padding-bottom: 177.78%;
    .shorts-iframe {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border: none;
    } 
}
</style>