import axios from 'axios'
import { defineStore } from 'pinia'
import { getShort } from '@/views/shortsApp/api/getData'
import { router } from '../router'
const MemberList = await getShort()

export const useUsersStore = defineStore('auth', {
    state: () => ({
        userId: null,
        userName: null,
        userUploaded: null,
        userLiked: null,
        userSubscribed: null,
        users: []
    }),
    getters: {
        isLoggedIn: (state) => {
          return state.userId != null;
        },
    },
    actions: {
        signIn: async function(userId, password) {
            console.log('로그인시',MemberList)            
            const user = MemberList.value.find(user => user.userId === userId && user.password === password);
            if (user) {
                this.userId = user.userId;
                this.userName = user.name;
                this.userUploaded = user.uploaded;
                this.userLiked = user.liked;
                this.userSubscribed = user.subscribed;
                alert('로그인 성공 했습니다.');                
            } else {
                confirm('회원가입 페이지로 이동하시겠습니까?');
                router.push("/Register")
            }
        },
        registrations: async function(userId, password, Name) {
            let newUser = {
                "userId": userId,
                "password": password,
                "Name": Name
            };
            console.log('전달완료', MemberList, newUser)
            await axios.post('https://chivalrous-utopian-lawyer.glitch.me/users', newUser)            
            .then(function (response) {
                console.log('가입완료', response);
            })
            .catch(function (error) {
                console.log('오류 발생', error);
            });            
        },
        logOut: function() {
            this.userId = null;
            this.userName = null;
            this.userUploaded = null;
            this.userLiked = null;
            this.userSubscribed = null;
            alert('로그아웃 성공');
        }
    },
})
