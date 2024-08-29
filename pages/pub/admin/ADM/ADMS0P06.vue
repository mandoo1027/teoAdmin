<template>
  <!-- popup size width:500 height:300 -->
  <div class="popup_body">
    <div class="tit_btn">
      <h3 class="tit">입금 취소 이체 승인</h3>
      <div>
        <v-btn class="vbtn black" size="small">초기화</v-btn>
      </div>
    </div>
    <v-table class="vtable_view th_140">
      <tbody>
        <tr>
          <th>공문 도착일</th>
          <td>
              <div class="i_calender">
                <ComDatePicker v-model="startDate" class="i_date w_140" placeholder="날짜선택" />
              </div>
          </td>
        </tr>
        <tr>
          <th>비고</th>
          <td><v-textarea></v-textarea></td>
        </tr>
      </tbody>
    </v-table>

    <div class="btm_btn_wrap">
      <v-btn class="vbtn" size="small">확인</v-btn>
    </div>
  </div>
</template>

<style scoped>
</style>

<script setup >

import ComDatePicker from '@/components/common/ComDatePicker.vue'

/* 달력 */
const today = new Date() // 현재 날짜와 시간을 포함하는 Date 객체 생성
const year = today.getFullYear() // 년도 가져오기
const month = today.getMonth() + 1 // 월 가져오기 (0부터 시작하므로 1 더하기)
const day = today.getDate() // 일 가져오기
const formattedToday = new Date(
  `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
)
const startDate = ref(formattedToday)
const endDate = ref(formattedToday)

</script> 