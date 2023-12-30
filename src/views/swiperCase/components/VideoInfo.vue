<template>
    <div class="video-info">
        <p class="tit">{{ video.title }}</p>
        <p class="description">
            {{ video.videoDescription }}
        </p>                            
        <p class="description">
            {{ video.videoTag }}
        </p>                             
        <p class="description">
            <strong>{{ video.nickName }}</strong> |  {{ video.statistics.play_count }}
        </p>
    </div>  
</template>

<script setup>
import { defineEmits,defineProps, ref } from 'vue'

const props = defineProps({
    video: {
        type: Array,
        default: () => []
    }
})
</script>

<style>

</style>