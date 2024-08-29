<template>
  <div class="title_box">
    <h2>{{ pageNm || '제목(설정 안됨)' }}</h2>
    <ul class="loc">
      <li v-for="item in navigatorList" v-bind:key="item.id">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script setup>
/********************************* 변수 선언 및 정의 ****************/
import { menuStore } from '@/store/menuStore'
/********************************* INIT ****************************/

const pageNm = computed(() => menuStore().currentPage?.menuName)
const navigatorList = computed(() => menuStore().currentPage?.navigator)

/********************************* METHODS *************************/
/*********************************** API ***************************/
</script>
