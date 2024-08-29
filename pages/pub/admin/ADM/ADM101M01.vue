<template>
  <!-- <h3 class="tit">배치관리</h3> -->

  <div class="caution_box mb_20">
    <ul>
      <li>관리자 등록입니다.</li>
      <li>
        교번을 입력하시고 <span class="color_red">엔터키를 입력</span>하시면 이름과 부서가
        출력됩니다.
      </li>
    </ul>
  </div>

  <v-table class="vtable_view">
    <tbody>
      <tr>
        <th>아이디</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="아이디"
              v-model="userId"
              :rules="userIdRules"
              required
              placeholder=""
              class="i_basics w_200"
            ></v-text-field>
            <v-btn class="vbtn ml_10 black" size="small">중복체크</v-btn>
          </div>
        </td>
      </tr>
      <tr>
        <th>비밀번호</th>
        <td>
          <v-text-field
            label="비밀번호"
            v-model="password"
            :rules="passwordRules"
            type="password"
            placeholder=""
            class="i_basics pwd_chk w_300"
          ></v-text-field>
        </td>
      </tr>
      <tr>
        <th>비밀번호 확인</th>
        <td>
          <v-text-field
            label="비밀번호 확인"
            v-model="passwordOk"
            :rules="passwordOkRules"
            type="password"
            placeholder=""
            class="i_basics pwd_chk w_300"
          ></v-text-field>
        </td>
      </tr>
      <tr>
        <th>이름</th>
        <td>
          <v-text-field
            label="이름"
            v-model="userName"
            :rules="userNameRules"
            required
            placeholder=""
            class="i_basics w_200"
          ></v-text-field>
        </td>
      </tr>
      <tr>
        <th>소속</th>
        <td>
          <v-text-field
            label="소속"
            v-model="affiliation"
            :rules="affiliationRules"
            required
            placeholder=""
            class="i_basics w_200"
          ></v-text-field>
        </td>
      </tr>
      <tr>
        <th>IP</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="IP"
              v-model="ip"
              :rules="ipRules"
              required
              placeholder=""
              class="i_basics w_200"
            ></v-text-field>
            <v-btn class="vbtn ml_10 black" size="small">IP확인</v-btn>
          </div>
        </td>
      </tr>
      <tr>
        <th>비고</th>
        <td><v-textarea class="h_100"></v-textarea></td>
      </tr>
      <tr>
        <th>OTP</th>
        <td>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsAQAAAABRBrPYAAADIElEQVR42u2aWW7jQAxEeQPe/5a8AYf1qpVATgaYj4HpDymJrOUZUC8sVlOJ/pet4sEe7MEe7MH+M1YRUV1zMNscd8/fHKVPdjEBmZH6ArvIOe0s7u1iFYN1zt2haYm+M2dz4yOw0BMHDz0t4HsfgrWQ+VHf6kNt+Ajsa+hnF56cPvrLDHknppD5dfsZWe/G2CZCIqdbi1nZxPMvivRubO4FYPXcv4ae01tLNzBd1bBLXtyjM/TAwy1jiuYjfrqO6EyzRnTYrWLcsxImvVz+1Ok2VmlRUSrLPB2rWSk5XMasgBpu9TJKXcnvTWqWMF3UOCuLuHMV1+lMt4oVD+27GuuQ6KSO8wOwGXgpS3GdDJL8dq9jciZJOms6OBHqxP1tY+SNZEoq+5KA51ofahXzVWkeMdwWnerqdcwGpchoRfjgo5gDuY3RBJuT7CMyZF45+WUMQUaeleXUGGal6G2s7NPTTnnuFL5F0byOaWnoJ8axBNaKhdl96DewIlPEsQMsf6zR7JcxJqDGX20R0v7SmZWbmB+9ztPj+qQ0ZJRtTNfJahYaahJ2U3VzXBuY45llq5eKHnob+WWMZbUTmQbf9qCpn9yifgOTZbKnY3lRzEl3esc2hvih0/g6oliNqnjJgO/HNOx+WJye8298O9BNjE8KJ6Krbd0bW7CNQbCqlliXj7UMype0u4CdFY8UhnA+B1Qmahkrhhwf0Ihz0g7qOr2MqTqHtHxPAdv4F7XcwMo1CIWKfZQdQb5m5xVMNQknNDeCTKcuj45lzDWvQvaU0TQNbEvvQ7+B6em1oTHt2lwQPXe13MA6/EKE1Ve4q93Rd+u+giUJ1pVgPCiFlP6RnTcwVEVLirrejoTLPB3b2HlSu3VXh+M6yG0MO0dtmBInycRvTtYxk37pRamfmDkCtI/Z4tl12sDbur804f0Y9ZLAnGhqlivq6u9r2i5ifQWyGtGWZ4L5Fs47GEsJ+z0Xnaw8vKn7AMxvVo8l4AT7F/EJ2KkbEi4u2n1l3VXMq544ingVr6+XN7tYuBR2CbVPXQqrZez5Z54He7AHe7C3Yn8AQI9AkUHcUHUAAAAASUVORK5CYII="
          />
          <p>5EIHXRJXZ66IYQAKIQMZN74VXTLZTNT7</p>
        </td>
      </tr>
    </tbody>
  </v-table>

  <div class="btm_btn_wrap">
    <v-btn class="vbtn black" size="small">이전화면</v-btn>
    <v-btn class="vbtn" size="small">저장</v-btn>
    <v-btn class="vbtn" size="small">수정</v-btn>
    <v-btn class="vbtn black" size="small">삭제</v-btn>
  </div>
</template>

<style scoped>
</style>

<script setup >
const userId = ref('')
const userIdRules = [
  (v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

const password = ref('')
const passwordRules = [
  (v) => !!v || '비밀번호 설정 방법이 맞지 않습니다. 다시 입력해주세요.',
  // (v) => (v && v.length >= 16) || '영문, 숫자 대소문자 구분없이 6~16 자리',
]

const passwordOk = ref('')
const passwordOkRules = [
  (v) => !!v || '비밀번호와 비밀번호 확인이 맞지 않습니다. 다시 입력해주세요.',
  // (v) => (v && v.length >= 16) || '영문, 숫자 대소문자 구분없이 6~16 자리',
]

const userName = ref('')
const userNameRules = [
  (v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

const affiliation = ref('')
const affiliationeRules = [
  //(v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

const ip = ref('')
const ipRules = [
  //(v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]
</script> 