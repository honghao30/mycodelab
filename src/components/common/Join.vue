<template>
    <div class="member-page__form">
        <form @submit.prevent="registration">
            <ul>
                <li>
                    <MyInput >
                        <template #input>
                            <InputEl                                        
                                v-model="newMember.userId"
                                label="이메일 아이디"
                                required       
                                refInfo="userId"    
                                :autofocus="autofocus"                                        
                                :guideMsg="guideMsgId"
                                placeholder="이메일 주소를 입력하세요"
                                @focusout="checkUserId"    
                                :errorMsg="error.idErrorMsg"                                                                 
                            /> 
                            <MyBtn                            
                                buttonName="중복확인"    
                                color="btn btn-primary-line"  
                                size="medium"   
                                :disabled="!isIdCheck" 
                                @click="checkId"                                                                       
                            >
                            </MyBtn>                            
                        </template> 
                    </MyInput>               
                </li>
                <li>
                    <MyInput >
                        <template #input>
                            <InputEl         
                                label="비밀번호"                               
                                v-model="newMember.password"
                                required    
                                :autofocus="autofocus"                                        
                                :guideMsg="guideMsgPw"
                                types="password"                                                                           
                                placeholder="비밀번호를 입력하세요"  
                                @focusout="checkPassword"     
                                :errorMsg="error.pwErrorMsg"                                                                                                                                                     
                            />                
                        </template>         
                    </MyInput>                          
                </li>    
                <li>
                    <MyInput >
                        <template #input>
                            <InputEl     
                                label="비밀번호 확인"
                                v-model="newMember.passwordRe"
                                required     
                                :autofocus="autofocus" 
                                types="password"          
                                @focusout="checkPasswordConfirm"    
                                :guideMsg="guideMsgRePw"                     
                                :errorMsg="error.pwReErrorMsg"                                                                       
                                placeholder="비밀번호를 다시 한번 입력하세요"                                                                                                                   
                            />                
                        </template>         
                    </MyInput>                          
                </li>
                <li>
                    <MyInput >
                        <template #input>
                            <InputEl            
                                label="이름"                            
                                v-model="newMember.Name"
                                required      
                                :guideMsg="guideMsgName"     
                                @focusout="checkName"     
                                :errorMsg="error.Name"                                                                                              
                                placeholder="이름을 입력하세요"                                                                      
                            />                
                        </template>         
                    </MyInput>                          
                </li>                                                                    
            </ul>                    
            <div class="button__wrap">
                <MyBtn                            
                    buttonName="회원가입"
                    type="submit"
                    color="btn primary"                            
                    size="medium"    
                    :disabled="!newMember.userId || !newMember.password || !newMember.Name"                                
                >  
                </MyBtn>                           
                <MyBtn                            
                    buttonName="취소"                        
                    color="btn secondary"
                    size="medium"
                    @click="$router.go(-2)" 
                >  
                </MyBtn>                    
            </div>             
        </form>
    </div> 
</template>

<script setup>
import axios from "axios"
import crypto from "@/plugins/cryto.js";
import { ref, watchEffect, computed, onMounted, nextTick, defineProps, defineEmits, reactive } from 'vue'
import { getTodayDate } from '@/utils/common'
import { storeToRefs } from 'pinia'
import { useAuthStore } from "@/stores/auth"
import checkVal from '@/utils/validation'

const authStore = useAuthStore()
const guideMsgId = ref(['이메일로 아이디를 입력하세요.'])
const guideMsgPw = ref(['영문, 숫자 8자리 비밀번호를 입력하세요.'])
const guideMsgRePw = ref(['정확한 비밀번호를 다시 한번 입력하세요.'])
const guideMsgName = ref(['이름을 입력하세요.'])
const isIdCheck = ref(false)
// 리턴후 포커스 부분 추후 처리 예정
const newMember = reactive({
    userId: '',
    password: '',
    passwordRe: '',
    Name: '',
    GreatAt: getTodayDate()
})
const error = ref({
    idErrorMsg: '',
    pwErrorMsg: '', 
    pwReErrorMsg: '',
    nameErrorMsg: ''
  }
)
// function
const checkId = async () => {
    await authStore.confirmId(newMember.userId)
}
const checkUserId = (event) => {    
    if (checkVal.isEmpty(newMember.userId)) {
        error.value.idErrorMsg = "이메일 아이디를 입력하세요"
        newMember.userId = ''                  
        event.target.focus()
        return
    } else if(!checkVal.isEmail(newMember.userId)) {
        error.value.idErrorMsg = "아이디는 이메일 입니다."
        newMember.userId = ''
        autofocus.value = true 
        event.target.focus()
        return
    } else {
        error.value.idErrorMsg = ''
        isIdCheck.value = true
    }
}
const checkPassword = (event) => {
    if (checkVal.isEmpty(newMember.password)) {
        error.value.pwErrorMsg = "비밀번호를 입력하세요."
        newMember.password = ''         
        event.target.focus()      
        return
    } else if(!checkVal.isPassWord(newMember.password)) {
        error.value.pwErrorMsg = "비밀번호는 영문,숫자 조합 6자리이상 입력하세요."
        newMember.password = ''         
        event.target.focus()          
        return
    } else {
        error.value.pwErrorMsg = ''
    }
}
const checkPasswordConfirm = (event) => {
    if (checkVal.isEmpty(newMember.passwordRe)) {
        error.value.pwReErrorMsg = "비밀번호 확인을 입력하세요."
        newMember.passwordRe = ''         
        event.target.focus()      
        return
    } else if(newMember.password !== newMember.passwordRe) {
        error.value.pwReErrorMsg = "비밀번호가 일치하지 않습니다."
        newMember.passwordRe = ''         
        event.target.focus()          
        return
    } else {
        error.value.passwordRe = ''
    }
}
const checkName = (event) => {
    if (checkVal.isEmpty(newMember.Name)) {
        error.value.nameErrorMsg = "이름을 입력하세요."
        newMember.Name = ''         
        event.target.focus()      
        return
    } else {
        error.value.nameErrorMsg = ''
    }    
}
const registration  = async () => {    
    newMember.password = crypto.encryptData(newMember.password);                    
    await authStore.signup(newMember)       
}
</script>