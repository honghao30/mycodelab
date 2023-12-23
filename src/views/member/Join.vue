<template>
  <div class="join__wrap">
    <div class="join__wrap--inner">
        <Title 
            :level="2" 
            pageTitle="회원가입"
        />
        <div class="join__form">
            <form @submit.prevent="registration">
                <ul>
                    <li>
                        <MyInput >
                            <template #input>
                                <InputEl                                        
                                    v-model="newMember.userId"
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
                                    v-model="newMember.password"
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
                                    v-model="newMember.passwordRe"
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
                                    v-model="newMember.Name"
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
                        :disabled="!newMember.userId || !newMember.password || !newMember.passwordRe || !newMember.Name"
                        size="medium"                        
                    >  
                    </MyBtn>   
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
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick, defineProps, defineEmits } from 'vue'
const newMember = ref([
  {
    userId: ref(''),
    password: ref(''),
    passwordRe: ref(''),
    Name: ref('')
  }
])
const registration = () => {
    console.log("Registration")
}
const cancelJoinStep = () => {

}
</script>

<style lang="scss">
.join__wrap {
    width: 100%;
    .join__wrap--inner {
        width: 100%;
        max-width: 1280px;
        margin: 0 auto;
        padding: 30px 20px;
    }
    .join__form {
        margin-top: 50px;
        ul {
            li {margin: 15px 0;}
        }
        .btn-close-circle {
            top: 39px;
        }
    }
}
</style>