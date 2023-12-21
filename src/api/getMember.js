import axios from 'axios';
import { ref } from 'vue';


export function  memberInfo () { 
    
    const memberList = ref([]);
    
    const memberData= async () => {
        axios
        .get('./member.json',)
        .then(res => {        
            console.log(res.data); 
            // res.data.results.forEach(result => {
            //     nowPlayingList.value.push(result);
            // });    
            // console.log(res.data); 

        })
        .catch(err => {
            console.log(err.message);
        });
             
    }
    return [ memberList, memberData ];
}
export default memberInfo