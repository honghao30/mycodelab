<template>
  <div class="parking__wrap">
    <div class="display__wrap">
        <Title 
            :level="2" 
            pageTitle="주차 현황판"
            :algin="center"
        />
        <div class="display__board">
            전체 주차 : {{ SlotList.length }} 면<br>
            잔여 자리 : {{ leftover }} 면
        </div>
    </div>
    <div class="parking__manage">
        <form>
            <ul>
                <li>
                    <MyInput >
                        <template #input>
                            <InputEl                                        
                                v-model="carNum"
                                label="차량번호"
                                required                                                
                                placeholder="차량번호를 입력하세요"
                            />                
                        </template>         
                    </MyInput>                          
                </li>
                <li>
                    <MyInput >
                        <template #input>
                            <InputEl                                        
                                v-model="coupon"
                                label="할인권"
                                required                                                
                                placeholder="할인권의 할인율을 입력하세요"
                            />                
                        </template>         
                    </MyInput>                          
                </li>                
            </ul>                          
            <div class="button__wrap">
                <MyBtn                            
                    buttonName="입차"                    
                    color="btn primary"                    
                    size="medium"  
                    @click="goCheckIn"    
                    :disabled="!carNum"                    
                >  
                </MyBtn>   
                <MyBtn                            
                    buttonName="출차"                        
                    color="btn secondary"
                    size="medium"
                    :disabled="!carNum"   
                    @click="goCheckOut" 
                >  
                </MyBtn>                    
            </div>
        </form>        
    </div>
    <div class="parking__slot">
        <ul>
            <li  v-for="(p, index) in SlotList" :key="index" :class="p.isActive ? 'is-active' : ''">P{{ p.id }}</li>
        </ul>
    </div>
  </div>
</template>

<script setup>
import axios from "axios"
import { reactive, ref, computed, onMounted } from 'vue'
import { getTodayDate } from '@/utils/common'
import { randomNumber, getRandomIndex, checkCarNum } from '@/views/apps/parking/fn'
const randomId = ref('')
const carNum = ref('')
const coupon = ref('')
const SlotList = ref([])
const ActiveSlot = ref([])
// 남은 주차 자리 계산
const leftover = computed(() => {
  const activeSlots = SlotList.value.filter(slot => slot.isActive);
  return SlotList.value.length - activeSlots.length;
});
// api 호출
axios.get('https://new-2c9g.onrender.com/parkSlot')
.then(res => {            
    console.log(res.data)
    res.data.forEach(data => {
        SlotList.value.push(data) 
    });        
})          
.catch(err => {
    console.log(err)    
})

const CarType = ref(['승용', '소형', '중형'])
randomId.value = randomNumber(10000,1)

// 입차된 slot 처리 - 랜덤으로 빈자리 active 처리
const leftSlotSelect = () => {
    const inactiveSlots = SlotList.value.filter(slot => !slot.isActive);
    if (inactiveSlots.length > 0) {
        const selectedSlot = inactiveSlots[Math.floor(Math.random() * inactiveSlots.length)];
        selectedSlot.isActive = true;
        return selectedSlot;
    } else {
        return null;
    }
}
// 입차 체크
const goCheckIn = () => {    
    if(!checkCarNum(carNum.value)) {
        alert('차량번호를 정확히 입력하세요')
    } else {
        let isParked = ActiveSlot.value.some(slot => slot.hisTory.some(car => car.CarNumber === carNum.value && car.status === "isIn"))    
        if (isParked) {
            alert('번호를 잘못 입력하셨거나 출차 처리를 하지 않았습니다.');
            carNum.value = ''
            return;
        }
        let entryCar = {
            id: randomId.value,
            inTime: getTodayDate('yy-mm-dd hh:mm:ss'),
            CarNumber: carNum.value,
            carTypes: CarType.value[getRandomIndex(CarType.value)],
            status: "isIn"
        }      
        carNum.value = ''          
        setTimeout(() => {
            let parkingSlot = leftSlotSelect() 
            parkingSlot.hisTory.push(entryCar)        
            ActiveSlot.value.push(parkingSlot) // 삭제 예정                     
        }, 2000);   
    }         
}
// 출차정산
const goCheckOut = () => {
    let carTypes
    let inTime
    let carNumber
    let outTime

    let slot = ActiveSlot.value.find(slot => slot.isActive === true && slot.hisTory.some(car => car.CarNumber === carNum.value && car.status === "isIn"));    
    if (slot) {
        let car = slot.hisTory.find(car => car.CarNumber === carNum.value && car.status === "isIn");
        if (car) {
            carTypes = car.carTypes
            inTime = car.inTime
            carNumber = car.CarNumber
            outTime = getTodayDate('yy-mm-dd hh:mm:ss')
            console.log(carTypes, inTime, carNumber, outTime, slot.id)

            // 차량 상태 변경            
            car.status = "isOut";
            let thisSlot = SlotList.value.find(s => s.id === slot.id)
            thisSlot.isActive = false
            console.log('this', thisSlot.isActive)            
        }          
    }  
    //주차비 계산
    const CarType = (type) => {
        if(type == '승용') {
            return 1
        } else if(type == '소형') {
            return 1 * 0.8
        } else {
            return 1 * 1.1
        }
    }    
    const convertToDateTime = (timeString) => {                    
        let dateObj = new Date(timeString);
        return dateObj;
    }        
    
    const calculateTimeDifference = (inTime, outTime) => {        
        let inDateTime = convertToDateTime(inTime)
        let outDateTime = convertToDateTime(outTime)
        
        let differenceInMilliseconds = outDateTime - inDateTime        
        let differenceInMinutes = differenceInMilliseconds / 60000;
        
        let result = differenceInMinutes / 10
        console.log('계산된 시간', result)
        return result
    }    
    const calulateParkPay = () => {
        if(calculateTimeDifference(inTime, outTime) < 1) {
            alert('무료 주차 시간입니다.')
        } else {
            let totalPay = calculateTimeDifference(inTime, outTime) * CarType(carTypes) * 1000
            totalPay = totalPay.toLocaleString('ko-KR')
            console.log(totalPay)
            alert('계산하실 비용은 총' + totalPay + '입니다.')
        }
    }
    calulateParkPay()
    // 주차 자리 복구
    let index = ActiveSlot.value.findIndex(s => s.id === slot.id);
    if (index !== -1) {
        ActiveSlot.value.splice(index, 1);
    }
    carNum.value = ''
}
</script>

<style lang="scss">
.parking__slot {
    ul {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        max-width: 90%;
        margin: 0 auto;
        gap: 8px;
        li {
            border: 1px solid #ccc;
            width: 60px;
            height: 110px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom:20px;
            &.is-active {
                background-color: #ddd;
            }
        }
    }
}
.display__wrap {
    padding: 10px;
    width: 100%;    
    .page-title__wrap {
        h2 {
            margin: 0 auto;
        }
        margin-bottom: 30px;
    }
    .display__board {
        margin-top: 50px;
        border: 1px solid #ccc;
        padding: 20px;
        max-width: 500px;
        margin: 0 auto;
        font-size: 20px;
        line-height: 29px;
    }
}
.parking__manage {
    width: 100%;
    max-width: 500px;
    padding: 50px 0;
    margin: 0 auto;
}
</style>