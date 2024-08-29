<template>
  <!-- popup size width:500 height:300 -->
  <div class="popup_body">
    <h3 class="tit">신규 책임자</h3>
    <CommonComSelectBox
      v-model="rbprsnListCd"
      :items="rbprsnList"
      :isDefault="false"
      :isAll="false"
      class="s_basics"
    />

    <v-table class="vtable_view mt_20">
      <colgroup>
        <col style="width: " />
        <col style="width: " />
      </colgroup>
      <tbody>
        <tr>
          <th>성명</th>
          <!-- 현재 책임자 조회 -->
          <td>{{ props.data.memberInfo.memNm }} / {{ props.data.memberInfo.memId }}</td>
        </tr>
        <tr>
          <th>권한 변경</th>
          <td>
            <CommonComRadioButton
              v-model="selectedAuthority"
              :options="selectedAuthorityItem"
              :isInline="true"
            />
          </td>
        </tr>
      </tbody>
    </v-table>

    <h3 class="tit mt_40">변경사유</h3>
    <div class="con">
      <v-textarea
        class="h_100 mt_10"
        v-model="rbprsnChgResncd"
        :rules="$utils.getRules(['required|변경사유를 입력해주세요.', 'maxLength|30'])"
        placeholder="30자 이내로 사유를 직접 입력해주세요."
      ></v-textarea>
    </div>

    <div class="btm_btn_wrap">
      <v-btn class="vbtn blue" @click="closePop">취소</v-btn>
      <v-btn class="vbtn" @click="goOk">확인</v-btn>
    </div>
  </div>
</template>

<script setup>
import { memApi } from '@/api/index.ts'

const emits = defineEmits(['close-dialog'])

const rbprsnChgResncd = ref('') // 변경사유
const rbprsnList = ref([]) // 회원리스트 넣는변수
const rbprsnListCd = ref('') // 선택 됬을때 회원

const selectedAuthority = ref('N') // 회원전환
const selectedAuthorityItem = [
  { label: '일반회원전환', value: 'N' },
  { label: '회원탈퇴', value: 'Y' },
]

const currentPage = ref(0) //현재페이지
const pageSize = ref(100)

// 신규책임자 리스트
const props = defineProps({
  data: {
    memberInfo: Object,
    default: {},
  },
})

// 닫기 버튼 클릭시
const closePop = () => {
  emits('close-dialog')
}

/********************************* INIT ****************************/
onMounted(() => {
  listApi() // 회원목록들고옴 해당 기관에있는
})

// 책임자변경 ok
const goOk = () => {
  // 변경사유 입력되지 않을때 체크
  if (!rbprsnChgResncd.value) {
    $fx.throwAlert('변경사유가 입력되지 않았습니다.')
    return
  }

  // 신규책임자 선택되지 않을때 체크
  if (!rbprsnListCd.value) {
    $fx.throwAlert('신규책임자를 선택해주세요.')
    return
  }

  const member = rbprsnList.value.find((item) => item.value === rbprsnListCd.value)
  const memDivCd = member.memDivCd
  // 삭제인지 아닌지 확인
  if (selectedAuthority.value === 'Y') {
    if (memDivCd === 'M') {
      $fx.throwAlert(
        '책임자 회원님, 회원님의 권한을 변경 후 회원탈퇴가 가능합니다.<br><br>문의처 : 02-0000-0000',
      )
    } else {
      callApi()
    }
  } else {
    if (memDivCd === 'M') {
      $fx.throwAlert(
        '책임자 회원님, 회원님의 권한을 변경 후 회원변경이 가능합니다.<br><br>문의처 : 02-0000-0000',
      )
    } else {
      callApi()
    }
  }
}

// 일반회원 조회
const listApi = () => {
  const params = {
    instId: props.data.memberInfo.instId,
    viewSeq: currentPage?.value,
    viewCount: pageSize?.value,
  }
  console.log(params, 'params')
  $fx.startLoadingbar()
  memApi
    .MEM0202S01(params)
    .then((response) => {
      const resultData = response.result.memberList
      // 회원구분: M, 탈퇴회원 필터로 구분해서 넣기 책임자M, 승인회원: A
      // 책임자회원 memDivCd === 'M', 탈퇴회원 memJoinStatCd === '9'
      const tempList = resultData.map((item) => {
        return {
          ...item,
          title: `[${item.memNm}] ${item.memBrth}`,
          value: item.memId,
        }
      })

      if (rbprsnList.value) {
        rbprsnList.value.push({ title: '선택해주세요', value: '' })
        rbprsnList.value.push(
          ...tempList.filter(
            (item) => item.memJoinStatCd !== '9' && item.memDivCd !== 'M' && item.memDivCd !== 'A',
          ),
        )
      } else {
        rbprsnList.value.push({ title: '조회된 회원이 없습니다.', value: '' })
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// 책임자변경
const callApi = () => {
  const params = {
    instId: props.data.memberInfo.instId, // 기관ID
    memId: rbprsnListCd.value, // 변경후 책임자
    rbprsnChgResn: rbprsnChgResncd.value, // 책임자변경사유
    managerCancelYn: selectedAuthority?.value, // 책임자탈퇴여부
  }
  console.log(params, '책임자 팝업')
  $fx.startLoadingbar()
  memApi
    .MEM0202U06(params)
    .then((response) => {
      $fx
        .throwAlert(
          '권한이 변경되었습니다.<br>회원님의 권한 변경을 위해 자동으로 로그아웃 됩니다.<br>로그인 하시면 책임자 권한이 부여됩니다.',
          '확인',
          {
            closeLabel: '로그인',
          },
        )
        .then(() => {
          $fx.logout('MLOG001')
        })
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
