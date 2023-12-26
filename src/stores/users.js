import axios from 'axios'
import { defineStore } from 'pinia'
const getMember = JSON.parse(localStorage.getItem('member'))
const MemberList = getMember._value

import { router } from '../router'
// import { getShort } from '@/views/shortsApp/api/getData'
// const MemberList = await getShort()

export const useUsersStore = defineStore('auth', {
    state: () => ({
        userId: null,
        userName: null,
        userUploaded: null,
        userLiked: null,
        userSubscribed: null,
        isLogin: false,
        returnUrl: null
    }),
    getters: {
        isLoggedIn: (state) => {
          return state.userId != null;
        },
    },
    actions: {
        signIn: async function(userId, password) {
            console.log('로그인시',MemberList, userId, password)            
            const user = MemberList.find(user => user.userId === userId && user.password === password);
            if (user) {
                this.userId = user.userId;
                this.userName = user.name;      
                const token = Math.random().toString(36).substring(2)
                localStorage.setItem("access_token", token)       
                localStorage.setItem("access_id", userId) 
                this.getUserInfo()                
                alert('로그인 성공 했습니다.')
                router.push("/shortsApp")
            } else {
                alert('회원 정보가 없습니다.')  
            }
        },
        getUserInfo() {            
            let token = localStorage.getItem("access_token")
            let userId = localStorage.getItem("access_id") 
            let config = {
                headers: {
                  "access-token": token,
                }
            }            
            if(token !== null && userId !== null) {
                this.isLogin = true
                console.log(userId)
            }
        },        
        registrations: async function(userId, password, Name) {
            let newUser = {
                "userId": userId,
                "password": password,
                "Name": Name
            };
            console.log('전달완료', newUser)
            getMember._value.push(newUser)
            localStorage.setItem('member', JSON.stringify(getMember));
            console.log('insert', MemberList)
        },
        logOut: function() {
            this.userId = null;
            this.userName = null;
            alert('로그아웃 성공');
        }
    },
})
