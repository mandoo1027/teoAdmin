<template>

  <div class="mt_30 mb_30">
    <nuxt-link to="../pub/publist_admin">관리자 퍼블 목록</nuxt-link>
  </div>

  <v-card class="mt-5" outlined>
    <v-card-title>라디오버튼</v-card-title>
    <v-card-text>
      <v-card class="mt-5" outlined>
        <ComRadioButton :options="radioOptions" v-model="selectedValue" :isInline="true" />
      </v-card>
      <v-card class="mt-5" outlined>
        <ComRadioButton :options="radioOptions" v-model="selectedValue" />
      </v-card>
      <p>Selected: {{ selectedValue }}</p>
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
    <v-card-title>콤보박스</v-card-title>
    <v-card-text>
      <ComSelectBox groupCode="01" v-model="comboSelected" :items="items" class="s_basics" />
      <ComSelectBox groupCode="01" v-model="comboSelected" :items="items" :isDefault="false" class="s_basics" />
      <ComSelectBox groupCode="01" v-model="comboSelected" :items="items" disabled class="s_basics" />
    </v-card-text>
  </v-card>
  
  <div class="v-overlay-container" v-if="false">
    <div class="v-overlay v-overlay--absolute v-theme--light v-locale--is-ltr v-menu" style="z-index: 2000;">
        <!---->
        <div class="v-overlay__content v-select__content" style="max-height: 310px; max-width: 1054px; min-width: 908px; --v-overlay-anchor-origin: bottom left; transform-origin: left top; top: 203px; left: 135px; pointer-events: none;">
            <div class="v-list v-theme--light v-list--density-default v-list--one-line" tabindex="-1" role="listbox">
                <!---->
                <!---->
                <div class="v-virtual-scroll__spacer" style="padding-top: 0px;"></div>
                <div class="v-list-item v-list-item--link v-theme--light v-list-item--density-default v-list-item--one-line v-list-item--variant-text" tabindex="-2"><span class="v-list-item__overlay"></span><span class="v-list-item__underlay"></span>
                    <div class="v-list-item__prepend">
                        <!---->
                        <!---->
                        <div class="v-list-item__spacer"></div>
                    </div>
                    <div class="v-list-item__content" data-no-activator="">
                        <div class="v-list-item-title">선택하세요</div>
                        <!---->
                        <!---->
                    </div>
                    <!---->
                </div>
                <div class="v-list-item v-list-item--active v-list-item--link v-theme--light v-list-item--density-default v-list-item--one-line v-list-item--variant-text" tabindex="-2"><span class="v-list-item__overlay"></span><span class="v-list-item__underlay"></span>
                    <div class="v-list-item__prepend">
                        <!---->
                        <!---->
                        <div class="v-list-item__spacer"></div>
                    </div>
                    <div class="v-list-item__content" data-no-activator="">
                        <div class="v-list-item-title">감자</div>
                        <!---->
                        <!---->
                    </div>
                    <!---->
                </div>
                <div class="v-list-item v-list-item--link v-theme--light v-list-item--density-default v-list-item--one-line v-list-item--variant-text" tabindex="-2"><span class="v-list-item__overlay"></span><span class="v-list-item__underlay"></span>
                    <div class="v-list-item__prepend">
                        <!---->
                        <!---->
                        <div class="v-list-item__spacer"></div>
                    </div>
                    <div class="v-list-item__content" data-no-activator="">
                        <div class="v-list-item-title">양파</div>
                        <!---->
                        <!---->
                    </div>
                    <!---->
                </div>
                <div class="v-list-item v-list-item--link v-theme--light v-list-item--density-default v-list-item--one-line v-list-item--variant-text" tabindex="-2"><span class="v-list-item__overlay"></span><span class="v-list-item__underlay"></span>
                    <div class="v-list-item__prepend">
                        <!---->
                        <!---->
                        <div class="v-list-item__spacer"></div>
                    </div>
                    <div class="v-list-item__content" data-no-activator="">
                        <div class="v-list-item-title">고구마</div>
                        <!---->
                        <!---->
                    </div>
                    <!---->
                </div>
                <div class="v-virtual-scroll__spacer" style="padding-bottom: 0px;"></div>
                <!---->
            </div>
        </div>
    </div>
</div>

  <v-card class="mt-5" outlined>
    <v-card-title>input</v-card-title>
    <v-card-text>
      <div class="d-flex">      
        <v-text-field label="Your Name" v-model="name" :rules="nameRules" required placeholder="Placeholder" class="i_basics"></v-text-field>
        &nbsp;&nbsp;&nbsp;
        <v-text-field label="Your Name" v-model="name" focused placeholder="Placeholder" class="i_basics"></v-text-field>
        &nbsp;&nbsp;&nbsp;
        <v-text-field label="Your Name" v-model="name" :rules="nameRules" error placeholder="Placeholder" class="i_basics"></v-text-field>
        &nbsp;&nbsp;&nbsp;
        <v-text-field label="Your Name" v-model="name" success placeholder="Placeholder" class="i_basics"></v-text-field>
        &nbsp;&nbsp;&nbsp;
        <v-text-field label="Your Name" v-model="name" disabled placeholder="Placeholder" class="i_basics"></v-text-field>
      </div>
    </v-card-text>
  </v-card>
  
  <v-card class="mt-5" outlined>
    <v-card-title>FONT</v-card-title>
    <v-card-text>
      <p style="font-size:48px;font-weight:400;">Pretendard Regular</p>
      <p style="font-size:48px;font-weight:500;">Pretendard Medium</p>
      <p style="font-size:48px;font-weight:600;">Pretendard SemiBold</p>
      <p style="font-size:48px;font-weight:700;">Pretendard Bold</p>

      <p style="font-size:36px;font-weight:700;">헤더타이틀</p>
      <p style="font-size:18px;font-weight:700;">동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세.</p>
    </v-card-text>
  </v-card>

  <v-card class="mt-5" outlined>
    <v-card-title>Large(H56)</v-card-title>
    <v-card-text>
      <div class="d-flex">
        <v-btn class="vbtn" size="large">버튼</v-btn>
        &nbsp;&nbsp;&nbsp;
        <v-btn class="vbtn" size="large" disabled>버튼</v-btn>
      </div>
      <div class="d-flex mt_10">
        <v-btn class="vbtn blue" size="large">버튼</v-btn>
        &nbsp;&nbsp;&nbsp;
        <v-btn class="vbtn blue" size="large" disabled>버튼</v-btn>
      </div>
      <div class="d-flex mt_10">
        <v-btn class="vbtn line" size="large">버튼</v-btn>
        &nbsp;&nbsp;&nbsp;
        <v-btn class="vbtn line" size="large" disabled>버튼</v-btn>
      </div>
    </v-card-text>

    <v-card-title>Medium(H48)</v-card-title>
    <v-card-text>
      <div class="d-flex">
        <v-btn class="vbtn">버튼</v-btn>
        &nbsp;&nbsp;&nbsp;
        <v-btn class="vbtn" disabled>버튼</v-btn>
      </div>
      <div class="d-flex mt_10">
        <v-btn class="vbtn blue">버튼</v-btn>
        &nbsp;&nbsp;&nbsp;
        <v-btn class="vbtn blue" disabled>버튼</v-btn>
      </div>
      <div class="d-flex mt_10">
        <v-btn class="vbtn line">버튼</v-btn>
        &nbsp;&nbsp;&nbsp;
        <v-btn class="vbtn line" disabled>버튼</v-btn>
      </div>
    </v-card-text>

    <v-card-title>Small(H40)</v-card-title>
    <v-card-text>
      <div class="d-flex">
        <v-btn class="vbtn" size="small">버튼</v-btn>
        &nbsp;&nbsp;&nbsp;
        <v-btn class="vbtn" size="small" disabled>버튼</v-btn>
      </div>
      <div class="d-flex mt_10">
        <v-btn class="vbtn blue" size="small">버튼</v-btn>
        &nbsp;&nbsp;&nbsp;
        <v-btn class="vbtn blue" size="small" disabled>버튼</v-btn>
      </div>
      <div class="d-flex mt_10">
        <v-btn class="vbtn line" size="small">버튼</v-btn>
        &nbsp;&nbsp;&nbsp;
        <v-btn class="vbtn line" size="small" disabled>버튼</v-btn>
      </div>
      <div class="d-flex mt_10">
        <v-btn class="vbtn line search" size="small">검색</v-btn>
      </div>
    </v-card-text>

    <v-card-title>Text Button</v-card-title>
    <v-card-text>
      <div class="d-flex">
        <nuxt-link to="/sample/Template" class="vlink">Text Button</nuxt-link>
        &nbsp;&nbsp;&nbsp;
        <nuxt-link to="/sample/Template" class="vlink blue">Text Button</nuxt-link>
        &nbsp;&nbsp;&nbsp;
        <nuxt-link to="/sample/Template" class="vlink blue line">Text Button</nuxt-link>
      </div>
    </v-card-text>
  </v-card>


</template>

<style scoped>
  hr{margin:20px 0;}
  .v-card{padding:15px;}
  .v-card .v-card-title{padding:0 15px 0 0;}
  .v-card .v-card-text{padding:10px 0 20px;line-height:1;}
</style>

<script setup >

import ComSelectBox from '@/components/common/ComSelectBox.vue'
import ComRadioButton from '@/components/common/ComRadioButton.vue'

///////////////// 라디오 버튼용 /////////////////
const selectedValue = ref(null)

const radioOptions = [
  { label: 'label 1', value: 'value1' },
  { label: 'label 2', value: 'value2' },
  { label: 'label 3', value: 'value3' },
]

/* 체크박스 */
const checkbox1 = ref(true)
const checkbox2 = ref(false)

/* 콤보 박스 */
const comboSelected = ref('')

const items = ref([
  { title: '감자', value: '001' },
  { title: '양파', value: '002' },
  { title: '고구마', value: '003' },
])

const name = ref('')

const nameRules = [
  (v) => !!v || '다시 입력해주세요.',
  (v) => (v && v.length >= 3) || 'Name must be at least 3 characters',
]

</script> 