<template>
    <div class="member-page__form">
        <p class="title">로그인이 필요한 서비스입니다.</p>
        <form @submit.prevent="submitLogin">
            <ul>
                <li>
                    <MyInput >
                        <template #input>
                            <InputEl                                        
                                v-model="userInfo.userId"
                                required                                                
                                placeholder="아이디를 입력하세요" 
                                :guideMsg="guideMsgId" 
                                :errorMsg="error.idErrorMsg"                                                                   
                            />                
                        </template>         
                    </MyInput>                          
                </li>
                <li>
                    <MyInput >
                        <template #input>
                            <InputEl                                        
                                v-model="userInfo.password"
                                required     
                                types="password"     
                                :guideMsg="guideMsgPw"                                      
                                placeholder="비밀번호를 입력하세요"  
                                :errorMsg="error.pwErrorMsg"                                                                          
                            />                
                        </template>         
                    </MyInput>                          
                </li>                    
            </ul>                          
            <div class="button__wrap">
                <MyBtn                            
                    buttonName="로그인"
                    type="submit"
                    color="btn primary"                    
                    size="medium"                        
                >  
                </MyBtn>   
                <MyBtn                            
                    buttonName="취소"                        
                    color="btn secondary"
                    size="medium"
                    @click="$router.go(-1)" 
                >  
                </MyBtn>                    
            </div>   
            <div class="help-msg">
                <router-link to="/Register">
                    회원가입
                </router-link>
                <router-link to="#" @click="isAlert(event)">
                    아이디 찾기
                </router-link>                           
                <router-link to="#" @click="isAlert(event)">
                    비밀번호 찾기
                </router-link>                          
            </div>          
        </form>
        <div class="sns__login">
            <a id="custom-login-btn" @click="kakaoLogin()">
            <img
                src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                width="222"
                alt="카카오 로그인 버튼"
            />
            </a>
            <div @click="kakaoLogout()">로그아웃</div>    
            <div> 
                <button @click="handleGoogleAccessTokenLogin">Google</button>
                <GoogleLogin :callback="callback" />
                 <p>
                {{ data }}
                </p>
                <button
                type="button"
                @click="handleGoogleAuthCodeLogin"
                >
                Google 
                </button>
            </div>        
        </div>
    </div>  
</template>

<script setup>
//import
import { reactive, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from "@/stores/auth"
const authStore = useAuthStore()

// ref && v-model
const kakao_account = ref(null);
const ninkname = ref(null);
const userInfo = reactive(
    {
        userId: '',
        password: ''
    }
)
const guideMsgId = ref(['이메일로 아이디를 입력하세요.'])
const guideMsgPw = ref(['영문, 숫자 8자리 비밀번호를 입력하세요.'])
const userId = ref('')
const password = ref('')
// const member = ref({
//     userId: '',
//     password: ''
// })
const error = ref({
    idErrorMsg: '',
    pwErrorMsg: '' 
  }
)

// function
const submitLogin  = async () => {          
   await authStore.signIn(userInfo) 
}

const kakaoLogin = () => {
  window.Kakao.Auth.login({
    scope: "profile_image",
    success: getKakaoAccount,
  });
}

const getKakaoAccount = () => {
  window.Kakao.API.request({
    url: "/v2/user/me",
    success: (res) => {
      kakao_account.value = res.kakao_account;
      ninkname.value = kakao_account.value.profile.ninkname;      
      console.log("ninkname", ninkname.value);
      //로그인처리구현

      alert("로그인 성공!");
    },
    fail: (error) => {
      console.log(error);
    },
  });
}

const kakaoLogout = () => {
  window.Kakao.Auth.logout((res) => {
    console.log(res);
  });
}

// 구글 로그인
const data = ref()

const callback = (response) => {
  data.value = response
}

import { googleTokenLogin } from 'vue3-google-login'

const GOOGLE_CLIENT_ID = '31662281107-vifc3im7p4vqm4gr1giabglve55egere.apps.googleusercontent.com'


const handleGoogleAccessTokenLogin = () => {
  googleTokenLogin({
    clientId: GOOGLE_CLIENT_ID
  }).then((response) => {
    data.value = response
  })
}
import { googleAuthCodeLogin } from 'vue3-google-login'
const handleGoogleAuthCodeLogin = () => {
  googleAuthCodeLogin({
    clientId: GOOGLE_CLIENT_ID
  }).then((response) => {
    data.value = response
  })
}
</script>

<style>

</style>