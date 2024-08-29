<template>
  <h2>관리자 퍼블 목록</h2>

  <ul class="pub_list">
    <li>
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
    </li>

    <li>
      <span>SOAP 관리자 템플릿</span>
      <span></span>
      <span></span>
      <span></span>
      <span>템플릿</span>
      <span><nuxt-link to="/pub/admin/Template" class="vlink blue line">Template</nuxt-link></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </li>

    <li>
      <span>AICMS 관리자</span>
      <span>관리자 인트로</span>
      <span>로그인</span>
      <span>LOG001</span>
      <span>LOG</span>
      <span
        ><nuxt-link to="/pub/admin/LOG001M00" class="vlink blue line">LOG001M00</nuxt-link></span
      >
      <span>로그인 화면</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-09-19</span>
      <span></span>
    </li>
    <li>
      <span></span>
      <span>메인</span>
      <span></span>
      <span></span>
      <span>LOG</span>
      <span
        ><nuxt-link to="/pub/admin/LOG002M00" class="vlink blue line">LOG002M00</nuxt-link></span
      >
      <span></span>
      <span>메인</span>
      <span>O</span>
      <span>2023-12-07</span>
      <span></span>
    </li>
    <li>
      <span></span>
      <span>설치페이지</span>
      <span></span>
      <span></span>
      <span></span>
      <span
        ><nuxt-link to="/pub/admin/HOM001M01" class="vlink blue line"
          >HOM001M01</nuxt-link
        ></span
      >
      <span></span>
      <span>메인</span>
      <span></span>
      <span></span>
      <span></span>
    </li>
    <li>
      <span></span>
      <span>회원관리</span>
      <span>일반 회원 조회</span>
      <span>MEM001</span>
      <span>MEM</span>
      <span
        ><nuxt-link to="/pub/admin/MEM/MEM001M00" class="vlink blue line"
          >MEM001M00</nuxt-link
        ></span
      >
      <span>일반 회원 목록 조회</span>
      <span>메인</span>
      <span></span>
      <span></span>
      <span></span>
    </li>
    <li>
      <span></span>
      <span>발주기관 회원가입</span>
      <span></span>
      <span></span>
      <span>MEM</span>
      <span
        ><nuxt-link to="/pub/admin/MEM/MEM201M03" class="vlink blue line"
          >MEM201M03</nuxt-link
        ></span
      >
      <span>발주기관 회원가입</span>
      <span>메인</span>
      <span></span>
      <span>2023-12-14</span>
      <span></span>
    </li>
    <li>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </li>
    <li>
      <span></span>
      <span>프레임워크관리자</span>
      <span>공통코드관리</span>
      <span>MADM008</span>
      <span>ADM</span>
      <span
        ><nuxt-link to="/pub/admin/ADM/ADM107M01" class="vlink blue line"
          >ADM107M01</nuxt-link
        ></span
      >
      <span>공통코드관리</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-09-22</span>
      <span></span>
    </li>

    <li>
      <span></span>
      <span>OTP 인증 팝업</span>
      <span></span>
      <span></span>
      <span>LOG</span>
      <span
        ><nuxt-link to="/pub/admin/LOG001P09" class="vlink blue line"
          >LOG001P09</nuxt-link
        ></span
      >
      <span></span>
      <span>팝업</span>
      <span>O</span>
      <span>2024-01-12</span>
      <span></span>
    </li>

    <li>
      <span></span>
      <span></span>
      <span>서버모니터링</span>
      <span>MADM013</span>
      <span>ADM</span>
      <span
        ><nuxt-link to="/pub/admin/ADM/ADM112M01" class="vlink blue line"
          >ADM112M01</nuxt-link
        ></span
      >
      <span>서버모니터링</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-10-06</span>
      <span></span>
    </li>

    <li>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </li>

    <li>
      <span></span>
      <span>시스템관리</span>
      <span>관리자 계정관리</span>
      <span>MADM001</span>
      <span>ADM</span>
      <span
        ><nuxt-link to="/pub/admin/ADM/ADM100M01" class="vlink blue line"
          >ADM100M01</nuxt-link
        ></span
      >
      <span>관리자 계정관리</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-10-06</span>
      <span></span>
    </li>
    <li>
      <span></span>
      <span></span>
      <span></span>
      <span>MADM002</span>
      <span>ADM</span>
      <span
        ><nuxt-link to="/pub/admin/ADM/ADM101M01" class="vlink blue line"
          >ADM101M01</nuxt-link
        ></span
      >
      <span>관리자 계정 등록/수정/삭제</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-10-06</span>
      <span></span>
    </li>
    <li>
      <span></span>
      <span></span>
      <span>전자서명조회</span>
      <span></span>
      <span>ADM</span>
      <span
        ><nuxt-link to="/pub/admin/ADM/ADMS0023" class="vlink blue line"
          >ADMS0023</nuxt-link
        ></span
      >
      <span>전자서명조회</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-12-19</span>
      <span class="etc">파일ID 확인 필요</span>
    </li>
    <li>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span>ADM</span>
      <span
        ><nuxt-link to="/pub/admin/ADM/ADMS0024" class="vlink blue line"
          >ADMS0024</nuxt-link
        ></span
      >
      <span>전자서명조회 상세</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-12-19</span>
      <span class="etc">파일ID 확인 필요</span>
    </li>
    <li>
      <span></span>
      <span></span>
      <span>이체거래내역</span>
      <span></span>
      <span>ADM</span>
      <span
        ><nuxt-link to="/pub/admin/ADM/ADMS0025" class="vlink blue line"
          >ADMS0025</nuxt-link
        ></span
      >
      <span>이체거래내역</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-12-19</span>
      <span class="etc">파일ID 확인 필요</span>
    </li>
    <li>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span>ADM</span>
      <span
        ><nuxt-link to="/pub/admin/ADM/ADMS0026" class="vlink blue line"
          >ADMS0026</nuxt-link
        ></span
      >
      <span>이체거래내역 상세</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-12-19</span>
      <span class="etc">파일ID 확인 필요</span>
    </li>

    <li>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </li>

    <li>
      <span></span>
      <span>통계관리</span>
      <span>회계년도별현황</span>
      <span></span>
      <span>ADM</span>
      <span
        ><nuxt-link to="/pub/admin/ADM/ADMS0045" class="vlink blue line"
          >ADMS0045</nuxt-link
        ></span
      >
      <span>회계년도별현황</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-12-19</span>
      <span class="etc">파일ID 확인 필요</span>
    </li>

    <li>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </li>

    <li>
      <span></span>
      <span>배치관리</span>
      <span>배치관리</span>
      <span>MBAT001</span>
      <span>BAT</span>
      <span
        ><nuxt-link to="/pub/admin/BAT/BAT101M01" class="vlink blue line"
          >BAT101M01</nuxt-link
        ></span
      >
      <span>배치관리</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-10-06</span>
      <span></span>
    </li>
    <li>
      <span></span>
      <span>배치관리</span>
      <span>배치관리</span>
      <span>MBAT001</span>
      <span>BAT</span>
      <span
        ><nuxt-link to="/pub/admin/BAT/BAT101P01" class="vlink blue line"
          >BAT101P01</nuxt-link
        ></span
      >
      <span>배치등록/수정</span>
      <span>팝업</span>
      <span>O</span>
      <span>2023-10-05</span>
      <span></span>
    </li>
    <li>
      <span></span>
      <span>배치관리</span>
      <span>작업이력조회</span>
      <span>MBAT002</span>
      <span>BAT</span>
      <span
        ><nuxt-link to="/pub/admin/BAT/BAT102P01" class="vlink blue line"
          >BAT102P01</nuxt-link
        ></span
      >
      <span>작업이력상세</span>
      <span>팝업</span>
      <span>O</span>
      <span>2023-10-05</span>
      <span></span>
    </li>

    <li>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </li>

    <li>
      <span></span>
      <span>업무관리</span>
      <span>발주기관 가상계좌현황 조회</span>
      <span>MADM017</span>
      <span></span>
      <span
        ><nuxt-link to="/pub/admin/ADM/ADMS0017" class="vlink blue line">ADMS0017</nuxt-link></span
      >
      <span>발주기관 가상계좌현황 조회</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-12-01</span>
      <span class="etc">파일ID 확인 필요</span>
    </li>
    <li>
      <span></span>
      <span>업무관리</span>
      <span>발주기관 가상계좌 등록</span>
      <span>MADM018</span>
      <span></span>
      <span
        ><nuxt-link to="/pub/admin/ADM/ADMS0018" class="vlink blue line">ADMS0018</nuxt-link></span
      >
      <span>발주기관 가상계좌 등록</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-12-01</span>
      <span class="etc">파일ID 확인 필요</span>
    </li>
    <li>
      <span></span>
      <span>업무관리</span>
      <span>발주기관 가상계좌 관리 (조회/삭제)</span>
      <span>MADM019</span>
      <span></span>
      <span
        ><nuxt-link to="/pub/admin/ADM/ADMS0019" class="vlink blue line">ADMS0019</nuxt-link></span
      >
      <span>발주기관 가상계좌 관리 (조회/삭제)</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-12-01</span>
      <span class="etc">파일ID 확인 필요</span>
    </li>
    <li>
      <span></span>
      <span>업무관리</span>
      <span>발주기관 계좌 잔액 조회</span>
      <span>MADM020</span>
      <span></span>
      <span
        ><nuxt-link to="/pub/admin/ADM/ADMS0020" class="vlink blue line">ADMS0020</nuxt-link></span
      >
      <span>발주기관 계좌 잔액 조회</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-12-18</span>
      <span class="etc">파일ID 확인 필요</span>
    </li>
    <li>
      <span></span>
      <span>업무관리</span>
      <span>정부 계좌 입금 취소</span>
      <span>MADM021</span>
      <span></span>
      <span
        ><nuxt-link to="/pub/admin/ADM/ADMS0021" class="vlink blue line">ADMS0021</nuxt-link></span
      >
      <span>정부 계좌 입금 취소</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-12-18</span>
      <span class="etc">파일ID 확인 필요</span>
    </li>
    <li>
      <span></span>
      <span>업무관리</span>
      <span>입금 취소 이체 승인</span>
      <span></span>
      <span></span>
      <span
        ><nuxt-link to="/pub/admin/ADM/ADMS0P06" class="vlink blue line">ADMS0P06</nuxt-link></span
      >
      <span>입금 취소 이체 승인</span>
      <span>팝업</span>
      <span>O</span>
      <span>2023-12-18</span>
      <span class="etc">파일ID 확인 필요</span>
    </li>

    <li>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </li>

    <li>
      <span></span>
      <span>프레임워크관리</span>
      <span>메모리로딩관리</span>
      <span>ADM0108M01</span>
      <span>BAT</span>
      <span
        ><nuxt-link to="/pub/admin/ADM/ADM0108M01" class="vlink blue line"
          >ADM0108M01</nuxt-link
        ></span
      >
      <span>메모리로딩관리</span>
      <span>메인</span>
      <span>O</span>
      <span>2023-12-08</span>
      <span class="etc">파일ID 확인 필요</span>
    </li>

    <li>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </li>
  </ul>
</template>
<script setup>
onMounted(() => {
  $fx.setNavigator('퍼블 목록1')
})
</script>
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
.pub_list li .etc {
  color: #fc0000;
}
</style>

<script setup></script>
