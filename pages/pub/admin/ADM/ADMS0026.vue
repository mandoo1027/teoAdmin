<template>
  <!-- <h3 class="tit">배치관리</h3> -->

  <v-table class="vtable_view">
    <colgroup>
      <col style="width:180px;" />
      <col style="width:35%;" />
      <col style="width:180px;" />
      <col style="width:35%;" />
    </colgroup>
    <tbody>
      <tr>
        <th>집행관리번호</th>
        <td>231101CERTTEST1224121212</td>
        <th>이체실행구분</th>
        <td>회원 관리</td>
      </tr>
      <tr>
        <th>이체순번</th>
        <td>01</td>
        <th>발주기관ID</th>
        <td>ESST01</td>
      </tr>
      <tr>
        <th>사업번호</th>
        <td>1234567</td>
        <th>TASK번호</th>
        <td>1234567</td>
      </tr>
      <tr>
        <th>이체거래코드</th>
        <td>2자이체</td>
        <th>이체거래금액</th>
        <td>10,000</td>
      </tr>
      <tr>
        <th>출금계좌구분</th>
        <td>VA1</td>
        <th>출금계좌번호</th>
        <td>1234567789</td>
      </tr>
      <tr>
        <th>모계좌번호</th>
        <td>1234567789</td>
        <th>경유계좌번호</th>
        <td>1234567789</td>
      </tr>
      <tr>
        <th>입금은행코드</th>
        <td>신한은행</td>
        <th>입금계좌번호</th>
        <td>1234567789</td>
      </tr>
      <tr>
        <th>입금예금주명</th>
        <td>홍길동</td>
        <th>입금통장메모</th>
        <td>TEST 입니다.</td>
      </tr>
      <tr>
        <th>이전_출금예정금액</th>
        <td>10,000</td>
        <th>이전_계좌잔액</th>
        <td>10,000</td>
      </tr>
      <tr>
        <th>출금계좌잔액비율</th>
        <td colspan="3">10%</td>
      </tr>
      <tr>
        <th>이체실행기관ID</th>
        <td>HOMG11</td>
        <th>이체실행자ID </th>
        <td>HJKL1</td>
      </tr>
      <tr>
        <th>전문일련번호</th>
        <td colspan="3">1234567</td>
      </tr>
      <tr>
        <th>이체 일자</th>
        <td>2023-10-10</td>
        <th>이체 시간</th>
        <td>12:12:12</td>
      </tr>
      <tr>
        <th>이체결과코드</th>
        <td>123456</td>
        <th>이체 결과메시지</th>
        <td>TEST 입니다.</td>
      </tr>
      <tr>
        <th>등록자ID</th>
        <td>HJKL1</td>
        <th>등록일시</th>
        <td>2023-10-10</td>
      </tr>
      <tr>
        <th>변경자ID</th>
        <td>HJKL1</td>
        <th>변경일시</th>
        <td>2023-10-10</td>
      </tr>
    </tbody>
  </v-table>

  <div class="btm_btn_wrap">
    <v-btn class="vbtn" size="small">목록</v-btn>
  </div>

</template>

<style scoped>
</style>

<script setup >



</script> 