<template>

  <div class="title_box">
    <h2>설치프로그램안내</h2>
    <ul class="loc">
      <li>홈</li>
      <li>설치프로그램안내</li>
    </ul>
  </div>

  <div class="conbody">

    <div class="install_page">
      <div class="top_info">
        <p class="tit">보안프로그램 설치로 안전한 서비스를 이용하실 수 있습니다.</p>
        <p class="txt">사용자 환경에 따라 오류메시지가 발행한 경우에는 다운로드 안내장에서 <span>[저장]</span>을 선택하여 PC에 다운로드 하신 후 실행해 주시기 바랍니다.</p>
      </div>

      <h3>필수 설치 프로그램</h3>
      <v-table class="vtable_view bg">
        <colgroup>
          <col style="width:350px;"/>
          <col style="width:606px;"/>
          <col style="width:200px;"/>
        </colgroup>
        <tbody>
          <tr>
            <th><strong>[필수]</strong>해킹방지 솔루션 ASTx AhnLab SafeTransaction</th>
            <td>악성 프로그램에 의해 웹페이지가 변조 되는 것을 차단해주며, 금융거래서 불법 접속 및 불법 거래 등 이상 거래를 탐지하기 위한 기기 정보를 수집하는 역할을 하는 프로그램입니다.</td>
            <td class="t_center">
              미설치<br>
              <v-btn class="vbtn line btn_down mt_10" size="small">다운로드</v-btn>
            </td>
          </tr>
          <tr>
            <th><strong>[필수]</strong>키보드보안 프로그램 TouchEn nxKey</th>
            <td>비밀번호와 같이 데이터의 보호가 필요한 정보에 대해 키보드로 직접 입력 시에도 입력 정보 유출을 차단하는 프로그램입니다. 설치를 원하지 않으시는 경우 가상키보드를 이용하시기 바랍니다.</td>
            <td class="t_center color_blue">설치</td>
          </tr>
        </tbody>
      </v-table>

      <p class="tip_txt mt_10">접속 PC 정보 : Mozilla/5.0(windows NT10.0;Win64;x64)</p>
      <ul class="ul_list">        
        <li>수동 설치 후에는 반드시 새로고침 하거나 다시 접속해주세요.</li>
        <li>설치완료 메시지가 반복적으로 나오는 경우는 브라우저 종료 및 해당 프로그램을 삭제 후 다시 설치를 진행해주시기 바랍니다.</li>
      </ul>

      <div class="caution_box mt_40">
        <p class="tit">인증서 안내</p>
        <ul>
          <li>금융인증서를 금융결제원의 안전한 클라우드에서 보관하여 도용이나 분실 걱정 없이 편리하게 인증하는 금융인증서는 개입 법인 모두 사용이 가능합니다.</li>
          <li>회원가입 및 시스템 절차에 따른 사용 시에 필수적으로 이용하는 프로그램으로 팝업 차단 시 진행이 불가 할 수 있습니다.</li>
          <li>팝업 차단 해제 후 편리하게 이용하시기 바랍니다.</li>
        </ul>
      </div>
    </div>

    <div class="btm_btn_wrap">
      <!-- <v-btn class="vbtn" size="large">이전 화면 이동</v-btn> -->
      <nuxt-link to="/HOM001M01" class="vlink">이전 화면 이동</nuxt-link>
    </div>

  </div>

</template>

<style scoped>
  
</style>

<script setup >


</script> 