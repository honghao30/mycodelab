<template>
  <div class="content-wrap">
    <Title 
      :level="2" 
      pageTitle="탭 메뉴"
    />
    <div class="discription-text">
      탭 메뉴에 대한 가이드입니다.
    </div>
    <TabsCmp :titles="['탭1', '탭2']" :tabs="[TabConta, TabContb]"> </TabsCmp>
  </div>
</template>

<script setup>
import { markRaw } from 'vue'
import TabCont1 from "./TabCont1.vue"
import TabCont2 from "./TabCont2.vue"

const TabConta = markRaw(TabCont1)
const TabContb = markRaw(TabCont2)

</script>

<style>

</style>