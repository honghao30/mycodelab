<template>
    <div class="video-upload">
        <Title 
            pageTitle="회원가입"
            :level="3" 
        />
        <div class="login-page__wrap">        
            <div class="login-page__form">
                <p class="title">간편 회원가입을 진행합니다.</p>
                <form @submit.prevent="submitForm">
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
                                        v-model="userName"
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
                            :disabled="!userId || !password"
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

</script>

<style>

</style>