<template>
  <!-- <h3 class="tit">배치관리</h3> -->
  
  <v-table class="vtable_view">
    <colgroup>
      <col style="width:180px;" />
      <col style="width:35%;" />
      <col style="width:180px;" />
      <col style="width:35%;" />
    </colgroup>
    <tbody>
      <tr>
        <th>발주기관 정보</th>
        <td>
          <ComSelectBox
            groupCode="01"
            v-model="org"
            :items="itemsOrg"
            :isDefault="false"
            class="s_basics"
          />
        </td>
        <th>발주기관 사업자 번호</th>
        <td>
          1234-56-7890
        </td>
      </tr>
      <tr>
        <th>모 계좌번호</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="발주기관 사업자 번호"
              v-model="orgNum"
              :rules="orgNumRules"
              required
              placeholder=""
              class="i_basics flex1"
            ></v-text-field>
            <v-btn class="vbtn line ml_10" size="small">조회</v-btn>
          </div>
        </td>
        <th>모 계좌  사업자 번호</th>
        <td>1234-56-7890</td>
      </tr>
      <tr>
        <th>가상계좌번호 등록</th>
        <td colspan="3">
          <v-textarea></v-textarea>
          <p class="mt_10 t_right">총 0 건</p>
        </td>
      </tr>
    </tbody>
  </v-table>
  
  <div class="btm_btn_wrap">
    <v-btn class="vbtn" size="small">저장</v-btn>
  </div>

</template>

<style scoped>
</style>

<script setup >

import ComSelectBox from '@/components/common/ComSelectBox.vue'

const org = ref('001')
const itemsOrg = ref([
  { title: '한마정보통신01', value: '001' },
])

const orgNum = ref('')
const orgNumRules = [
  //(v) => !!v || '다시 입력해주세요.',
]

</script> 