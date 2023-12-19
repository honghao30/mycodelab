<template>
    <div class="top-search">
        <MyBtn                            
            buttonName="추천영상"                           
            @click="sortVideos"                                                                       
        >
        </MyBtn>                
        <MyBtn                            
            buttonName="검색"
            iconOnly="true"                    
            @click="openSeach"                                                                       
        >
            <template #svg-icon>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1">
                <g id="surface1">
                <path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:#fff;stroke-opacity:1;stroke-miterlimit:4;" d="M 15.793753 15.812503 L 21.000003 21.000003 M 18.000003 10.500002 C 18.000003 14.640627 14.640627 18.000003 10.500002 18.000003 C 6.359376 18.000003 3 14.640627 3 10.500002 C 3 6.359376 6.359376 3 10.500002 3 C 14.640627 3 18.000003 6.359376 18.000003 10.500002 Z M 18.000003 10.500002 " transform="matrix(1.25,0,0,1.25,0,0)"/>
                </g>
                </svg>
            </template>
        </MyBtn>
    </div>  
</template>

<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['openSeach', 'sortVideos'])

const sortVideos = () => {
  emit('sortVideos')
}

const openSeach = () => {
  emit('openSeach')
}

</script>

<style lang="scss">
        .top-search {
            position: absolute;
            top:0;
            left:0;
            width: 100%;
            padding: 5px 10px;
            z-index: 20;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #fff;
            font-size: 18px;
        }    
</style>