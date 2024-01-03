<template>
  <div class="member__wrap">
    <div class="member__wrap--inner">
        <Title 
            :level="2" 
            pageTitle="회원가입"
        />
        <div class="member-page__wrap">           
            <Join />
        </div>
    </div>
  </div>
</template>

<script setup>
// import
import Join from '@/components/common/Join.vue'
</script>
