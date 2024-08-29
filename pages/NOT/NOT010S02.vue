<template>
  <v-form ref="form">
    <v-table class="vtable_view">
      <tbody>
        <tr>
          <th>제목</th>
          <td>
            <div class="d_flex">
              <v-text-field
                label="제목"
                ref="infrmTtlRef"
                v-model="noticeParams.infrmTtl"
                :rules="$utils.getRules(['required|제목을 입력해주세요.'])"
                placeholder="제목을 입력해주세요."
                :maxlength="60"
                class="i_basics"
              ></v-text-field>
              <CommonComSelectBox
                v-model="noticeParams.pstgSeq"
                :items="itemsOder"
                class="s_basics w_150 ml_5"
              />
            </div>
          </td>
        </tr>
        <tr>
          <th>게시기간</th>
          <td class="flex">
            <div class="i_calender">
              <CommonComDatePicker
                v-model="noticeParams.pstgStrtDate"
                :rules="$utils.getRules(['required|날짜를 입력해주세요.'])"
                class="i_date w_150"
                placeholder="날짜선택"
              />
              <span>~</span>
              <CommonComDatePicker
                v-model="noticeParams.pstgEndDate"
                :rules="$utils.getRules(['required|날짜를 입력해주세요.'])"
                class="i_date w_150"
                placeholder="날짜선택"
              />
              <v-checkbox
                v-model="noticeParams.popupYn"
                true-value="Y"
                false-value="N"
                class="ml_20"
                :label="`팝업 게시`"
              />
            </div>
          </td>
        </tr>
        <tr>
          <th>첨부파일</th>
          <td>
            <!-- 등록화면일때 -->
            {{ fileName }}
            <v-btn class="vbtn line" size="small" v-if="!procFlag" @click="showPopup"
              >파일 선택</v-btn
            >
            <!-- 수정화면일때 -->
            <span v-if="procFlag" class="mr_10">{{ noticeParams.atchDocNm }}</span>
            <v-btn class="vbtn line" size="small" v-if="procFlag" @click="showPopup"
              >파일 선택</v-btn
            >
            <v-btn
              class="vbtn btn_file_del ml_10"
              size="small"
              v-if="procFlag && noticeParams.atchDocNm"
              @click="delShowPopup"
              >삭제</v-btn
            >
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td>
            <v-textarea
              ref="infrmCtnRef"
              id="cnclTxt"
              class="h_300"
              v-model="noticeParams.infrmCtn"
              :rules="$utils.getRules(['required|내용을 입력해주세요.'])"
              placeholder="내용을 입력해주세요."
              :maxlength="1300"
            ></v-textarea>
          </td>
        </tr>
      </tbody>
    </v-table>

    <div class="btm_btn_wrap">
      <v-btn class="vbtn blue" size="small" @click="goBack">목록</v-btn>
      <v-btn class="vbtn blue" size="small" @click="goState('D')" v-if="procFlag">삭제</v-btn>

      <v-btn class="vbtn" size="small" @click="goState('U')" v-if="procFlag">수정</v-btn>
      <v-btn class="vbtn" size="small" @click="goState('N')" v-if="!procFlag">신규 작성 완료</v-btn>
    </div>
  </v-form>
</template>

<script setup>
import { notApi } from '@/api/index.ts'

const NOT001P01 = 'NOTNOT001P01' //쪽지 상세 팝업

/*********************************** 변수 관련 정의 ***************************/
const form = ref(null)
const valid = ref(false)
const formRef = ref(null) // new

// 체크박스 순서
const comboOder = ref('')
const itemsOder = ref([
  // { title: '공지순서', value: '' },
  { title: '1', value: '1' },
  { title: '2', value: '2' },
  { title: '3', value: '3' },
  { title: '4', value: '4' },
  { title: '5', value: '5' },
])

const fileName = ref('') // 파일 이름
const popupYns = ref('N') // 팝업게시여부 확인
const procFlag = ref('') // 수정인지 삭제인지...
const instIdState = ref('') // id값
const docJobDivCdList = ref([]) // 파일첨부 리스트
const atchDocNoData = ref('') //
const atchDocNmData = ref('') //
const lenCtn = ref(0)

// notice 파라미터 셋팅
const noticeParams = ref({
  instId: 'ADMIN', // 기관ID (관리자에서 등록 시 ADMIN)
  infrmSeq: '', // 해당 시퀀스값
  infrmTtl: '', // 제목입력
  infrmCtn: '', // 내용입력
  pstgSeq: '', // 노출순번
  pstgStrtDate: '', // 게시시작일자
  pstgEndDate: '', // 게시종료일자
  popupYn: 'N', // 메인팝업여부
  atchDocNo: '', // 첨부문서번호 => TODO 첨부파일
  atchDocNm: '', // 첨부문서이름 => TODO 첨부파일
  procFlag: '', // 등록 N, 수정일때 U
  ordrInstId: '',
  comboOder: '',
})

/*********************************** 파일첨부관련 ***************************/
// 파일첨부 등록 팝업
const showPopup = () => {
  const data = {
    ordrInstId: 'ADMIN', // 발주기관ID
    docJobMngNo: '0', // 문서업무관리번호
    docJobDivCd: '100', // 문서업무구분
    atchDocNo: '', // 첨부문서번호 optional
  }
  $fx
    .throwDialog(NOT001P01, {
      data,
      close: false,
      title: '공지사항 파일첨부',
    })
    .then((result) => {
      if (result) {
        noticeParams.value.atchDocNo = result.atchDocNo
        noticeParams.value.atchDocNm = result.atchDocNm
        if (result.file.length > 0) {
          fileName.value = result.file[0].name
        }
      }
    })
}

// 페이지 로드시 최초실행
onMounted(() => {
  // 수정화면인지, 등록화면인지 구분하는 값이 필요. infrmSeq
  procFlag.value = !!$fx.getParams().infrmSeq // 수정화면, 등록화면 구분값
  // console.log(procFlag.value, 'procFlag.value')

  if ($fx.getParams().infrmSeq) {
    // 수정화면
    navigator('update')

    noticeParams.value.instId = $fx.getParams().instId
    noticeParams.value.infrmSeq = $fx.getParams().infrmSeq

    callApi() // 조회

    // 상세화면에서 새로고침할때
  } else if ($fx.getParams().type === 'NEW') {
    // 등록화면
    navigator('init')
  } else {
    $fx.move('ANOT001')
  }
})

// navigator
const navigator = (value) => {
  if (value === 'update') {
    // header 파라미터 강제셋팅
    let navigator = ['홈', '고객센터', '공지사항 목록', '공지사항 상세', '공지사항 수정']
    $fx.setNavigator('공지사항 수정', navigator)
  } else {
    // header 파라미터 강제셋팅
    let navigator = ['홈', '고객센터', '공지사항 목록', '공지사항 등록']
    $fx.setNavigator('공지사항 등록', navigator)
  }
}

// 벨리데이션 체크
const validateChk = async () => {
  if (!noticeParams.value.pstgStrtDate && !noticeParams.value.pstgEndDate) {
    $fx.throwAlert('날짜를 선택해주세요.', '알람')

    return false
  }

  if (noticeParams.value.pstgStrtDate >= noticeParams.value.pstgEndDate) {
    $fx.throwAlert(
      '지정한 날짜를 다시 확인하세요.<br>시작날짜가 종료날짜보다 클수 없습니다.',
      '알람',
    )
    return false
  }
  return true
}

// 등록, 수정, 삭제 관련 메서드
const goState = async (value) => {
  const dataValue = await $utils.validateForm(form)
  if (!dataValue.isValid) return
  const checkData = await validateChk()
  if (!checkData) return

  procFlag.value = value
  if (procFlag.value === 'N') {
    saveApi() // 등록 API
  } else if (procFlag.value === 'D') {
    if (procFlag.value === 'D') {
      // console.log(procFlag.value, '삭제쪽 진입')
      $fx
        .throwConfirm('삭제를 진행하시겠습니까?', '알림', {
          confirmLabel: '확인',
          closeLabel: '취소',
        })
        .then((result) => {
          if (result) {
            updateApi() // 삭제 API
          }
        })
    }
  } else {
    $fx
      .throwConfirm('수정을 진행하시겠습니까?', '알림', {
        confirmLabel: '확인',
        closeLabel: '취소',
      })
      .then((result) => {
        if (result) {
          updateApi() // 삭제 API
        }
      })
  }
}

// 목록으로 가기
const goBack = () => {
  $fx.move('ANOT001', {})
}

// 삭제버튼 클릭시 초기화
const delShowPopup = () => {
  noticeParams.value.atchDocNo = ''
  atchDocNoData.value = ''
  atchDocNmData.value = ''
  noticeParams.value.atchDocId = ''
  noticeParams.value.atchDocNm = ''
  fileName.value = ''
}
/*********************************** API ***************************/
// 상세 조회
const callApi = () => {
  const params = noticeParams.value // 파라미터 셋팅
  $fx.startLoadingbar()
  notApi
    .NOT0101S02(params)
    .then((response) => {
      const resultData = response.result.result
      // console.log(resultData, 'resultData')
      noticeParams.value.infrmTtl = $utils.convertRegexToText(resultData.infrmTtl) // 제목
      noticeParams.value.infrmCtn = $utils.convertRegexToText(resultData.infrmCtn) // 내용
      noticeParams.value.pstgStrtDate = resultData.pstgStrtDate // 게시시작일자
      noticeParams.value.pstgEndDate = resultData.pstgEndDate // 게시종료일자
      noticeParams.value.popupYn = resultData.popupYn // 팝업게시여부
      noticeParams.value.comboOder = resultData.comboOder
      noticeParams.value.atchDocNo = resultData.atchDocNo
      noticeParams.value.atchDocNm = resultData.atchDocNm
      noticeParams.value.pstgSeq = resultData.pstgSeq ?? '' // 노출 순번
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// 공지사항 신규등록
const saveApi = () => {
  const params = noticeParams.value
  params.infrmSeq = $fx.getParams().infrmSeq //
  params.procFlag = 'N'
  // console.log(params, 'params 등록')
  $fx.startLoadingbar()
  notApi
    .NOT0101I03(params)
    .then((response) => {
      if (response) {
        let contentsMsg = '등록이 완료되었습니다.'
        $fx.throwAlert(contentsMsg, '알림').then((result) => {
          $fx.move('ANOT001')
        })
      } else {
        $fx.throwAlert('등록이 실패하였습니다.', '알림').then((result) => {
          $fx.move('/')
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// 수정 관련 api
const updateApi = () => {
  const params = noticeParams.value
  params.infrmSeq = $fx.getParams().infrmSeq //
  params.procFlag = procFlag.value // 수정인지 삭제인지 확인값
  $fx.startLoadingbar()
  notApi
    .NOT0101U04(params)
    .then((response) => {
      if (response) {
        if (params.procFlag === 'U') {
          // 수정
          let contentsMsg = '수정이 완료되었습니다.'
          $fx.throwAlert(contentsMsg, '알림').then((result) => {
            $fx.move('ANOT001')
          })
        } else {
          // 삭제
          let contentsMsg = '삭제가 완료되었습니다.'
          $fx.throwAlert(contentsMsg, '알림').then((result) => {
            $fx.move('ANOT001')
          })
        }
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
