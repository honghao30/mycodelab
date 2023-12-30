export default [
    {
        path: "/Login",
        name: "/Login",
        component: () => import('@/views/member/Login.vue')
    },      
    {
        path: "/Join",
        name: "/Join",
        component: () => import('@/views/member/Join.vue')
    } 
]