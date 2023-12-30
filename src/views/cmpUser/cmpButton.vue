<template>
  <div class="content-wrap">
    <Title 
      :level="2" 
      pageTitle="버튼 컴포넌트"
    />
    <div class="discription-text">
      버튼 컴포넌트에 대한 설명입니다.
    </div>

    <div style="text-align:center;padding: 50px 0;">
      <Button
        buttonName="버튼명 전달"
        types="primary"
        size="medium"
        @click="msgShow"
      />
    </div>
    <div class="discription-text">
      버튼칼라, 아이콘 사용 여부, 활성화 여부 등을 props로 전달할 수 있습니다.
    </div>
    <div class="button__wrap">
      <Button
        types="btn-primary-line"
        size="medium"
        @click="msgShow"
      />
      <Button
        buttonName="비활성화 상태"
        types="primary"        
        size="medium"
        disabled="disabled"
        @click="msgShow"
      />      
    </div>
  </div>
</template>

<script setup>
  
  const msgShow = () => {  
    alert('안녕')
  }
</script>

<style lang="scss">
.discription-text {
  margin: 10px 0 30px;
  font-size: 15px;
}
</style>