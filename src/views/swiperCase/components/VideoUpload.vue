<template>
    <div class="video-upload">
    <Title 
        pageTitle="영상 업로드"
        :level="3" 
    />                        
    <div class="video-upload-form">
        <VSelect
            label="영상 선택"
            v-model="vselected"
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
            :disabled="!UpLoadForm.videoTitle || !UpLoadForm.videoUploadForm && !UpLoadForm.videoUrl"
            @click="uploadVideoConfirm"
        />
        <Button
            buttonName="취소"
            types="btn-line"
            size="medium"
            @click="cancelUploadVideo"
        />                            
    </div>
    {{ UpLoadForm.videoTitle }}
</div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue'

const props = defineProps({
  UpLoadForm: {
    type: Array,
    default: () => []
  },
  error:  {
    type: Array,
    default: () => []
  }
})
const options = [   
  {
    title: '직접 업로드',
    code: '직접 업로드',
  },    
  {
    title: '유튜브',
    code: '유튜브',
  }
]
const vselected = ref('선택하세요')
const selected = ref('')
const changeSelected = (option) => {  
  selected.value = option.title
}
const onChangeNumber = (value) => {
  console.log('수신정보', value)
  userName.value = value
}

const emit = defineEmits(['uploadVideoConfirm', 'cancelUploadVideo'])

const uploadVideoConfirm = () => {
  emit('uploadVideoConfirm')
}

const cancelUploadVideo = () => {
  emit('cancelUploadVideo')
}
</script>

<style>

</style>