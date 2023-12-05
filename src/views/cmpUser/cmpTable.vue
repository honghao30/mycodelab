<template>
    <div class="content-wrap">
      <Title 
        :level="3" 
        pageTitle="기본 테이블"
      />
      <MyTable
        tableName="기본 정보"
        types="list"        
      >
        <template #colWidth>
            <col width="30%" />
            <col width="30%" />
            <col width="" />
        </template>
        <template #thead>
            <tr>
                <th scope="col">항목1</th>
                <th scope="col">항목2</th>
                <th scope="col">항목3</th>
            </tr>
        </template>    
        <template #tbody>
            <tr 
                v-for="data in tableData"
                :key="data"
            >
                <td>{{ data.date  }}</td>
                <td>{{ data.name  }}</td>
                <td>{{ data.address  }}</td>
            </tr>
        </template>              
      </MyTable>
      <Title 
        :level="3" 
        pageTitle="크기 고정"
      />
      <MyTable
        tableName="크기 고정"
        types="list"        
        fixed
      >
        <template #colWidth>
            <col width="30%" />
            <col width="30%" />
            <col width="" />
        </template>
        <template #thead>
            <tr>
                <th scope="col">항목1</th>
                <th scope="col">항목2</th>
                <th scope="col">항목3</th>
            </tr>
        </template>    
        <template #tbody>
            <tr 
                v-for="data in tableData"
                :key="data"
            >
                <td>{{ data.date  }}</td>
                <td>{{ data.name  }}</td>
                <td>{{ data.address  }}</td>
            </tr>
        </template>              
      </MyTable>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, onBeforeMount, onUnmounted } from 'vue'
  
  const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
  </script>
  
  <style lang="scss">
    
  </style>