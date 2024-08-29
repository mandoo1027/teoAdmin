<template>
  <div>
    <div class="caution_box">
      <ul>
        <li>메모리정보를 리로드할 수 있습니다.</li>
      </ul>
    </div>
    <div class="d_flex mt_40">
      <div class="w50">
        <div class="tit_btn">
          <h3 class="tit">웹서버</h3>
        </div>
        <v-table class="vtable_list t_center">
          <colgroup>
            <col style="width: 25%" />
            <col style="width: 50%" />
            <col style="width: 25%" />
          </colgroup>
          <thead>
            <tr>
              <th>카테고리</th>
              <th>모듈명</th>
              <th>호출</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>WEB</td>
              <td>전체</td>
              <td>
                <v-btn class="vbtn black" size="small" @click="callWebApi('ALL')">전체</v-btn>
              </td>
            </tr>
            <tr>
              <td>WEB</td>
              <td>서비스</td>
              <td>
                <v-btn class="vbtn black" size="small" @click="callWebApi('SERVICE_CONTROL')"
                  >서비스</v-btn
                >
              </td>
            </tr>
            <tr>
              <td>WEB</td>
              <td>에러코드</td>
              <td>
                <v-btn class="vbtn black" size="small" @click="callWebApi('ERROR_CODE')"
                  >에러코드</v-btn
                >
              </td>
            </tr>
            <tr>
              <td>WEB</td>
              <td>공통코드</td>
              <td>
                <v-btn class="vbtn black" size="small" @click="callWebApi('COMM_CODE')"
                  >공통코드</v-btn
                >
              </td>
            </tr>
            <tr>
              <td>WEB</td>
              <td>메뉴리스트</td>
              <td>
                <v-btn class="vbtn black" size="small" @click="callWebApi('MENU_LIST')"
                  >메뉴리스트</v-btn
                >
              </td>
            </tr>
            <tr>
              <td>WEB</td>
              <td>EAI메세지매핑</td>
              <td>
                <v-btn class="vbtn black" size="small" @click="callWebApi('EAI_MSG_LIST')"
                  >EAI메세지매핑</v-btn
                >
              </td>
            </tr>
            <tr>
              <td>WEB</td>
              <td>프로퍼티</td>
              <td>
                <v-btn class="vbtn black" size="small" @click="callWebApi('PROPERTIES')"
                  >프로퍼티</v-btn
                >
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>

      <div class="w50 ml_20">
        <div class="tit_btn">
          <h3 class="tit">관리자</h3>
        </div>
        <v-table class="vtable_list t_center">
          <colgroup>
            <col style="width: 25%" />
            <col style="width: 50%" />
            <col style="width: 25%" />
          </colgroup>
          <thead>
            <tr>
              <th>카테고리</th>
              <th>모듈명</th>
              <th>호출</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ADM</td>
              <td>전체</td>
              <td>
                <v-btn class="vbtn black" size="small" @click="callAdmApi('ALL')">전체</v-btn>
              </td>
            </tr>
            <tr>
              <td>ADM</td>
              <td>서비스</td>
              <td>
                <v-btn class="vbtn black" size="small" @click="callAdmApi('SERVICE_CONTROL')"
                  >서비스</v-btn
                >
              </td>
            </tr>
            <tr>
              <td>ADM</td>
              <td>에러코드</td>
              <td>
                <v-btn class="vbtn black" size="small" @click="callAdmApi('ERROR_CODE')"
                  >에러코드</v-btn
                >
              </td>
            </tr>
            <tr>
              <td>ADM</td>
              <td>공통코드</td>
              <td>
                <v-btn class="vbtn black" size="small" @click="callAdmApi('COMM_CODE')"
                  >공통코드</v-btn
                >
              </td>
            </tr>
            <tr>
              <td>ADM</td>
              <td>메뉴리스트</td>
              <td>
                <v-btn class="vbtn black" size="small" @click="callAdmApi('MENU_LIST')"
                  >메뉴리스트</v-btn
                >
              </td>
            </tr>
            <tr>
              <td>ADM</td>
              <td>EAI메세지매핑</td>
              <td>
                <v-btn class="vbtn black" size="small" @click="callAdmApi('EAI_MSG_LIST')"
                  >EAI메세지매핑</v-btn
                >
              </td>
            </tr>
            <tr>
              <td>ADM</td>
              <td>프로퍼티</td>
              <td>
                <v-btn class="vbtn black" size="small" @click="callAdmApi('PROPERTIES')"
                  >프로퍼티</v-btn
                >
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { admApi } from '@/api/index.ts'

/************************************* API ***************************/
const callAdmApi = (contents) => {
  const params = {
    category: 'ADM',
    contents,
  }

  $fx.startLoadingbar()
  admApi
    .ADM0106S02(params)
    .then((response) => {
      $fx.throwAlert(`어드민서비스 [${contents}] 리로드를 완료하였습니다.`, '알림')
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
const callWebApi = (contents) => {
  const params = {
    category: 'WEB',
    contents,
  }

  $fx.startLoadingbar()
  admApi
    .ADM0106S01(params)
    .then((response) => {
      $fx.throwAlert(`웹서비스 [${contents}] 리로드를 완료하였습니다.`, '알림')
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
