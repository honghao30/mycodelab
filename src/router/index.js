import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/views/errors/404.vue'
// 파일 링크
import Main from './menus/Main'
import PubGuides from './menus/pubGuide'
import Join from './menus/member'
import Movie from './menus/movie'
import cmpGuide from './menus/cmpGuide'
import other from './menus/other'

// 라우터 
const routes = [
    // {
    //     path: '*',
    //     component: NotFound
    // },   
    ...Main,
    ...PubGuides,
    ...Join, //회원
    ...Movie, // 영화
    ...cmpGuide, // 컴포넌트 가이드
    ...other // 기타  
]
// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes
});

// 라우터 추출 (main.js에서 import)
export {router}