<template>
  <v-card class="mt-5" outlined style="height: 400px">
    <v-card-title>날짜</v-card-title>
    <CommonComDatePicker v-model="startDate" @changeValue="changeValue" />
    <v-card-text>{{ startDate }} </v-card-text>
  </v-card>
  <CommonComResize />

  <v-card class="mt-5" outlined>
    <v-card-title>Swiper</v-card-title>
    <v-card-text>
      <label>
        링크
        <p>스와이퍼는 그냥 참고용.. 컴포넌트로 빼기가 애매함</p>
        <a class="link" @click="openPage">https://swiperjs.com/swiper-api#navigation</a>
      </label>
      <CommonComSwiper />
    </v-card-text>
  </v-card>

  <v-card class="mt-5" outlined>
    <v-card-title>콤보박스</v-card-title>
    <v-card-text>
      <CommonComSelectBox groupCode="01" v-model="comboSelected" :items="items" />
      <CommonComSelectBox
        groupCode="01"
        v-model="comboSelected"
        :items="items"
        :isDefault="false"
      />
      <v-btn class="bg-primary" @click="checkData()"> 콤보박스 값 확인</v-btn>
    </v-card-text>
  </v-card>

  <v-card class="mt-5" outlined>
    <v-card-title>로딩바 테스트</v-card-title>

    <v-btn class="bg-primary" @click="startLoadingbar()"> 로딩바 테스트 </v-btn>
  </v-card>

  <v-card class="mt-5" outlined>
    <v-card-title>라디오버튼</v-card-title>
    <v-card-text>
      <v-card class="mt-5" outlined>
        <CommonComRadioButton :options="radioOptions" v-model="selectedValue" :isInline="true" />
      </v-card>
      <v-card class="mt-5" outlined>
        <CommonComRadioButton :options="radioOptions" v-model="selectedValue" />
      </v-card>
      <p>Selected: {{ selectedValue }}</p>
    </v-card-text>
  </v-card>

  <v-card class="mt-5" outlined style="height: 700px; overflow: visible">
    <v-card-title>Date Pick</v-card-title>
    <v-card-text>
      <CommonComDatePicker />
    </v-card-text>
  </v-card>

  <v-card class="mt-5" outlined>
    <v-card-title>체크박스</v-card-title>
    <v-card-text>
      <v-checkbox v-model="checkbox1" :label="`체크체크체크: ${checkbox1.toString()}`" />
      <v-checkbox v-model="checkbox2" :label="`체크체크체크: ${checkbox2.toString()}`" />
    </v-card-text>
  </v-card>

  <v-card class="mt-5" outlined>
    <v-card-title>탭</v-card-title>
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="one">Item One</v-tab>
      <v-tab value="two">Item Two</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one"> One </v-window-item>

        <v-window-item value="two"> Two </v-window-item>

        <v-window-item value="three"> Three </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
  <v-card class="mt-5" outlined>
    <v-card-title>아코디언</v-card-title>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel
        v-for="i in 3"
        :key="i"
        title="Item"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      ></v-expansion-panel>
    </v-expansion-panels>
  </v-card>

  <v-card class="mt-5" outlined>
    <v-card-title>이미지</v-card-title>
    <CommonComImage src="https://picsum.photos/500/300?image=15" />
  </v-card>

  <v-card class="mt-5" outlined>
    <v-card-title>팝업</v-card-title>

    <div>
      <span @click="popup">팝업컴포넌트</span>
    </div>
    <div>
      <span @click="alert">알럿테스트</span>
    </div>
    <div>
      <span @click="confirm(1)">컨펌테스트1</span>
    </div>
    <div>
      <span @click="confirm(2)">컨펌테스트2</span>
    </div>
  </v-card>
</template>

<script setup>
const today = new Date() // 현재 날짜와 시간을 포함하는 Date 객체 생성
const year = today.getFullYear() // 년도 가져오기
const month = today.getMonth() + 1 // 월 가져오기 (0부터 시작하므로 1 더하기)
const day = today.getDate() // 일 가져오기
const formattedToday = new Date(
  `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
)
const startDate = ref('20201212')
watch(startDate, () => {
  console.log(startDate)
})
const openPage = () => {
  window.open('https://swiperjs.com/swiper-api#navigation')
}
const changeValue = (e) => {
  console.log(e)
}
const popup = () => {
  $fx
    .throwDialog('CommonComSwiper', { data: {}, close: true, closeLabel: '확인' })
    .then((result) => {
      if (result) {
        console.log('throwDialog result', result)
      }
    })
}
const alert = () => {
  $fx.throwAlert('알럿테스트 입니다.').then((result) => {
    console.log('result', result)
  })
}

const confirm = (num) => {
  if (num === 1) {
    $fx.throwConfirm('Confirm 입니다.').then((result) => {
      console.log('result', result)
    })
  } else {
    $fx
      .throwConfirm('Confirm2 입니다.', '타이틀입니다', {
        confirmLabel: '확인입니다.',
        closeLabel: '취소입니다.',
      })
      .then((result) => {
        console.log('result', result)
      })
  }
}

/* 콤보 박스 */
const comboSelected = ref('')

const checkData = () => {
  console.log(comboSelected.value)
}

const items = ref([
  { title: '감자', value: '001' },
  { title: '양파', value: '002' },
  { title: '고구마', value: '003' },
])

///////////////// 라디오 버튼용 /////////////////
const selectedValue = ref(null)

const radioOptions = [
  { label: 'label 1', value: 'value1' },
  { label: 'label 2', value: 'value2' },
  { label: 'label 3', value: 'value3' },
]
///////////////////////////////////////////////
/* 체크박스 */
const checkbox1 = ref(true)
const checkbox2 = ref(false)
///////////////////////////
/* 탭  */

/*로딩바*/
const startLoadingbar = () => {
  $fx.startLoadingbar()
  setTimeout(() => {
    $fx.finishLoadingbar()
  }, 1000)
}
const tab = ref('')
</script>

<style scoped>
.link {
  text-decoration: underline;
  cursor: pointer;
  font-size: 20px;
  color: #3498db;
}
</style>
