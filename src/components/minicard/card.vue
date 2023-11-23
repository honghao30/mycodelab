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
            <div class="card-item__innerbox">
              <span>{{ selectCard }}</span>
            </div>
            <div class="end-msg">
              
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import cardList from './db'

  const selectCard = ref('')
  const isActive = ref(false)

  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * cardList.length)
    selectCard.value = cardList[randomIndex]
  }

  const SelectCard = () => {
    if (!isActive.value) {
      isActive.value = true 
      getRandomCard()  
    }
  }
</script>