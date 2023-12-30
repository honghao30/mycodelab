<template>
    <div class="screen-heart" :class="{'is-active': likeCondition == true}">
        <div class="heart__wrap">
            <div class="left"></div>
            <div class="right"></div>
        </div>                             
    </div>  
</template>

<script setup>
import { defineEmits,defineProps, ref } from 'vue'

const props = defineProps({
    likeCondition: {
        type: Boolean,
        default: false
    }
})
</script>

<style lang="scss">
    .screen-heart {
        display: flex;
        width: 100%;
        height: 40%;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 24;
        display: none;
        opacity: 0;
        &.is-active {
            opacity: 1;
            display: flex;
            .heart__wrap {
                animation: Beat 2s infinite ease-in-out;      
            }
        }
        .heart__wrap {
            position: relative;
            max-width: 5vw;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;                             
        }

        .left {
            background-color: red;
            height: 10vw;
            aspect-ratio: 1/1.5;
            border-radius: 50% 50% 0% 0%;
            rotate: -47deg;
            translate: 30%;
            }
        .right {
            background-color: red;
            height: 10vw;
            aspect-ratio: 1/1.5;
            border-radius: 50% 50% 0% 0%;
            rotate: 47deg;
            translate: -30%;
        }
    }
    @keyframes Beat {
        0% {
            opacity: 0;
            transform: scale(120%);
        }
        40% {
            opacity: 1;
            transform: scale(100%);
        }
        100% {
            opacity: 0;
            transform: scale(120%);
        }
    }
</style>