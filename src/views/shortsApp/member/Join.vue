<template>
  <div class="member__wrap">
    <div class="member__wrap--inner">
        <Title 
            :level="2" 
            pageTitle="회원가입"
        />
        <div class="member-page__wrap">           
            <div class="member-page__form">
                <form @submit.prevent="registration">
                    <ul>
                        <li>
                            <MyInput >
                                <template #input>
                                    <InputEl                                        
                                        v-model="userId"
                                        label="이메일 아이디"
                                        required                                                
                                        placeholder="이메일 주소를 입력하세요"    
                                        errorMsg="아이디를 입력하세요"                                                                   
                                    />                
                                </template>         
                            </MyInput>                                             
                        </li>
                        <li>
                            <MyInput >
                                <template #input>
                                    <InputEl         
                                        label="비밀번호"                               
                                        v-model="password"
                                        required     
                                        types="password"                                          
                                        placeholder="비밀번호를 입력하세요"  
                                        errorMsg="비밀번호를 입력하세요"                                                                          
                                    />                
                                </template>         
                            </MyInput>                          
                        </li>    
                        <li>
                            <MyInput >
                                <template #input>
                                    <InputEl     
                                        label="비밀번호 확인"
                                        v-model="passwordRe"
                                        required     
                                        types="password"                                          
                                        placeholder="비밀번호를 다시 한번 입력하세요"  
                                        errorMsg="비밀번호 다시 한번 입력하세요"                                                                          
                                    />                
                                </template>         
                            </MyInput>                          
                        </li>
                        <li>
                            <MyInput >
                                <template #input>
                                    <InputEl            
                                        label="이름"                            
                                        v-model="Name"
                                        required                                             
                                        placeholder="이름을 입력하세요"  
                                        errorMsg="이름을 입력하세요."                                                                          
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
                        <!-- :disabled="!newMember.userId || !newMember.password || !newMember.passwordRe || !newMember.Name" -->
                        <MyBtn                            
                            buttonName="취소"                        
                            color="btn secondary"
                            size="medium"
                            @click="cancelJoinStep" 
                        >  
                        </MyBtn>                    
                    </div>             
                </form>
            </div>        
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick, defineProps, defineEmits } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from "@/stores/users"
const userStore = useUsersStore()

const userId = ref('')
const password = ref('')
const passwordRe = ref('')
const Name = ref('')

// const registration = () => {
//     let newUser = {
//         userId: email.value,
//         password: password.value,
//         passwordRe: passwordRe.value,
//         Name: Name.value
//     }
//     console.log("Registration", newUser)
// }
const registration  = async () => {                
    await userStore.registrations(userId.value, password.value,Name.value)       
}
const cancelJoinStep = () => {

}
</script>
