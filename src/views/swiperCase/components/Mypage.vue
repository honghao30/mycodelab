<template>
    <div class="mypage__wrap">
        <Title 
            pageTitle="마이 페이지"
            :level="3" 
        />
        <div class="mypage__content">
            <div class="myPage__top--banner">
                <div class="profile"></div>
            </div>
            <div class="member__info">
                <div>{{ userName }} 님</div>
                <MyBtn                            
                    buttonName="프로필 수정"
                    type="submit"
                    color="btn primary"                    
                    size="medium"      
                    @click="modifyProfile"                  
                >  
                </MyBtn>      

                <MyBtn                            
                    buttonName="로그아웃"
                    type="submit"
                    color="btn secondary"                    
                    size="medium"      
                    @click="userStore.logOut"                  
                >  
                </MyBtn>                              
            </div>
            <div class="profile-modify" v-if="profile">
                <MyInput >
                    <template #input>
                        <InputEl                                        
                            v-model="profileBanner"
                            types="file"                                                                        
                            placeholder="배너 이미지 업로드 하세요"    
                            errorMsg="배너 이미지 업로드 하세요"                                                                   
                        />                
                    </template>         
                </MyInput>  
                <MyInput >
                    <template #input>
                        <InputEl                                        
                            v-model="profilePhoto"
                            types="file"                                                                        
                            placeholder="프로필 이미지 업로드 하세요"    
                            errorMsg="프로필 이미지 업로드 하세요"                                                                   
                        />                
                    </template>         
                </MyInput>    
                <div class="button__wrap">
                    <MyBtn                            
                        buttonName="수정"                    
                        color="btn primary"                    
                        size="medium"    
                        @click="fileUpLoad"                    
                    >  
                    </MyBtn>  
                </div>                                            
            </div>
            <div class="my-info">
                <Title 
                    pageTitle="내가 올린 영상"
                    :level="4" 
                />
                <div class="mypage-result">

                </div>
                <Title 
                    pageTitle="내가 즐겨찾기 한 영상"
                    :level="4" 
                />
                <div class="mypage-result">
                    
                </div>    
                <Title 
                    pageTitle="내가 좋아요 한 영상"
                    :level="4" 
                />
                <div class="mypage-result">
                    {{ userLiked }}
                </div>                            
            </div>
        </div>
    </div>  
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick, defineProps, defineEmits } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from "@/stores/user"
const userStore = useUserStore()
const userName = ref(userStore.userName)

const profileBanner = ref('')
const profilePhoto = ref('')

const profile = ref(false)
const modifyProfile = () => {
    profile.value = true
}
const fileUpLoad = () => {
    profile.value = false
}
</script>

<style lang="scss">
.mypage__wrap {
    padding: 20px;
}
.mypage__content {
    .myPage__top--banner {
        width: 100%;
        height: 250px;
        position: relative;
        background-position: center center;
        background-size: 100% 100%;  
        border-bottom: 1px solid #ccc;
        .profile {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 1px solid #ccc;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom:-40px;
            background-color: #fff;
        }     
    }    
    .member__info {
        width: 100%;
        margin-top:30px;
        text-align: center;
        padding: 10px 0;
        button {
            margin: 10px 2px 0 2px;            
        }
    }    
    .page-title4 {
        font-size: 15px;
        font-weight: 500;
        margin-top: 20px;
    }
    .mypage-result {
        margin-top: 10px;
    }
}
</style>