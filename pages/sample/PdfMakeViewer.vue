<template>
  <PdfMakeLayout pdfFileName="샘플페이지" pdfType="01">
    <h2>배송일지</h2>

    <table>
      <thead>
        <tr>
          <th>배송번호</th>
          <th>상품명</th>
          <th>수량</th>
          <th>받는사람</th>
          <th>배송주소</th>
          <th>배송상태</th>
          <th>배송일</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>001</td>
          <td>제품A</td>
          <td>2</td>
          <td>홍길동</td>
          <td>서울시 강남구</td>
          <td>배송중</td>
          <td>2023-09-01</td>
        </tr>
        <tr>
          <td>002</td>
          <td>제품B</td>
          <td>1</td>
          <td>이순신</td>
          <td>부산시 해운대구</td>
          <td>배송완료</td>
          <td>2023-09-02</td>
        </tr>
        <!-- 추가적인 행들을 이곳에 넣을 수 있습니다. -->
      </tbody>
    </table>
  </PdfMakeLayout>
</template>
<script setup>
import PdfMakeLayout from '@/components/common/pdf/PdfMakeLayout.vue'
</script> 
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
table,
th,
td {
  border: 1px solid black;
}
th,
td {
  padding: 8px 12px;
}
th {
  background-color: #f2f2f2;
}
</style>