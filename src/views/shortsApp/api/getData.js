import axios from 'axios';
import { ref } from 'vue';

export function getShort() {    
    const MemberList = ref([])
    axios
    .get('https://new-2c9g.onrender.com/users',)
    .then(res => {                    
        MemberList.value = res.data
        console.log('회원정보', MemberList.value)  
        
    })
    .catch(err => {
        console.log(err.message);
    }) 
    return MemberList
}
