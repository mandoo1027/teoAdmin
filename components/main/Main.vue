<template>
  <h2>관리자 목록</h2>

  <ul class="pub_list">
    <!-- <li>
      <span>메뉴 1 Depth</span>
      <span>메뉴 2 Depth</span>
      <span>메뉴 3 Depth</span>
      <span>메뉴코드</span>
      <span>업무구분</span>
      <span>퍼블파일ID</span>
      <span>화면명</span>
      <span>화면유형</span>
      <span>완료</span>
      <span>날짜</span>
      <span>기타</span>
    </li> -->

    <li>
      <span>일배치현황 </span>
      <span><nuxt-link to="/ADM/ADM102M01" class="vlink blue line">ADM102M01</nuxt-link></span>
    </li>
    <li>
      <span>메세지관리</span>
      <span><nuxt-link to="/ADM/ADM104M01" class="vlink blue line">ADM104M01</nuxt-link></span>
    </li>
    <li>
      <span>EAI응답코드매칭관리</span>
      <span><nuxt-link to="/ADM/ADM105M01" class="vlink blue line">ADM105M01</nuxt-link></span>
    </li>
    <li>
      <span>오류코드관리</span>
      <span><nuxt-link to="/ADM/ADM106M01" class="vlink blue line">ADM106M01</nuxt-link></span>
    </li>
    <li>
      <span>공통코드관리</span>
      <span><nuxt-link to="/ADM/ADM107M01" class="vlink blue line">ADM107M01</nuxt-link></span>
    </li>
    <li>
      <span>오류모니터링</span>
      <span><nuxt-link to="/ADM/ADM109M01" class="vlink blue line">ADM109M01</nuxt-link></span>
    </li>
    <li>
      <span>섹션모니터링</span>
      <span><nuxt-link to="/ADM/ADM110M01" class="vlink blue line">ADM110M01</nuxt-link></span>
    </li>
    <li>
      <span>서비스속성관리</span>
      <span><nuxt-link to="/ADM/ADM103M01" class="vlink blue line">ADM103M01</nuxt-link></span>
    </li>

    <li>
      <span>배치관리 (실행암됨,  차후 작업필요)</span>
      <span><nuxt-link to="/BAT/BAT101M01" class="vlink blue line">BAT101M01</nuxt-link></span>
    </li>
    <li>
      <span>배치관리 작업이력조회 (재실행기능안됨)</span>
      <span><nuxt-link to="/BAT/BAT102M01" class="vlink blue line">BAT102M01</nuxt-link></span>
    </li>
    <li>
      <span>배치관리 실행배치조회 (정지기능안됨)</span>
      <span><nuxt-link to="/BAT/BAT103M01" class="vlink blue line">BAT103M01</nuxt-link></span>
    </li>

    <li>
      <span>관리자 계정관리 </span>
      <span><nuxt-link to="/ADM/ADM100M01" class="vlink blue line">ADM100M01</nuxt-link></span>
    </li>

    <li>
      <span>서버모니터링(서버정보필요)</span>
      <span><nuxt-link to="/ADM/ADM112M01" class="vlink blue line">ADM112M01</nuxt-link></span>
    </li>

    <li>
      <span>회원목록MEM001M00</span>
      <span><nuxt-link to="/MEM/MEM001M00" class="vlink blue line">MEM001M00</nuxt-link></span>
    </li>
    <li>
      <span>파일로그(버정보필요)</span>
      <span><nuxt-link to="/ADM/ADM111M01" class="vlink blue line">ADM111M01</nuxt-link></span>
    </li>
  </ul>
</template>

<style scoped>
h2 {
  margin: 20px 0 10px;
}
.pub_list li {
  display: flex;
}
.pub_list li:hover {
  background-color: #000;
}
.pub_list li:hover span {
  color: #fff;
}
.pub_list li:hover span .vlink {
  color: #fff;
}
.pub_list li span {
  min-width: 120px;
  min-height: 30px;
  padding: 5px;
  flex: 1;
  font-size: 14px;
  text-align: center;
  border: 1px solid #000;
  border-top: 0;
}
.pub_list li:first-child span {
  border-top: 1px solid #000;
}
.pub_list li span + span {
  border-left: 0;
}
</style>

<script setup></script>
