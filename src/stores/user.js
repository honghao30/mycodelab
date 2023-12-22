import { defineStore } from 'pinia'
import userData from '@/views/swiperCase/member.json' 

export const useUserStore = defineStore('alerts', {
    state: () => ({
        userId: localStorage.getItem('userId'),  // 초기 상태를 로컬스토리지에서 가져옵니다.
        userName: localStorage.getItem('userName'),  // 초기 상태를 로컬스토리지에서 가져옵니다.
    }),
    getters: {
        isLoggedIn: (state) => {
          return state.userId != null;
        },
    },
    actions: {
        signIn: async function(userId, password) {
            const user = userData.users.find(user => user.userId === userId && user.password === password);
            if (user) {
                this.userId = user.userId;
                this.userName = user.name;
                localStorage.setItem('userId', user.userId);
                localStorage.setItem('userName', user.name);                
                localStorage.setItem('uploaded', user.uploaded);      
                localStorage.setItem('liked', user.liked);      
                localStorage.setItem('subscribed', user.subscribed); 
                alert('로그인 성공');
            } else {
                alert('입력하신 회원정보가 없군요~.당분간 회원가입을 받지 않습니다.');
            }
        },
        logOut: function() {
            this.userId = null;
            this.userName = null;
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');            
            localStorage.removeItem('uploaded');  
            localStorage.removeItem('liked');  
            localStorage.removeItem('subscribed'); 
            alert('로그아웃 성공');
        }
    },
})
