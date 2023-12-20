<template>
    <ul class="user-action">
        <li>            
            <div class="profile__wrap">
                <img src="images/temp/icon-profile-user.svg" alt="">
                <MyBtn                            
                    buttonName="구독"
                    iconOnly="true"
                    iconName="icon-subscribe"                                                       
                >
                    <template #svg-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15px" height="15px" viewBox="0 0 15 15" version="1.1">
                            <g id="surface1">
                                <rect x="0" y="0" width="15" height="15" style="fill:rgb(100%,100%,100%);fill-opacity:1;stroke:none;"/>
                                <path style=" stroke:none;fill-rule:evenodd;fill:red;fill-opacity:1;" d="M 8.125 5.625 C 8.125 5.28125 7.84375 5 7.5 5 C 7.15625 5 6.875 5.28125 6.875 5.625 L 6.875 6.875 L 5.625 6.875 C 5.28125 6.875 5 7.15625 5 7.5 C 5 7.84375 5.28125 8.125 5.625 8.125 L 6.875 8.125 L 6.875 9.375 C 6.875 9.71875 7.15625 10 7.5 10 C 7.84375 10 8.125 9.71875 8.125 9.375 L 8.125 8.125 L 9.375 8.125 C 9.71875 8.125 10 7.84375 10 7.5 C 10 7.15625 9.71875 6.875 9.375 6.875 L 8.125 6.875 Z M 1.25 7.5 C 1.25 4.046875 4.046875 1.25 7.5 1.25 C 10.953125 1.25 13.75 4.046875 13.75 7.5 C 13.75 10.953125 10.953125 13.75 7.5 13.75 C 4.046875 13.75 1.25 10.953125 1.25 7.5 Z M 1.25 7.5 "/>
                            </g>
                        </svg>
                    </template>
                </MyBtn>                
            </div>
        </li>                            
        <li>
            <MyBtn                            
                buttonName="좋아요"
                iconOnly="true"
                :Counter="video.statistics.like_count"
                @click="videoLike(video)"                                                                       
            >
                <template #svg-icon>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="36px" height="36px" viewBox="0 0 36 36" version="1.1">
                    <g id="surface1">
                        <path  class="basic-color" :class="{'active-color': video.active == true}"  style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 25.929688 1.125 C 22.386719 1.125 19.40625 3.148438 18 6.074219 C 16.59375 3.148438 13.613281 1.125 10.070312 1.125 C 5.175781 1.125 1.125 5.289062 1.125 10.070312 C 1.125 18.226562 18 34.875 18 34.875 C 18 34.875 34.875 18.226562 34.875 10.070312 C 34.875 5.289062 30.824219 1.125 25.929688 1.125 Z M 25.929688 1.125 "/>
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
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="36px" height="36px" viewBox="0 0 36 36" version="1.1">
                        <g id="surface1">
                            <path  class="basic-color" style=" stroke:none;fill-rule:nonzero;fill-opacity:1;"  d="M 6 1.5 C 3.515625 1.5 1.5 3.515625 1.5 6 L 1.5 22.5 C 1.5 24.984375 3.515625 27 6 27 L 9 27 L 9 33 C 9 33.582031 9.335938 34.113281 9.863281 34.359375 C 10.390625 34.605469 11.011719 34.523438 11.460938 34.152344 L 20.042969 27 L 30 27 C 32.484375 27 34.5 24.984375 34.5 22.5 L 34.5 6 C 34.5 3.515625 32.484375 1.5 30 1.5 Z M 6 1.5 "/>
                        </g>
                    </svg>  
                </template>
            </MyBtn>
        </li>
        <li>
            <MyBtn                            
                buttonName="즐겨찾기"                                    
                iconOnly="true"   
                :Counter="0"                                                                                                                                                    
            >
                <template #svg-icon>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="36px" height="36px" viewBox="0 0 36 36" version="1.1">
                        <g id="surface1">
                        <path class="basic-color" style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 4.5 0 L 4.5 36 L 18 29.453125 L 31.5 36 L 31.5 0 Z M 4.5 0 "/>
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
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="36px" height="36px" viewBox="0 0 36 36" version="1.1">
                        <g id="surface1">
                         <path  class="basic-color" style="stroke:none;fill-rule:nonzero;fill-opacity:1;"  d="M 30.003906 23.996094 C 27.957031 23.996094 26.148438 25.03125 25.066406 26.59375 L 11.769531 19.554688 C 11.902344 19.054688 12.003906 18.542969 12.003906 18 C 12.003906 17.457031 11.910156 16.945312 11.769531 16.445312 L 25.066406 9.40625 C 26.148438 10.976562 27.949219 12.003906 30.003906 12.003906 C 33.3125 12.003906 36 9.316406 36 6.003906 C 36 2.691406 33.3125 0 30.003906 0 C 26.691406 0 24.003906 2.6875 24.003906 5.996094 C 24.003906 6.054688 24.019531 6.109375 24.019531 6.167969 L 10.027344 13.578125 C 8.957031 12.605469 7.558594 12.003906 6.003906 12.003906 C 2.6875 12.003906 0 14.6875 0 18 C 0 21.3125 2.6875 23.996094 5.996094 23.996094 C 7.550781 23.996094 8.949219 23.394531 10.019531 22.421875 L 24.011719 29.832031 C 24.011719 29.890625 23.996094 29.945312 23.996094 30.003906 C 23.996094 33.3125 26.683594 36 29.996094 36 C 33.308594 36 35.992188 33.3125 35.992188 30.003906 C 35.992188 26.691406 33.3125 23.996094 30.003906 23.996094 Z M 30.003906 23.996094 "/>
                        </g>
                    </svg>
                </template>
            </MyBtn>
        </li>                                                                                 
    </ul>     
</template>

<script setup>
import { defineProps, defineEmits,onMounted } from 'vue'
const emit = defineEmits(['videoShare', 'commandLyOpen','videoLike'])

const props = defineProps({
  video: {
    type: Object,
    required: true
  }
})

const videoShare = () => {
  emit('videoShare', props.video)
}

const commandLyOpen = () => {
  emit('commandLyOpen', props.video)
}

const videoLike = () => {
  emit('videoLike', props.video)
}
</script>

<style lang="scss">
.profile__wrap {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    border: 1px solid #ccc;
    background: #fff;
    button {
        position: absolute;
        bottom:5px;
        left:50%;
        transform: translateX(-50%);
        border-radius: 50%;
        overflow: hidden;
        width: 15px;
        height: 15px;        
    }
}
</style>