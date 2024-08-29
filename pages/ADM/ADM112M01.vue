<template>
  <!-- <h3 class="tit">서버모니터링</h3> -->

  <!-- <v-table>
    <tbody>
      <tr>
        <th class="">시스템</th>
        <td>
          <ComSelectBox
            v-model="searchParams.sysGbn"
            :items="itemsSystem"
            :isDefault="false"
            class="s_basics"
          />
        </td>
        <th class="">서버</th>
        <td>
          <ComSelectBox
            v-model="searchParams.svrGbn"
            :items="itemsServer"
            :isDefault="false"
            class="s_basics"
          />
        </td>
        <th class="">점검</th>
        <td>
          <div class="d_flex">
            <ComSelectBox
              v-model="searchParams.chkGbn"
              :items="itemsCheck"
              :isDefault="false"
              class="s_basics"
            />
            <v-btn class="vbtn ml_10" size="small" @click="searchData">검색</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table> -->

  <div class="d_flex">
    <v-btn class="vbtn ml_10" size="small" @click="searchData">즉시점검</v-btn>
  </div>

  <div class="grid">
    <CommonComAgGrid
      ref="agGrid"
      :columnDefs="columnDefs"
      :currentPage="currentPage"
      :defaultColDef="defaultColDef"
      :pageSize="pageSize"
      :showOptions="showOptions"
    />
  </div>
</template>

<style scoped></style>

<script setup>
import { admApi } from '@/api/index.ts'
import ComSelectBox from '@/components/common/ComSelectBox.vue'

/* 검색 변수 파라미터  */
const searchParams = ref({
  sysGbn: '', //시스템
  svrGbn: '', //서버
  chkGbn: '', //점검
})

const itemsSystem = ref([
  { title: '전체', value: '' },
  { title: 'Web', value: 'Web' },
  { title: 'Admin', value: 'Admin' },
])

const itemsServer = ref([
  { title: '전체', value: '' },
  { title: 'efmwa01d', value: 'efmwa01d' },
  { title: 'efmwa02d', value: 'efmwa02d' },
  { title: 'heywa03p', value: 'heywa03p' },
  { title: 'heywa04p', value: 'heywa04p' },
  { title: 'heywa05p', value: 'heywa05p' },
])

const itemsCheck = ref([
  { title: '기본조회', value: '' },
  { title: '즉시점검', value: 'Y' },
])

const agGrid = ref(null) //ag-grid 객체
const currentPage = ref(1) //현재페이지
const pageSize = ref(100)

const columnDefs = ref([
  { headerName: '순번', field: 'rnum' },
  { headerName: '점검일자', field: 'chkDt' },
  { headerName: '점검시간', field: 'chkTm' },
  { headerName: '시스템', field: 'system' },
  { headerName: '컨테이터', field: 'server' },
  { headerName: '서버', field: 'hostname' },
  { headerName: '점검여부', field: 'validyn', cellClass: ['ico_two_black'] }, // ico_two_black , ico_two_green
  { headerName: '시작시간', field: 'exectime' },
  { headerName: 'Ps결과', field: 'isPs', cellClass: ['ico_three_black'] }, // ico_three_black , ico_three_red , ico_three_green
  { headerName: 'Echo결과', field: 'isEcho', cellClass: ['ico_three_green'] },
  { headerName: '결과메시지', field: 'resMsg' },
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
  editable: false,
  resizable: true,
  cellStyle: { textAlign: 'center' },
  flex: 1, // width auto
}

const showOptions = ref({
  isShowAdd: false,
  isShowSave: false,
  isShowDel: false,
  isShowMore: false,
})
const agrid = ref(null)

/********************************* 초기화 *************************/
onMounted(() => {
  // 조회
  searchData()
})

/********************************* methods *************************/
//검색
const searchData = () => {
  currentPage.value = 1
  agGrid.value.removeData()
  callApi()
}
/************************************* API ***************************/
//공통코드 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅
  params.pageNum = currentPage.value //페이지 넘버
  params.pageSize = pageSize.value //페이지 사이즈
  params.chkGbn = 'Y' //즉시점검여부
  $fx.startLoadingbar()
  admApi
    .ADM0901S01(params)
    .then((response) => {
      const resultData = response.result.result
      agGrid.value.addData(resultData)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
