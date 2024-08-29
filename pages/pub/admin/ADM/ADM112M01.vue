<template>
  <!-- <h3 class="tit">배치관리</h3> -->

  <v-table>
    <tbody>
      <tr>
        <th class="">시스템</th>
        <td>
          <ComSelectBox
            groupCode="01"
            v-model="system"
            :items="itemsSystem"
            :isDefault="false"
            class="s_basics"
          />
        </td>
        <th class="">서버</th>
        <td>
          <ComSelectBox
            groupCode="01"
            v-model="server"
            :items="itemsServer"
            :isDefault="false"
            class="s_basics"
          />
        </td>
        <th class="">점검</th>
        <td>
          <div class="d_flex">
            <ComSelectBox
              groupCode="01"
              v-model="check"
              :items="itemsCheck"
              :isDefault="false"
              class="s_basics"
            />
            <v-btn class="vbtn ml_10" size="small">검색</v-btn>
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

const system = ref('001')
const itemsSystem = ref([
  { title: '전체', value: '001' },
  { title: 'Mobile', value: '002' },
  { title: 'Admin', value: '003' },
  { title: 'UMS', value: '004' },
  { title: 'Univ', value: '005' },
])

const server = ref('001')
const itemsServer = ref([
  { title: 'heywa01p', value: '001' },
  { title: 'heywa02p', value: '002' },
  { title: 'heywa03p', value: '003' },
  { title: 'heywa04p', value: '004' },
  { title: 'heywa05p', value: '005' },
])

const check = ref('001')
const itemsCheck = ref([
  { title: '기본조회', value: '001' },
  { title: '즉시점검', value: '002' },
])

const columnDefs = ref([
  { headerName: '순번', field: 'number' },
  { headerName: '점검일자', field: 'checkDate' },
  { headerName: '점검시간', field: 'checkTime' },
  { headerName: '시스템', field: 'system' },
  { headerName: '컨테이터', field: 'container' },
  { headerName: '서버', field: 'server' },
  { headerName: '점검여부', field: 'checkWhether', cellClass: ['ico_two_black'] }, // ico_two_black , ico_two_green
  { headerName: '시작시간', field: 'startTime' },
  { headerName: 'Ps결과', field: 'psresult', cellClass: ['ico_three_black'] }, // ico_three_black , ico_three_red , ico_three_green
  { headerName: 'Echo결과', field: 'echoResult', cellClass: ['ico_three_green'] },
  { headerName: '결과메시지', field: 'message' },
])
const rowData = [
  {
    number: 999999,
    checkDate: '2023-10-06',
    checkTime: '12:40:41',
    system: 'Admin',
    container: 'heyAdmin01',
    server: 'heywa01d',
    checkWhether: '',
    startTime: '2:13',
    psresult: 'lotecs',
    echoResult: '',
    message: '결과메시지',
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