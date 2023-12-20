<template>
    <div class="video-upload">
    <Title 
        pageTitle="영상 업로드"
        :level="3" 
    />                        
    <div class="video-upload-form">
        <VSelect
            label="영상 선택"
            v-model="UpLoadForm.vselected"
            :options="options"
            placeholder="영상 종류를 선택하세요"              
        />
        <MyInput >
            <template #input>
                <InputEl
                    label="제목"
                    required                    
                    v-model="UpLoadForm.videoTitle"            
                    placeholder="제목 입력하세요"       
                    errorMsg="제목을 입력하세요"                                       
                />
            </template>
        </MyInput>
        <MyInput >
            <template #input>
                <InputEl
                    label="영상 소개"
                    v-model="UpLoadForm.videoDescription"            
                    placeholder="영상소개 입력하세요"                                              
                />
            </template>
        </MyInput>                            
        <MyInput >
            <template #input>
                <InputEl
                    label="태그"
                    v-model="UpLoadForm.videoTag"            
                    placeholder="태그 입력하세요"                                              
                />
            </template>
        </MyInput> 
        <MyInput >
            <template #input>
                <InputEl                                        
                    label="영상 URL"
                    v-model="UpLoadForm.videoUrl"            
                    placeholder="영상 URL 선택하세요"                                              
                />
            </template>
        </MyInput>       
        <MyInput >
            <template #input>
                <InputEl                                        
                    label="영상 업로드"
                    types="file"
                    v-model="UpLoadForm.videoUploadForm"            
                    placeholder="영상을 선택하세요"                                              
                />
            </template>
        </MyInput>     
        <MyInput >
            <template #input>
                <InputEl                                        
                    label="유튜브 영상"
                    v-model="UpLoadForm.youtubeUrl"            
                    placeholder="유튜브 영상 정보를 입력하세요"                                              
                />
            </template>
        </MyInput>                                                                                                        
    </div>    
    <div class="button__wrap">
        <Button
            buttonName="업로드"
            types="btn-primary-line"
            size="medium"
            :disabled="!UpLoadForm.videoTitle || !UpLoadForm.videoUploadForm && !UpLoadForm.videoUrl && !UpLoadForm.youtubeUrl"
            @click="uploadVideoConfirm"
        />
        <Button
            buttonName="취소"
            types="btn-line"
            size="medium"
            @click="cancelUploadVideo"
        />                            
    </div>
    {{ UpLoadForm.vselected }} {{ UpLoadForm.videoTitle }}
</div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue'
import getTodayDate from '@/utils/time'
const [TodayDateFull, TodayData, currentTime, TodayDateFullDash] = getTodayDate()

const props = defineProps({
  UpLoadForm: {
    type: Object,
    default: () => ({})
  },
  error:  {
    type: Array,
    default: () => []
  }
})
const options = [   
  {
    title: '직접 업로드',
    code: 'mp4',
  },    
  {
    title: '유튜브',
    code: 'youtube',
  }
]
const vselected = ref('선택하세요')
const selected = ref('')

const emit = defineEmits(['uploadVideoHandler', 'cancelUploadVideo'])

const randomId = () => {
  let N = 1000000;
  let M = 1;
  let tt = Math.random()*N;
  return Math.floor(tt)+M;
}

const uploadVideoConfirm = () => {
    let videoRandomId = randomId();
    let newVideo = {
        id: videoRandomId,
        videoType: props.UpLoadForm.vselected,
        title: props.UpLoadForm.videoTitle,
        url: props.UpLoadForm.videoUrl,   
        videoUploadForm: props.UpLoadForm.videoUploadForm,        
        nickName: 'manage',      
        uploadtime: TodayDateFullDash,  
        videoDescription: props.UpLoadForm.videoDescription,
        videoTag: props.UpLoadForm.videoTag,  
        youtubeUrl: props.UpLoadForm.youtubeUrl,
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
    emit('uploadVideoHandler', newVideo)
}

const cancelUploadVideo = () => {
  emit('cancelUploadVideo')
}
</script>

<style>

</style>