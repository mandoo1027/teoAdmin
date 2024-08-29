<template>
  <div class="pub_bg">
    <div class="pub_top">
      <h2></h2>
      <div>
        <b>총(화면/완료)</b>
        <strong class="cnt_ok">{{ cntValue }}/{{ develCnt }}</strong>
        <b>완료</b>
      </div>
    </div>

    <ul class="pub_list">
      <li>
        <span>메뉴 1 Depth</span>
        <span>메뉴 2 Depth</span>
        <span>메뉴 3 Depth</span>
        <span>메뉴코드</span>
        <span>화면경로</span>
        <span>화면명</span>
        <span>개발담당자</span>
        <span>완료</span>
        <span>메뉴설명</span>
        <span>기타</span>
      </li>
      <template v-for="(menu, index) in menuList" v-bind:key="index">
        <li>
          <span>{{ menu.menuDepth === '0' ? menu.menuName : '' }}</span>
          <span>{{ menu.menuDepth === '1' ? menu.menuName : '' }}</span>
          <span>{{ menu.menuDepth === '2' ? menu.menuName : '' }}</span>
          <span>{{ menu.menuCode }}</span>
          <span>
            <a class="blue line" @click="movePage(menu.filePath)">
              {{ menu.filePath }}
            </a>
          </span>
          <span>{{ menu.menuName }}</span>
          <span>{{ menu.developer }}</span>
          <span class="ok">{{ menu.isDone }}</span>

          <span>{{ menu?.scrCtn }}</span>
          <span class="etc">{{ menu.etc }}</span>
        </li>
        <template v-for="(menuSub, index) in menu.children" v-bind:key="index">
          <li>
            <span>{{ menuSub.menuDepth === '0' ? menuSub.menuName : '' }}</span>
            <span>{{ menuSub.menuDepth === '1' ? menuSub.menuName : '' }}</span>
            <span>{{ menuSub.menuDepth === '2' ? menuSub.menuName : '' }}</span>
            <span>{{ menuSub.menuCode }}</span>
            <span>
              <a class="blue line" @click="movePage(menuSub.filePath)">
                {{ menuSub.filePath }}
              </a>
            </span>
            <span>{{ menuSub.menuName }}</span>
            <span>{{ menuSub.developer }}</span>
            <span class="ok">{{ menuSub.isDone }}</span>

            <span>{{ menuSub?.scrCtn }}</span>
            <span class="etc">{{ menuSub.etc }}</span>
          </li>
          <template v-for="(menuSubPage, index) in menuSub.children" v-bind:key="index">
            <li>
              <span>{{ menuSubPage.menuDepth === '0' ? menuSubPage.menuName : '' }}</span>
              <span>{{ menuSubPage.menuDepth === '1' ? menuSubPage.menuName : '' }}</span>
              <span>{{ menuSubPage.menuDepth === '2' ? menuSubPage.menuName : '' }}</span>
              <span>{{ menuSubPage.menuCode }}</span>
              <span>
                <a class="blue line" @click="movePage(menuSubPage.filePath)">
                  {{ menuSubPage.filePath }}
                </a>
              </span>
              <span>{{ menuSubPage.menuName }}</span>
              <span>{{ menuSubPage.developer }}</span>
              <span class="ok">{{ menuSubPage.isDone }}</span>
              <span>{{ menuSubPage?.scrCtn }}</span>
              <span class="etc">{{ menuSubPage.etc }}</span>
            </li>
          </template>
        </template>
      </template>
    </ul>
  </div>
</template>


<script setup>
import { menuStore } from '@/store/menuStore'
import { commonApi } from '@/api/index'
const menuList = ref([]) //메뉴 리스트
const cntValue = ref(0)
const develCnt = ref(0) //개발화면 개수
const doneFileList = [
  { menuCode: 'AADM008', developer: '김경일', etc: '그리드 참조' }, //공통코드관리
  {
    menuCode: 'AMEN001',
    developer: '김경일',
    etc: '그리드 참조(전체 선택(체크박스)), 날짜 컴포넌트, ',
  }, //메뉴관리
]
onMounted(() => {
  $fx.setNavigator('화면 개발 목록')
  callMenuApi()
})
const movePage = (url) => {
  $fx.move(url)
}

const setPage = (page) => {
  let findPage = doneFileList.find((doneFile) => doneFile.menuCode === page.menuCode)
  if (page.filePath) {
    page.isDone = findPage ? true : '' //완료여부
    cntValue.value = cntValue.value + 1
  }
  if (page.isDone) {
    develCnt.value = develCnt.value + 1
  }

  page.etc = findPage ? findPage.etc : '' //비고
  page.developer = findPage ? findPage.developer : '' //개발담당자
}

const callMenuApi = async () => {
  await commonApi.searchMenuList({ sysDivCd: '', type: '' }).then((response) => {
    if (response?.result) {
      const mappingMenuList = response?.adm
      menuList.value = mappingMenuList
      //menuList.value = mappingMenuList.filter((item) => item.menuCode === 'MHOM000')
      menuList.value.map((item) => {
        if (item.children) {
          item.children.map((subMenu) => {
            if (subMenu.children) {
              subMenu.children.map((page) => {
                setPage(page)
              })
            }
            setPage(subMenu)
          })
        }
        setPage(item)
      })

      let addDataList = [
        {
          menuDepth: '0',
          menuName: '퍼블 완료 목록',
          menuPath: '/pub/publist_admin/',
          menuCode: '/pub/publist_admin/',
          developer: '정예진',
          etc: '퍼블 화면 참고',
        },
        {
          menuDepth: '0',
          menuName: '샘플 컴포넌트',
          filePath: '/sample/Sample',
          menuCode: '/sample/Sample',
          developer: '김경일,김찬우',
          etc: '각종 컴포넌트 참고해주세요',
        },
      ]
      menuList.value.unshift(...addDataList)
    }
  })
}
</script> 


<style scoped>
h2 {
  margin: 20px 0 10px;
}

.pub_bg {
  padding: 10px;
  background: #fff;
  border-radius: 10px;
}
.pub_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
}
.pub_top b {
  margin: 0 10px;
}
.pub_top strong {
  color: #fc0000;
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
.blue {
  color: #40178b;
}
.ok {
  color: #3153e9;
}
</style>