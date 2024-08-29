<template>
  <!-- <h3 class="tit">배치관리</h3> -->

  <div class="caution_box mb_20">
    <ul>
      <li>시스템관리자 등록입니다.</li>
      <li>삭제 또는 수정을 원하시면 교번을 Click하세요.</li>
    </ul>
  </div>

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
import ComAgGrid from '~/components/common/ComAgGrid.vue'

const columnDefs = ref([
  { headerName: 'No', field: 'no' },
  { headerName: '부서', field: 'department' },
  { headerName: '교번', field: 'alternation' },
  { headerName: '이름', field: 'name' },
  { headerName: '권한', field: 'authority' },
])
const rowData = [
  {
    no: 999999,
    department: '(주)로텍스',
    alternation: 'ghjkkghjk',
    name: '꺾땄원',
    authority: '시스템관리권한',
  },
  {
    no: 10,
    department: '(주)로텍스',
    alternation: 'ghjkkghjk',
    name: '꺾땄원',
    authority: '시스템관리권한',
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