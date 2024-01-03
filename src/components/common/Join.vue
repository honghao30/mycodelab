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
                                guideMsg="이메일 아이디를 입력하세요"                                                                      
                                placeholder="이메일 주소를 입력하세요"    
                                :errorMsg="error.idErrorMsg"                                                                 
                            />                
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
                                types="password"                                                                           
                                placeholder="비밀번호를 입력하세요"                                                                                                                     
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
                                types="password"                                  
                                :errorMsg="error.pwErrorMsg"                                                                       
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
                                placeholder="이름을 입력하세요"                                                                      
                            />                
                        </template>         
                    </MyInput>                          
                </li>                                                                    
            </ul>        
            {{ newMember.userId }}        
            <div class="button__wrap">
                <MyBtn                            
                    buttonName="회원가입"
                    type="submit"
                    color="btn primary"                            
                    size="medium"                                    
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
import { ref, watch, computed, onMounted, nextTick, defineProps, defineEmits, reactive } from 'vue'
import getTodayDate from '@/utils/common'
import { storeToRefs } from 'pinia'
import { useAuthStore } from "@/stores/auth"
const authStore = useAuthStore()

const newMember = reactive({
    userId: '',
    password: '',
    passwordRe: '',
    Name: '',
    GreatAt: getTodayDate()
})
// const userId = ref('')
// const password = ref('')
// const passwordRe = ref('')
// const Name = ref('')

const error = ref({
    idErrorMsg: '',
    pwErrorMsg: '' 
  }
)

const registration  = async () => {                        
    await authStore.signup(newMember)       
}
</script>