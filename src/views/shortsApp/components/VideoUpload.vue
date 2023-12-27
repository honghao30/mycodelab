<template>
    <div class="video-upload">
    <Title 
        pageTitle="영상 업로드"
        :level="3" 
    />   
        <form @submit.prevent="videoUpload">
            <template v-if="uploadState">
                <div class="video-upload-form">            
                    <VSelect
                        label="영상 선택"
                        v-model="uploadFrom.vselected"                
                        :options="options"
                        placeholder="영상 종류를 선택하세요"   
                        @update:modelValue="selectUpdate"           
                    />
                    {{ uploadFrom.vselected }}
                    <MyInput >
                        <template #input>
                            <InputEl
                                label="제목"
                                required                    
                                v-model="uploadFrom.title"         
                                maxlength="25"   
                                @focusout="Validation"
                                placeholder="제목 입력하세요"       
                                :errorMsg="error.titleErrorMsg"                                       
                            />
                        </template>
                    </MyInput>
                    <div class="input__wrap">
                        <div class="input">
                            <label for="videoDescription">영상 소개</label>
                            <textarea id="videoDescription" v-model="uploadFrom.videoDescription"
                                maxlength="35"            
                                placeholder="영상소개 입력하세요"      
                            ></textarea>
                        </div>
                    </div>                              
                    <MyInput >
                        <template #input>
                            <InputEl
                                label="태그"
                                v-model="uploadFrom.videoTag"            
                                placeholder="태그 입력하세요"                                              
                            />
                        </template>
                    </MyInput> 
                    <MyInput v-if="uploadFrom.vselected === '직업 업로드'">
                        <template #input>
                            <InputEl                                        
                                label="영상 업로드"
                                types="file"
                                v-model="uploadFrom.videoFile"            
                                placeholder="영상을 선택하세요"                                   
                                @input="onChange"                                 
                                accept=".mp4"                                       
                            />
                        </template>
                    </MyInput>       
                    <MyInput  v-else-if="uploadFrom.vselected === 'MP4 링크'">
                        <template #input>
                            <InputEl                                        
                                label="영상 URL"
                                v-model="uploadFrom.url"        
                                @focusout="checkUrl"    
                                placeholder="영상 URL 선택하세요"   
                                :errorMsg="error.urlError"                                            
                            />
                        </template>
                    </MyInput>           
                    <MyInput v-else-if="uploadFrom.vselected === '유튜브'">
                        <template #input>
                            <InputEl                                        
                                label="유튜브 영상"
                                v-model="uploadFrom.youtubeLink"       
                                @focusout="checkYoutubeLink"         
                                placeholder="유튜브 영상 정보를 입력하세요"                                              
                            />
                        </template>
                    </MyInput>
                    <!-- <div class="input__wrap">
                        <div class="input">
                            <label for="videoDescription">미리보기</label>
                            <video 
                                autoplay
                                loop
                                muted                                
                                :src="fileDisplay" 
                            />
                        </div>
                    </div>                                                                                                                             -->
                </div>    
                
                <div class="button__wrap">
                    <MyBtn                            
                        buttonName="업로드"
                        type="submit"
                        color="btn  btn-primary-line"                
                        size="medium"  
                        :disabled="!uploadFrom.title || !uploadFrom.vselected"                      
                    >  
                    </MyBtn>   
                    <MyBtn                            
                        buttonName="취소"                        
                        color="btn btn-line"
                        size="medium"
                        @click="cancelUploadVideo"
                    >  
                    </MyBtn>         
                </div>
            </template>
            <LoadingDot v-if="Loading" />
           
        </form>         
                 
</div>
</template>

<script setup>
// @import
import axios from "axios"
import { defineEmits, defineProps, ref, computed } from 'vue'
import { router } from '../../../router'

const getVideo = JSON.parse(localStorage.getItem('video'))
const VideoList = getVideo
const getMember = JSON.parse(localStorage.getItem('member'))
const MemberList = getMember

console.log('비디오', getVideo)

import getTodayDate from '@/utils/time'
const [TodayDateFull, TodayData, currentTime, TodayDateFullDash] = getTodayDate()

import { storeToRefs } from 'pinia'
import { useUsersStore } from "@/stores/users"
const usersStore = useUsersStore()
const userName = ref(usersStore.userName)

import {isUrl, chSp, randomId} from "@/views/shortsApp/assets/js/check"
let token = localStorage.getItem("access_token")
let userId = localStorage.getItem("access_id")
let nickName = localStorage.getItem('userName')

// const file = ref(null)
// let fileDisplay = ref(null)
// let errorType = ref(null)
// let fileData = ref(null)
// let isUploading = ref(false)

// v-model && ref
const uploadState = ref(true)
const Loading = ref(false)
const selected = ref('')
const vselected = ref('')
const options = [   
  {
    title: '선택하세요',
    code: '',
  },    
  {
    title: '직업 업로드',
    code: 'upload',
  },     
  {
    title: 'MP4 링크',
    code: 'mp4',
  },    
  {
    title: '유튜브',
    code: 'youtube',
  }
]
const uploadFrom = ref(
    {        
        vselected: ref(''),
        title: ref(''),
        videoDescription: ref(''),
        url: ref(''),
        videoFile: ref(''),
        videoTag: ref(''),
        youtubeLink: ref('')
    }
)    
const error = ref({
    titleErrorMsg: '',
    urlError: ''
  }
)
// function
const selectUpdate = () => {
    uploadFrom.value.vselected = event.target.value
    console.log(uploadFrom.value.vselected)
}

const Validation = async () => { 
    if(uploadFrom.value.title.length <= 2) {
        error.value.titleErrorMsg = '제목은 2자 이상 입력하셔야 합니다.'        
        uploadFrom.value.title = ''
    } else if(chSp(uploadFrom.value.title)) {
        error.value.titleErrorMsg = '특수 문자는 사용할 수 없습니다.'
        uploadFrom.value.title = ''
    } else {
        error.value.idErrorMsg = ''
    }    
}
const checkUrl = () => {
    if(!isUrl(uploadFrom.url)) {
        error.value.urlError = '정상적인 url이 아닙니다.'
        uploadFrom.value.url = ''
    } else {
        error.value.urlError = ''
    }  
}

const onChange = () => {
    alert('업로드는 지원하지 않습니다.')
    // fileDisplay.value = URL.createObjectURL(file.value.files[0])
    // fileData.value = file.value.files[0]
}

const videoUpload = () => {
    console.log(userName)
    let videoRandomId = randomId()    
    if(!token || !userId || !nickName) {
        alert('로그인 후 이용 가능 합니다.')
        router.push('/Signup')
    }
    let newVideo = {
        id: videoRandomId,
        videoType: uploadFrom.vselected,
        title: uploadFrom.title,
        url: uploadFrom.url,   
        videoFile: uploadFrom.videoFile,        
        nickName: nickName,      
        uploadtime: TodayDateFullDash,
        videoDescription: uploadFrom.videoDescription,
        videoTag: uploadFrom.videoTag,  
        youtubeLink: uploadFrom.youtubeLink,
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
    console.log(newVideo)
    uploadState.value = false    
    getVideo.push(newVideo)    
    localStorage.setItem('video', JSON.stringify(getVideo));    
    console.log(userId, getMember)    
    let user = getMember.users.find(member => member.userId === userId)
    console.log(user)
    if (user) {        
        user.uploaded.push(newVideo)
    } else {
        console.log('해당 userId를 가진 사용자를 찾을 수 없습니다.');
    }    
    Loading.value = true
    setTimeout(() => {
        Loading.value = false
    }, 1000)
}

const emit = defineEmits(['cancelUploadVideo'])

const cancelUploadVideo = () => {
  emit('cancelUploadVideo')
}
</script>

<style lang="scss">
.video-upload-form {
    margin-top: 32px;
    .input__wrap {
    .input {
        label {
            display: block;
            font-size: 16px;
            margin: 15px 0 10px;
        }
        textarea {
            width: 100%;
            height: 60px;
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 6px;
        }        
      }
      video {
        width: 300px;
        height: auto;
        margin: 0 auto;

      }
    }
}
.upload-msg {
    padding: 60px 0;
    text-align: center;
}
.loading__wrap--round {
    background: rgba(0,0,0,0.5);
    z-index: 30;
}
</style>