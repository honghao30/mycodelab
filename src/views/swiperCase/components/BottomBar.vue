<template>
    <div class="bottom-menu__wrap">
        <MyBtn                            
            buttonName="홈"
            iconName="icon-home"
            svgIcon="icon-home"            
            iconDirection="top"    
            @click="goHome()"  
        >
        </MyBtn>  
        <MyBtn                            
            buttonName="구독"    
            iconName="icon-subscribe"
            svgIcon="icon-subscribe"                        
            iconDirection="top"                                                                                                         
        >
        </MyBtn>              
        <MyBtn                            
            buttonName="업로드"
            iconOnly
            iconName="icon-plus"
            svgIcon="icon-plus"
            @click="videoUpload()"                                                                                             
        >
        </MyBtn>
        <MyBtn                            
            buttonName="알림"
            iconName="icon-inbox"
            svgIcon="icon-inbox"             
            iconDirection="top"                                                                                                         
        >
        </MyBtn>        
        <MyBtn                            
            buttonName="프로필"
            iconName="icon-profile"
            svgIcon="icon-profile"               
            iconDirection="top"  
            @click="mypageOpen()"                                                                        
        >
        </MyBtn>                                 
    </div>    
</template>

<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['goHome', 'videoUpload', 'mypageOpen'])

const goHome = () => {
  emit('goHome')
}

const videoUpload = () => {
  emit('videoUpload')
}

const mypageOpen = () => {
  emit('mypageOpen')
}
</script>

<style lang="scss">
        .bottom-menu__wrap {
            background: #000;
            color: #fff;
            height: 50px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-content: center;
            
            button {
                width: calc(100% / 5);
                line-height: 1.2;
                padding: 2px 0;
                display: flex;
                align-items: center;
                justify-content: center;  
                &.top {
                    flex-direction: column;
                    gap: 1px;
                    i {   
                        width: 25px;
                        height: 25px;                                                
                        img {
                            filter: invert(100%);
                            width: 25px;
                        }
                    }
                }  
                .icon-plus {
                    width: 40px;
                    height: 40px;                                                
                    img {
                        filter: invert(100%);
                        width: 40px;
                    }
                }                            
            }
        }
</style>