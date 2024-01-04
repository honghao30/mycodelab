import axios from 'axios'
import { defineStore } from 'pinia'
import { router } from '@/router'
import { ref } from 'vue'
import { RandomCode } from '@/utils/common'
import crypto from "@/plugins/cryto.js"

console.log(RandomCode(10,false))
export const useAuthStore = defineStore('auth', {
    state: () => ({             
        baseURL: 'https://new-2c9g.onrender.com', // API
        userInfo: { 
          userId: null,
          Name: null,
          Reservations: null,
          GreatAt: null
        },        
        isLogin: false, 
        isLoginError: false, 
        isAdmin: false, 
        returnUrl: null    
    }),
    getters: {
        isLoggedIn: (state) => {
          return state.userId != null;
        },
    },
    actions: { 
        signup(signupObj) { 
          console.log('받아옴', signupObj)
          axios.post(this.baseURL + '/users', signupObj) 
          .then(res => {
            console.log(res, '넣어줌')            
          })
          .catch(err => {
            console.log(err)
          })
        },
        confirmId(idObj){          
          let userId = idObj         
          console.log(idObj, '들어왔다', userId)
          axios.get(this.baseURL + '/users/')
          .then(res => {            
            const userList = res.data
            let user = userList.find(user => user.userId === userId);
            console.log(user)
            if(user) {
              alert('입력하신 이메일은 이미 사용중입니다.')     
            } else {
              alert('사용할수 있는 이메일 입니다.')
            }        
          })          
          .catch(err => {
              console.log(err)              
          })             
        },
        signIn(loginObj) {         
          let userId = loginObj.userId
          let password = loginObj.password
          axios.get(this.baseURL + '/users/')
          .then(res => {            
            // 토큰 인증 서버 미비로 추후 준비되면 post로 수정예정            
            let token = RandomCode(20, false)  
            const userList = res.data
            userList.map((item)=>{
                item.password = crypto.decryptData(item.password);
            })            
            let user = userList.find(user => user.userId === userId && user.password === password);
            if(user) {
              localStorage.setItem("access_token", token)
              localStorage.setItem("access_id", userId)
              this.getUserInfo()         
            } else {
              alert('로그인 정보가 없습니다.')
            }        
          })          
          .catch(err => {
              console.log(err)
              this.isLoginError = true
          })                    
        },
        getUserInfo() {
          console.log('확인')
          let token = localStorage.getItem("access_token")
          let userId = localStorage.getItem("access_id")
          let config = {
            headers: {
              "access-token": token,
            }
          }
          console.log(config)
          if(token !== null && userId !== null) {
            console.log('로그인 중')  
            axios.get(this.baseURL + '/users/')
            .then(res => {            
              const userList = res.data
              let user = userList.find(user => user.userId === userId);
              // 상태 업데이트
              this.userInfo.userId = user.userId
              this.userInfo.Name = user.name
              this.userInfo.Reservations = user.Reservations
              this.userInfo.GreatAt = user.GreatAt   
              this.isLogin = true 
              this.isLoginError = false               
              if(this.userInfo.userId === 'admin@the-51.com') {
                this.isAdmin = true 
                alert('관리자님 ')
              }         
              router.push(this.returnUrl || '/')
            })          
            .catch(err => {
                console.log(err)
                this.isLoginError = true
            })             
          }
        },
        logout() { // 로그아웃
          console.log('logout')
          localStorage.clear() 
          this.isLogin = false 
          this.isLoginError = false 
          this.isAdmin = false 
          this.userInfo = null 
          router.push({ name: 'Home' })
        }
      }
})