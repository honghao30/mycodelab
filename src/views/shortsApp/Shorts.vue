<template>
    <div>
        
    </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted, defineEmits  } from 'vue'
import { getShort } from '@/views/shortsApp/api/getData'
const { MemberList } = getShort()
</script>

<style>

</style>