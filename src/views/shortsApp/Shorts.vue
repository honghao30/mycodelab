<template>
    <div>
        <MyBtn                            
            buttonName="허용"                    
            color="btn primary"                    
            size="medium"    
            @click="allowCookie"                    
        >  
        </MyBtn> 
        <!-- <MyBtn                            
            buttonName="업로드"                    
            color="btn primary"                    
            size="medium"    
            @click="upLoadVideo"                    
        >  
        </MyBtn>  -->
        <div>
            <MyBtn                            
            buttonName="마이페이지"                    
            color="btn primary"                    
            size="medium"    
            @click="isActive = !isActive"
            :disabled="!usersStore.isLoggedIn"         
        >  
        </MyBtn>
            <div v-if="isActive && usersStore.isLoggedIn">{{ userName }}마이페이지</div>            
        </div>
        <!-- // layer 영상 업로드 && usersStore.isLoggedIn-->
        <MyLy                
            height="100%"
            left="0"
            bottom="0"
            v-if="uploadLy"
            @closeLy="uploadLy = false" 
        > 
            <template #layerContent>                
                <VideoUpload  @cancelUploadVideo="cancelUploadVideo" />                   
            </template>

        </MyLy>     
        <!-- // layer 영상 마이페이지-->

    </div>
</template>

<script setup>
// import 
import axios from 'axios';
import { ref, watch, computed, onMounted, nextTick, defineProps} from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from "@/stores/users"
const usersStore = useUsersStore()
const userName = ref(usersStore.userName)

import { getShort } from '@/views/shortsApp/api/getData'
const { MemberList, VideoList } = getShort()

import { router } from '../../router'

// cmp import 
import VideoUpload from './components/VideoUpload.vue'

// ref && v-model
const isActive = ref(false)
const uploadLy = ref(true)

// function
const upLoadVideo = () => {
    if(usersStore.isLoggedIn) {
        uploadLy.value = true
    } else {
        router.push('/Signup')
    }
}

const allowCookie = () => {
    const videoData = JSON.stringify(VideoList)
    window.localStorage.setItem('video', videoData)
    const memberData = JSON.stringify(MemberList)
    window.localStorage.setItem('member', memberData)     
    //cookieAlert.value = false
}
</script>

<style>

</style> 