<template>
  <!-- <h3 class="tit">파일로드</h3> -->
  <div class="caution_box mb_20">
    <ul>
      <li>
        <span class="color_blue">현재 접속한 컨테이너 정보 : {{ containerId }} </span>
      </li>
      <li>＃ 현재 접속된 서버의 로그파일만 검색합니다.</li>
    </ul>
  </div>
  <v-table>
    <tbody>
      <tr>
        <th class="">날짜(yyyyMMdd)</th>
        <td>
          <v-text-field
            label="날짜"
            v-model="searchParams.date"
            class="i_basics"
            @keydown.enter="searchData"
            maxlength="8"
          ></v-text-field>
        </td>
        <th class="">컨테이너</th>
        <td>
          <ComSelectBox
            v-model="searchParams.logfilePath"
            :items="itemsServer"
            :isDefault="false"
            class="s_basics"
          />
        </td>
        <th class="">검색키워드</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="검색키워드"
              v-model="searchParams.keyword"
              class="i_basics"
              @keydown.enter="searchData"
              maxlength="100"
            ></v-text-field>
            <v-btn class="vbtn ml_10" size="small" @click="searchData">검색</v-btn>
            <v-btn class="vbtn ml_10" size="small" @click="callApi1">컨테이너 조회</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <div v-if="loadingState === 'completed'">
    <ul v-for="(logInfo, idx) in logInfos" :key="idx">
      <td v-html="logInfo"></td>
    </ul>
  </div>
  <div v-if="loadingState === 'loading'">파일을 읽는 중 입니다. 시간이 오래걸릴 수 있습니다.</div>
  <div v-if="loadingState === 'nodata'">검색결과가 없습니다.</div>
  <div v-if="loadingState === 'completed'">
    <!-- <div style="border-bottom: 1px solid #eee" v-for="(conts, pos) in searchList">
      <span
        :style="{
          color:
            conts.indexOf('[ERROR]') > -1 || conts.substring(0, 1).startsWith('	') ? '#f00' : '#000',
        }"
      >
        {{ _.unescape(conts.replaceAll('\t', '　　　')) }}
      </span>
    </div>-->
  </div>
  <textarea id="tmpText" v-model="clipText" style="width: 0; height: 0"></textarea>
</template>

<style scoped></style>

<script setup>
import { admApi } from '@/api/index.ts'
import ComSelectBox from '@/components/common/ComSelectBox.vue'
import ComDatePicker from '@/components/common/ComDatePicker.vue'

/* 검색 변수 파라미터  */
const searchParams = ref({
  date: '', //날짜
  logfilePath: '', //컨테이너
  keyword: '', //검색키워드
  logFileName: '',
  logFileFullPath: '',
})

const today = new Date() // 현재 날짜와 시간을 포함하는 Date 객체 생성
const year = today.getFullYear() // 년도 가져오기
const month = today.getMonth() + 1 // 월 가져오기 (0부터 시작하므로 1 더하기)
const day = today.getDate() // 일 가져오기
const formattedToday = new Date(
  `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
)
searchParams.value.date = `${year}${month.toString().padStart(2, '0')}${day
  .toString()
  .padStart(2, '0')}`

const searchList = ref([])

const containerId = ref('')
const loadingState = ref('')
const clipText = ref('')
const logInfos = ref([])

const itemsServer = ref([])

/********************************* 초기화 *************************/
onMounted(() => {
  // 컨테이너조회
  callApi1()
})

/********************************* methods *************************/
//검색
const searchData = () => {
  searchParams.value.logFileName =
    searchParams.value.date !== $utils.getDateYYYYMMDD()
      ? 'JeusServer_' + searchParams.value.date + '.log'
      : 'JeusServer.log'
  searchParams.value.logFileFullPath =
    '/shblog/infra/jeus/' + searchParams.value.logfilePath + '/' + searchParams.value.logFileName

  if (searchParams.value.date === '') {
    alert('날짜 입력해주세요')
    return
  }
  if (searchParams.value.logfilePath === '') {
    alert('로그 검색할 JEUS 컨테이너를 선택해주세요.')
    return
  }
  if (searchParams.value.keyword.length < 3) {
    alert('검색어는 3자리 이상만 검색 가능합니다.')
    return
  }
  callApi()
}
/************************************* API ***************************/
// 컨테이너조회
const callApi1 = () => {
  const params = searchParams.value //파라미터 셋팅
  $fx.startLoadingbar()
  admApi
    .ADM0304S01(params)
    .then((response) => {
      const containerIdList = response.result?.containerIdList
      if (response.result?.containerIdList?.length > 0)
        containerIdList.forEach((element) => {
          const key = Object.keys(element)[0]
          const value = element[key]
          const serverObject = { title: key, value }
          itemsServer.value.push(serverObject)
        })
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// 로그 조회
const callApi = () => {
  loadingState.value = 'loading'
  const params = searchParams.value //파라미터 셋팅
  $fx.startLoadingbar()
  admApi
    .ADM0304S02(params)
    .then((response) => {
      if (response.result?.searchList?.length > 0) {
        logInfos.value = response.result.searchList
        loadingState.value = 'completed'
      } else {
        loadingState.value = 'nodata'
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
