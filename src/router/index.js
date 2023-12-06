import { createRouter, createWebHistory } from 'vue-router'
import home from "@/views/main/main.vue";

import cmpTitle from "@/views/cmpUser/cmpTitle.vue";
import cmpButton from "@/views/cmpUser/cmpButton.vue";
import cmpModal from "@/views/cmpUser/cmpModal.vue";
import cmpToolTip from "@/views/cmpUser/cmpToolTip.vue";
import cmpKoreaMap from "@/views/cmpUser/cmpSvgMap.vue";
import cmpAccordion from "@/views/cmpUser/cmpAccMenu.vue";
import cmpKoreaWeather from "@/views/cmpUser/cmpKoreaWeather.vue";
import cmpTab from "@/views/cmpUser/cmpTab.vue";
import cmpTable from "@/views/cmpUser/cmpTable.vue";
import cmpInput from "@/views/cmpUser/cmpInput.vue";

import cmpSwiper from "@/views/swiperCase/cmpSwiper.vue";
import TikTok from "@/views/swiperCase/TikTok.vue";

import scrollEvent from "@/views/scrollEvent/scrollEvent.vue";

import MovieList from "@/views/movie/MovieList.vue";
import BoxOffice from "@/views/movie/BoxOffice.vue";

// 가이드
import PubSummary from "@/views/pubGuid/PubSummary.vue";
import PubRoll from "@/views/pubGuid/PubRoll.vue";
import PubList from "@/views/pubGuid/PubList.vue";

// 라우터 
const routes = [
    {
        path: "/",
        name: "home",
        component: home,
    } ,
    {
        path: "/cmpTitle",
        name: "cmpTitle",
        component: cmpTitle,
    },
    {
        path: "/cmpButton",
        name: "cmpButton",
        component: cmpButton,
    },
    {
        path: "/cmpModal",
        name: "cmpModal",
        component: cmpModal,
    },
    {
        path: "/cmpToolTip",
        name: "cmpToolTip",
        component: cmpToolTip,
    },
    {
        path: "/cmpKoreaMap",
        name: "cmpKoreaMap",
        component: cmpKoreaMap,
    }, 
    {
        path: "/cmpAccordion",
        name: "cmpAccordion",
        component: cmpAccordion,
    },
    {
        path: "/cmpKoreaWeather",
        name: "cmpKoreaWeather",
        component: cmpKoreaWeather,
    },
    {
        path: "/cmpTab",
        name: "cmpTab",
        component: cmpTab,
    },
    {
        path: "/cmpTable",
        name: "cmpTable",
        component: cmpTable,
    },    
    {
        path: "/cmpInput",
        name: "cmpInput",
        component: cmpInput,
    },   
    {
        path: "/cmpSwiper",
        name: "cmpSwiper",
        component: cmpSwiper,
    },
    {
        path: "/TikTok",
        name: "TikTok",
        component: TikTok,
    },    
    // 스크롤
    {
        path: "/scrollEvent",
        name: "scrollEvent",
        component: scrollEvent,
    },
    // 영화 api
    {
        path: "/MovieList",
        name: "MovieList",
        component: MovieList,
    },
    {
        path: "/BoxOffice",
        name: "BoxOffice",
        component: BoxOffice,
    },   
    // 가이드   
    {
        path: '/PubSummary',
        name: 'PubSummary',
        component: PubSummary
    },
    {
        path: '/PubRoll',
        name: 'PubRoll',
        component: PubRoll
    },    
    {
        path: '/PubList',
        name: 'PubList',
        component: PubList
    }  
]
// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes
});

// 라우터 추출 (main.js에서 import)
export {router}