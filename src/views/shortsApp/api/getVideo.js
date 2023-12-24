import axios from 'axios';
import { ref } from 'vue';

export function getVideo() {
    const videoList = ref([])
    axios
    .get('https://vigorous-malleable-moustache.glitch.me/db',)
    .then(res => {            
        console.log(res.data)  

    })
    .catch(err => {
        console.log(err.message);
    }) 
    return videoList
}
