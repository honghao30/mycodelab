<template>
  <div class="card-option__wrap">
    <div class="card__item--wrap"
      :class="{'is-active': isActive}"
      @click="SelectCard"
    >
        <div class="card-item front one-card">
            <div class="card-item__innerbox">
              <span>행운카드 볼래요?</span>
            </div>
        </div>
        <div class="card-item backface">
            <div class="card-loginb__wrap" v-if="cardLoginb">
              <div class="loadding-bar"></div>
            </div>
            <div class="card-item__innerbox" v-if="loadingCard">
              <span>{{ selectCard }}</span>
            </div>
            <div class="end-msg" v-if="luckCardEndMsg">
              재미로~ 딱 한번만 ~
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineEmits } from 'vue'
  import cardList from './db'

  const selectCard = ref('')
  const isActive = ref(false)
  const cardLoginb = ref(true)
  const loadingCard = ref(false)
  const luckCardEndMsg = ref(false)
  
  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * cardList.length)
    selectCard.value = cardList[randomIndex]
  }

  const SelectCard = () => {
    if (!isActive.value) {
      isActive.value = true 
      getRandomCard()  
      cardControll()
    }
  }
  const emit = defineEmits(["luckCardShow"])

  const cardControll = () => {
    setTimeout(function () {
      cardLoginb.value = false
      loadingCard.value = true
    }, 1000);
    setTimeout(function () {      
      loadingCard.value = false
      luckCardEndMsg.value = true
    }, 5000);    
    setTimeout(function () {            
      luckCardEndMsg.value = false
      emit('luckCardShow', false)
    }, 6000);    
  }  
</script>

<style lang="scss">
.card__item--wrap {
  &.is-active {
    .card-loginb__wrap {
      width: 68%;
      height: 7px;
      margin: 69% auto;
      border: 1px solid #ccc;
      background: #fff;
      .loadding-bar {    
        height: 7px;    
        background: red;
        animation-name: loadwidth;
        animation-duration: 1600ms;
        animation-delay: 100ms;
        animation-iteration-count: infinite;
        animation-timing-function: ease-out;
      }
      @keyframes loadwidth {
        0% {
          width: 0;
        }
        100% {
          width: 100%;
        }
      }
    }
  }
}
.end-msg {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>