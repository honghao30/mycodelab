export default [
    {
        path: "/Login",
        name: "/Login",
        component: () => import('@/views/member/Login.vue'),
        meta: {
            onlyBody: true
        }
    },      
    {
        path: "/Join",
        name: "/Join",
        component: () => import('@/views/member/Join.vue'),
        meta: {
            onlyBody: true
        }
    },
    {
        path: "/Signup",
        name: "/Signup",
        component: () => import('@/views/shortsApp/member/Login.vue'),        
        meta: {
            onlyBody: true
        }
    },      
    {
        path: "/Register",
        name: "/Register",
        component: () => import('@/views/shortsApp/member/Join.vue'),
        meta: {
            onlyBody: true
        }
    }    
]