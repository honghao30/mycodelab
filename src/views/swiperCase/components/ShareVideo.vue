<template>
    <div class="video-upload">
    <Title 
        pageTitle="공유"
        :level="3" 
    />
        <div class="sns__sharing--wrap">
            <p>{{ SelectVideo.title }}</p>
            <p>
                <img src="images/temp/sns.jpg" alt="">
            </p>
        </div>
        <div class="button__wrap">
            <Button
                buttonName="공유"
                types="btn-primary-line"
                size="medium"
                @click="$emit('videoShareConfirm', SelectVideo)"                
            />
            <Button
                buttonName="취소"
                types="btn-line"
                size="medium"
                @click="$emit('closeLy')" 
            />                            
        </div>
    </div>     
</template>

<script setup>
import { defineEmits,defineProps, ref } from 'vue'

const props = defineProps({
  SelectVideo: {
    type: Array,
    default: () => []
  }
})
</script>

<style>

</style>