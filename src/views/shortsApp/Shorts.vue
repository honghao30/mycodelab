<template>
    <div>
        <MyBtn                            
            buttonName="허용"                    
            color="btn primary"                    
            size="medium"    
            @click="allowCookie"                    
        >  
        </MyBtn> 
        <div>
            <MyBtn                            
            buttonName="마이페이지"                    
            color="btn primary"                    
            size="medium"    
            @click="isActive = !isActive"            
        >  
        </MyBtn>
            <div v-if="isActive && usersStore.isLoggedIn">{{ userName }}마이페이지</div>            
        </div>
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


// ref && v-model
const isActive = ref(false)


// function
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