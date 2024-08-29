<template>
  <!-- <h3 class="tit">배치관리</h3> -->

  <div class="caution_box mb_20">
    <ul>
      <li>배치 정보를 조회/등록/수정/실행/삭제(사용여부 : N) 하실 수 있습니다.</li>
      <li><span class="color_blue">등록버튼</span>을 클릭하시면 팝업에서 등록 하실 수 있습니다.</li>
      <li><span class="color_blue">배치명</span>을 클릭하시면 팝업에서 수정 하실 수 있습니다.</li>
      <li>배치 실행시 모든 배치(후행배치 처리 포함)는 단독으로 실행됩니다.</li>
    </ul>
  </div>
  <v-table>
    <tbody>
      <tr>
        <th class="">배치명</th>
        <td>
          <v-text-field
            label="배치명"
            v-model="batchName"
            :rules="batchNameRules"
            class="i_basics"
          ></v-text-field>
        </td>
        <th class="">배치ID</th>
        <td>
          <v-text-field
            label="배치ID"
            v-model="batchId"
            :rules="batchIdRules"
            class="i_basics"
          ></v-text-field>
        </td>
        <th class="">프로그램URL</th>
        <td>
          <v-text-field
            label="프로그램URL"
            v-model="programUrl"
            :rules="programUrlRules"
            class="i_basics"
          ></v-text-field>
        </td>
        <th class="">사용여부</th>
        <td>
          <div class="d_flex">
            <ComSelectBox
              groupCode="01"
              v-model="useAcc"
              :items="itemsUseAcc"
              :isDefault="false"
              class="s_basics"
            />
            <v-btn class="vbtn ml_10" size="small">검색</v-btn>
            <v-btn class="vbtn line ml_10" size="small">초기화</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <div class="grid">
    <ComAgGrid
      ref="agrid"
      :columnDefs="columnDefs"
      style="height: 400px"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
    />
  </div>
</template>

<style scoped>
</style>

<script setup >
import ComSelectBox from '@/components/common/ComSelectBox.vue'
import ComAgGrid from '~/components/common/ComAgGrid.vue'

const batchId = ref('')
const batchIdRules = [
  //(v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '메세지',
]

const batchName = ref('')
const batchNameRules = [
  //(v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '메세지',
]

const programUrl = ref('')
const programUrlRules = [
  //(v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '메세지',
]

const useAcc = ref('001')
const itemsUseAcc = ref([
  { title: '전체', value: '001' },
  { title: '사용', value: '002' },
  { title: '미사용', value: '003' },
])
const columnDefs = ref([
  {
    headerName: '선택',
    field: 'chk',
    cellRenderer: 'agCheckboxCellRenderer',
    editable: false,
    cellRendererParams: {
      disabled: false,
    },
    cellClass: ['custom-center-align'],
    width: 50,
  },
  { headerName: '배치명', field: 'batchName' },
  { headerName: '배치Id', field: 'batchId' },
  { headerName: '학교', field: 'school' },
  { headerName: '프로그램URL', field: 'programUrl' },
  { headerName: '파라미터', field: 'parameter' },
  { headerName: '사용여부', field: 'useAcc' },
  { headerName: '등록일자', field: 'regDate' },
  { headerName: '등록자', field: 'redName' },
  { headerName: '후행처리', field: 'afterProcess' },
])
const rowData = [
  {
    chk: false,
    no: 999999,
    batchName: '학생증체크카드 재발급 이미지 전송 배치',
    batchId: '00090',
    school: '수원여자대학교',
    programUrl: '/MWUV/mwuvJob0401',
    parameter: 'univ=SJUV,stdt=20230920,eddt=20230920,cnt_temp=X',
    useAcc: 'Y',
    regDate: '2023-09-09',
    redName: 'lotecs',
    afterProcess: 'N',
  },
]
const defaultColDef = {
  sortable: true,
  filter: true,
  editable: true,
  resizable: true,
  cellStyle: { textAlign: 'center' },
  flex: 1, // width auto
}
const agrid = ref(null)
</script> 