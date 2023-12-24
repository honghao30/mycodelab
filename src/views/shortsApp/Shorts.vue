<template>
    <div>
        {{ videoList }}
    </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted, defineEmits  } from 'vue'
import { getVideo } from '@/views/shortsApp/api/getVideo'
const { videoList } = getVideo()
</script>

<style>

</style>