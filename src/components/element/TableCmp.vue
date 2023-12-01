<template>
    <div class="table__wrap"
        :class="[fixed ? 'scroll' : '']"
   
    >
        <table
            class="table"
            :class="[types === 'body' ? 'table-bodyonly' : 'table-list']"
            :style="[
                fixed ? 'table-layout: fixed' : ''
            ]"
        >
            <caption>{{ tableName }}</caption>
            <colgroup>
                <slot name="colWidth"></slot>                   
            </colgroup>
            <thead
                v-if="types === 'list'"
            >
                <slot name="thead"></slot>
            </thead>
            <tbody>
                <slot name="tbody"></slot>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
    tableName: {
        type: String,
        default: ''
    },
    types: {
        type: String,
        default: 'list'
    },
    fixed: {
        type: Boolean,
        default:'false'
    }     
});

</script>

<style>

</style>