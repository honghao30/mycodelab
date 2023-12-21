<template>
<div class="video-upload">
    <Title 
        pageTitle="마이 페이지"
        :level="3" 
    />
    <div class="login-page__wrap">        
        <div class="login-page__form">
            <p class="title">로그인이 필요한 서비스입니다.</p>
            <form @submit.prevent="submitForm">
                <ul>
                    <li>
                        <MyInput >
                        <template #input>
                            <InputEl                                        
                                v-model="member.id"                                                 
                                placeholder="아이디를 입력하세요"                                                                      
                            />                
                        </template>         
                    </MyInput>                          
                    </li>
                    <li>
                        <MyInput >
                            <template #input>
                                <InputEl                                        
                                    v-model="member.password"       
                                    type="password"                                          
                                    placeholder="비밀번호를 입력하세요"                                                                      
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
                        @click="$emit('closeLy')" 
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
const member = ref({
    id: '',
    password: ''
})

const submitForm = () => {
    console.log(member, member.value.id)
}
</script>

<style lang="scss">
.login-page__form {
    padding: 100px 0;
    width: 100%;
    max-width: 70%;
    margin: 0 auto;
    .title {
        font-size: 18px;
        margin-bottom:10px;
    }
    ul {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
}
</style>