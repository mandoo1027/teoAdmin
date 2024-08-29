<template>
  <div class="title_box">
    <h2>발주기관 회원가입</h2>
    <ul class="loc">
      <li>홈</li>
      <li>발주기관 회원가입</li>
    </ul>
  </div>

  <div class="tit_btn">
    <h3 class="tit">기관 정보</h3>
  </div>
  <v-table class="vtable_view">
    <colgroup>
      <col style="width:234px;" />
      <col style="width:*;" />
    </colgroup>
    <tbody>
      <tr>
        <th>기관 코드</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="기관코드"
              v-model="rogCode"
              :rules="rogCodeRules"
              placeholder="영문자 4자리"
              class="i_basics w_300"
            ></v-text-field>
            <v-btn class="vbtn ml_5 black" size="small">중복확인</v-btn>
          </div>
        </td>
      </tr>
      <tr>
        <th>기관 ID</th>
        <td>shinhan01</td>
      </tr>
      <tr>
        <th>기업 구분</th>
        <td><ComRadioButton :options="radioOptions" v-model="selectedValue" :isInline="true" /></td>
      </tr>
      <tr>
        <th>기관 명</th>
        <td><v-text-field label="기관 명" v-model="orgName" :rules="orgNameRules" placeholder="기관명을 입력해주세요." class="i_basics w_300" /></td>
      </tr>
      <tr>
        <th>사업자등록번호</th>
        <td><v-text-field label="사업자등록번호" v-model="corporateNum" :rules="corporateNumRules" placeholder="사업자등록번호를 입력해주세요." class="i_basics w_300" /></td>
      </tr>
      <tr>
        <th>사업자 명</th>
        <td><v-text-field label="사업자 명" v-model="businessperson" :rules="businesspersonRules" placeholder="사업자 명을 입력해주세요." class="i_basics w_300" /></td>
      </tr>
      <tr>
        <th>대표자 명</th>
        <td><v-text-field label="대표자 명" v-model="president" :rules="presidentRules" placeholder="대표자 명을 입력해주세요." class="i_basics w_300" /></td>
      </tr>
      <tr>
        <th>사업장 주소</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="사업장 주소"
              v-model="address"
              :rules="addressRules"
              placeholder="사업장 우편번호를 입력해주세요."
              class="i_basics w_300"
            ></v-text-field>
            <v-btn class="vbtn ml_5 black" size="small">주소검색</v-btn>
          </div>
          <v-text-field
              label="사업장 주소"
              v-model="address2"
              :rules="addressRules2"
              placeholder="사업장 주소를 입력하세요."
              class="i_basics mt_5"
            ></v-text-field>
            <v-text-field
              label="사업장 주소"
              v-model="address3"
              :rules="addressRules3"
              placeholder="사업장 상세 주소를 입력하세요."
              class="i_basics mt_5"
            ></v-text-field>
        </td>
      </tr>
      <tr>
        <th>회사 이메일용 도메인</th>
        <td>
          <v-text-field label="회사 이메일용 도메인<" v-model="president" :rules="presidentRules" placeholder="회사 이메일용 도메인을 입력해주세요." class="i_basics w_300" />
          <p class="tip_txt mt_5">회원가입 시 회사 이메일 정보로 추가 하시려면 일반회원 가입 시 이메일 정보 기입(예시 : Shinhan.com)</p>
        </td>
      </tr>
      <tr>
        <th>가입 시작일~종료일</th>
        <td>
          <div class="i_calender">
            <ComDatePicker v-model="startDate" class="i_date w_200" placeholder="날짜선택" />
            <span>~</span>
            <ComDatePicker v-model="endDate" class="i_date w_200" placeholder="날짜선택" />
          </div>
        </td>
      </tr>
      <tr>
        <th>발주기관 협약 가능</th>
        <td>
          <div class="d_flex a_center">
            <div class="w_192">
              <v-checkbox v-model="checkbox1" :label="`AI-OCR`" class="ico_aiocr" />  
            </div>
             <v-btn class="vbtn black" size="small">문서목록</v-btn>
          </div>
          <div class="d_flex a_start mt_5">
            <div class="w_192 mt_8">
              <v-checkbox v-model="checkbox2" :label="`3자이체`" class="ico_acc" />  
            </div>
            <v-text-field
              label="펌 서비스 업무코드"
              v-model="pumCode"
              :rules="pumCodeRules"
              placeholder="펌 서비스 업무코드"
              class="i_basics w_300"
            ></v-text-field>
             <v-btn class="vbtn black ml_5" size="small">중복확인</v-btn>
          </div>
          <div class="d_flex a_start mt_5">
            <div class="w_192 mt_8">
              <v-checkbox v-model="checkbox3" :label="`계정이체(EasyPlus)`" class="ico_acc2" />  
            </div>
            <v-text-field
              label="EZ+업무코드"
              v-model="ezCode"
              :rules="ezCodeRules"
              placeholder="EZ+업무코드"
              class="i_basics w_300"
            ></v-text-field>
             <v-btn class="vbtn black ml_5" size="small">중복확인</v-btn>
          </div>
          <div class="d_flex a_start mt_5">
            <div class="w_192 mt_8">
              <v-checkbox v-model="checkbox4" :label="`ERP 연계`" class="ico_erp" />  
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th>접속 url</th>
        <td>
          <div class="p_re">
            <p class="ipt_tit">http://</p>
            <v-text-field label="접속 url" v-model="url" :rules="urlRules" placeholder="" class="i_basics over_tit" />
          </div>
        </td>
      </tr>
      <tr>
        <th>스킨 용 css</th>
        <td>
          <div class="p_re">
            <p class="ipt_tit">http://</p>
            <v-text-field label="스킨 용 css" v-model="skinCss" :rules="skinCssRules" placeholder="" class="i_basics over_tit" />
          </div>
        </td>
      </tr>
      <tr>
        <th>로고 용 css</th>
        <td>
          <div class="p_re">
            <p class="ipt_tit">http://</p>
            <v-text-field label="로고 용 css" v-model="logoCss" :rules="logoCssRules" placeholder="" class="i_basics over_tit" />
          </div>
        </td>
      </tr>
      <tr>
        <th>비고</th>
        <td><v-text-field label="비고" v-model="etc" :rules="etcRules" placeholder="" class="i_basics" /></td>
      </tr>
    </tbody>
  </v-table>

  <div class="tit_btn">
    <h3 class="tit">책임자 정보</h3>
  </div>
  <v-table class="vtable_view">
    <colgroup>
      <col style="width:234px;" />
      <col style="width:*;" />
    </colgroup>
    <tbody>
      <tr>
        <th>소속 기관직무</th>
        <td><ComRadioButton :options="affiliation" v-model="affiliationValue" :isInline="true" /></td>
      </tr>
      <tr>
        <th>회원 구분</th>
        <td><ComRadioButton :options="member" v-model="memberValue" :isInline="true" /></td>
      </tr>
      <tr>
        <th>회원 인증 방법</th>
        <td><ComRadioButton :options="admin" v-model="adminValue" :isInline="true" /></td>
      </tr>
      <tr>
        <th>아이디</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="아이디"
              v-model="userId"
              :rules="userIdRules"
              placeholder="영문 대문자, 숫자 6~16자리"
              class="i_basics w_300"
            ></v-text-field>
            <v-btn class="vbtn ml_5 black" size="small">중복확인</v-btn>
          </div>
        </td>
      </tr>
      <tr>
        <th>비밀번호</th>
         <td><v-text-field label="비밀번호" v-model="userPwd" :rules="userPwdRules" placeholder="" class="i_basics w_300" /></td>
      </tr>
      <tr>
        <th>비밀번호 확인</th>
        <td><v-text-field label="비밀번호 확인" v-model="userPwdRe" :rules="userPwdReRules" placeholder="" class="i_basics w_300" /></td>
      </tr>
      <tr>
        <td colspan="2" class="pd_0">
          <div class="ifm_keysec">
            <iframe src="/admin/keyboard_security.html" frameborder="0" width="100%" height="100%"></iframe>
          </div>
        </td>
      </tr>
      <tr>
        <th>성명/내외국인</th>
        <td>
          <div class="d_flex a_center">
            <v-text-field
              label="성명"
              v-model="userName"
              :rules="userNameRules"
              placeholder="성명을 입력해주세요."
              class="i_basics w_300"
            ></v-text-field>
            <ComRadioButton :options="nationality" v-model="nationalityValue" :isInline="true" class="ml_20" />
          </div>
        </td>
      </tr>
      <tr>
        <th>생년월일/성별</th>
        <td>
          <div class="d_flex a_center">
            <v-text-field
              label="생년월일"
              v-model="birthday"
              :rules="birthdayRules"
              placeholder="생년월일을 입력해주세요."
              class="i_basics w_300"
            ></v-text-field>
            <ComRadioButton :options="sex" v-model="sexValue" :isInline="true" class="ml_20" />
          </div>
        </td>
      </tr>
      <tr>
        <th>휴대전화번호</th>
        <td>
          <div class="d_flex a_start">
            <ComSelectBox groupCode="01" v-model="mobile" :items="itemsMobile" :isDefault="false" class="s_basics w_100"/>
            <v-text-field label="휴대전화번호 중간 자리" v-model="mobile2" :rules="mobile2Rules" placeholder="" class="i_basics w_100 ml_5" />
            <v-text-field label="휴대전화번호 마지막 자리" v-model="mobile3" :rules="mobile3Rules" placeholder="" class="i_basics w_100 ml_5" />
          </div>
        </td>
      </tr>
      <tr>
        <th>이메일 주소</th>
        <td>
          <div class="d_flex a_start">
            <v-text-field label="이메일 주소" v-model="email1" :rules="email1Rules" placeholder="" class="i_basics w_200 mr_10" />
            <span class="mt_6">@</span>
            <ComSelectBox groupCode="01" v-model="email2" :items="itemsEmail2" :isDefault="false" class="s_basics w_200 ml_10"/>
            <v-text-field label="이메일 주소" v-model="email3" :rules="email3Rules" placeholder="" class="i_basics w_200 ml_5" />
          </div>
        </td>
      </tr>
      <tr>
        <th>안내 채널</th>
        <td><ComRadioButton :options="channel" v-model="channelValue" :isInline="true" class="" /></td>
      </tr>
    </tbody>
  </v-table>

</template>

<style scoped>
</style>
<script setup >

import ComSelectBox from '@/components/common/ComSelectBox.vue'
import ComRadioButton from '@/components/common/ComRadioButton.vue'
import ComDatePicker from '@/components/common/ComDatePicker.vue'

/* 라디오버튼 */
const selectedValue = ref(null)
const radioOptions = [
  { label: '공공기관', value: 'value1' },
  { label: '일반기업', value: 'value2' },
  { label: '개인사업자', value: 'value3' },
  { label: '외국기업', value: 'value4' },
]

const orgName = ref('')
const orgNameRules = [
  (v) => !!v || '기관명을 입력해주세요.',
  //(v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

const corporateNum = ref('')
const corporateNumRules = [
  (v) => !!v || '사업자등록번호를 입력해주세요.',
]

const businessperson = ref('')
const businesspersonRules = [
  (v) => !!v || '사업자 명을 입력해주세요.',
]

const president = ref('')
const presidentRules = [
  (v) => !!v || '대표자 명을 입력해주세요.',
]

const address = ref('')
const addressRules = [
  (v) => !!v || '사업장 우편번호를 입력해주세요.',
]
const address2 = ref('')
const addressRules2 = [
  (v) => !!v || '사업장 주소를 입력해주세요.',
]
const address3 = ref('')
const addressRules3 = [
  (v) => !!v || '사업장 상세 주소를 입력해주세요.',
]

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

const checkbox1 = ref(false)
const checkbox2 = ref(false)
const checkbox3 = ref(false)
const checkbox4 = ref(false)

const pumCode = ref('')
const pumCodeRules = [
  (v) => !!v || '펌 서비스 업무코드를 입력해주세요.',
]

const ezCode = ref('')
const ezCodeRules = [
  (v) => !!v || 'EZ+업무코드를 입력해주세요.',
]

const url = ref('')
const urlRules = [
  (v) => !!v || '접속 url을 입력해주세요.',
]

const skinCss = ref('')
const skinCssRules = [
  (v) => !!v || '스킨용 css를 입력해주세요.',
]

const logoCss = ref('')
const logoCssRules = [
  (v) => !!v || '로고용 css를 입력해주세요.',
]

const etc = ref('')
const etcRules = [
  (v) => !!v || '비고를 입력해주세요.',
]

const affiliationValue = ref(null)
const affiliation = [
  { label: '사업', value: 'value1' },
  { label: '회계', value: 'value2' },
  { label: '사업승인', value: 'value3' },
  { label: '수탁사 승인(타기관)', value: 'value4' },
  { label: '지자체 승인(타기관)', value: 'value5' },
]

const memberValue = ref(null)
const member = [
  { label: '책임자', value: 'value1' },
  { label: '승인회원', value: 'value2' },
]

const adminValue = ref(null)
const admin = [
  { label: '관리자 인증', value: 'value1' },
]

const userId = ref('')
const userIdRules = [
  (v) => !!v || '아이디를 입력해주세요.',
]

const userPwd = ref('')
const userPwdRules = [
  (v) => !!v || '비밀번호를 입력해주세요.',
]

const userPwdRe = ref('')
const userPwdReRules = [
  (v) => !!v || '비밀번호를 입력해주세요.',
]

const userName = ref('')
const userNameRules = [
  (v) => !!v || '성명을 입력해주세요.',
]

const nationalityValue = ref(null)
const nationality = [
  { label: '내국인', value: 'value1' },
  { label: '외국인', value: 'value2' },
]

const birthday = ref('')
const birthdayRules = [
  (v) => !!v || '생년월일을 입력해주세요.',
]

const sexValue = ref(null)
const sex = [
  { label: '남', value: 'value1' },
  { label: '여', value: 'value2' },
]

const mobile = ref('001')
const itemsMobile = ref([
  { title: '010', value: '001' },
  { title: '011', value: '002' },
  { title: '017', value: '003' },
])

const mobile2 = ref('')
const mobile2Rules = [
  (v) => !!v || '중간 자리를 입력하세요.',
]

const mobile3 = ref('')
const mobile3Rules = [
  (v) => !!v || '마지막 자리를 입력하세요.',
]

const email2 = ref('001')
const itemsEmail2 = ref([
  { title: '직접선택', value: '001' },
  { title: 'NAVER', value: '002' },
  { title: 'NATE', value: '003' },
])

const email1 = ref('')
const email1Rules = [
  (v) => !!v || '이메일 주소를 입력하세요.',
]

const email3 = ref('')
const email3Rules = [
  (v) => !!v || '이메일 주소를 입력하세요.',
]

const channelValue = ref(null)
const channel = [
  { label: '미신청', value: 'value1' },
  { label: 'SMS', value: 'value2' },
  { label: '이메일', value: 'value3' },
]

</script> 