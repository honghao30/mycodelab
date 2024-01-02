<template>
    <div class="content-wrap">
        <div class="member__wrap">
            <div class="member__wrap--inner">
                <Title 
                    :level="2" 
                    pageTitle="로그인"
                />
                <div class="member-page__wrap">        
                    <Login />
                </div>     
            </div>
        </div>
    </div>
</template>

<script setup>
import Login from "@/components/common/Login.vue"
</script>

