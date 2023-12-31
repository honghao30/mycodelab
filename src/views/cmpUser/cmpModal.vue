<template>
  <div class="content-wrap">
    <Title 
      :level="2" 
      pageTitle="모달 컴포넌트"
    />
    <div class="discription-text">
      모달 컴포넌트에 대한 가이드입니다.
    </div>
    <div style="padding: 50px 0;">
      <div class="button__wrap">
        <Button
          buttonName="모달창"
          types="primary"
          size="medium"
          @click="modalShow"
        />
      </div>
    </div>
    <!-- //모달 -->
    <Teleport to="body">
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
      modalTitle="모달 컴포넌트"
      modalSize="500"
    >
      <template #content>
        모달창 내용
      </template> 
      <template #footer>
        모달 창 제어 버튼등
      </template>       
    </ModalView>
  </Teleport>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'

  const isModalViewed = ref(false)

  const modalShow = () => {  
    isModalViewed.value = true
  }


</script>

<style lang="scss">
.discription-text {
  margin: 10px 0 30px;
  font-size: 15px;
}
</style>