import { menuStore } from "@/store/menuStore";
import { userInfoStore } from "@/store/userInfoStore";
import { useDialogStore } from "@/store/dialogStore";
const noLayout = ["/"]; //비어있는 레이아웃 페이지

import { loginApi } from "@/api/index";

// HelthChk 유저 정보 확인
const callHealthChkApi = async () => {
  await loginApi
    .LOG0101S02()
    .then((response) => {
      const isLogin = response?.result;
      if (isLogin) {
        const member = response?.data;
        userInfoStore().setUserData(member); //스토어에 셋팅하기
      } else {
        userInfoStore().logout();
      }
    })
    .catch((e) => {});
};

export default defineNuxtRouteMiddleware(async (to, from) => {
  //현재 페이지 셋팅
  if (to?.query?.z) {
    menuStore().setCurrentPage(to.query.z);
  } else {
    menuStore().setCurrentPage("AHOM001");
  }
  // 로그인 시간 체크 후 없으면 발생시키는 로직 적용
  const dialogStore = useDialogStore();
  if (!dialogStore.isInterval()) {
    const inervalNumber = setInterval(() => {
      $fx.checkLoginTime();
    }, 10000);
    dialogStore.setInterval(inervalNumber);
  }
  //Health check >>>> 새로고침시...(sessionKey가 로컬 스토리지에 존재하는 경우 헬스체크..)
  if (!$fx.isLogin() && $fx.getLocalStorageItem("sessionKey")) {
    await callHealthChkApi();
  } else if (
    $fx.isLogin() &&
    userInfoStore().sessionKey !== $fx.getLocalStorageItem("sessionKey")
  ) {
    console.log(userInfoStore().sessionKey + "::::");
    console.log($fx.getLocalStorageItem("sessionKey"));
    console.log(
      userInfoStore().sessionKey !== $fx.getLocalStorageItem("sessionKey")
    );
    //세션키가 서로 다를 경우
    await callHealthChkApi();
  }

  /** 현재 페이지 가져와서 체크 */
  const currentPage = menuStore().currentPage; //다음 페이지 정보

  // if (!$fx.isLogin() && to.path === '/' ) {
  //   return navigateTo('/LOG/LOG001M00')
  // }else{
  //로그인 허용 페이지 체크 후 이동
  if ($fx.isLogin()) {
    //로그인 상태이지만 각 기관 접근 가능 페이지인지 확인해야함
    let findMenuList = menuStore().mappingMenuList;
    const finePage = $utils.findMenu(findMenuList, to.path);
    if (!finePage) {
      //페이지가 없는 경우 홈으로 이동
      const url = $fx.homePathPage()?.menuCode;

      return navigateTo("/idx?z=" + url);
    }
  } else if (to?.query?.z?.indexOf("AHOM001") === -1) {
    userInfoStore().setReDirectUrl(currentPage.menuCode);
    return navigateTo("/idx?z=AHOM001");
  }
  // }

  /*****           페이지 레이아웃 노출 여부  *************/
  //네이게이션 제거
  if (currentPage.menuDepth === "0") {
    //루트 페이지는 네비게이터 없음
    menuStore().setIsNavigator(false);
  } else {
    menuStore().setIsNavigator(true);
  }

  //푸터 허용
  if (currentPage.menuDepth !== "0") {
    menuStore().setIsFooter(true);
  } else {
    menuStore().setIsFooter(false);
  }

  //레이아웃 제거
  if (to.query?.z?.indexOf("AHOM001") > -1) {
    menuStore().setIsShowLayout(false);
  } else {
    menuStore().setIsShowLayout(true);
  }

  //접근 허용 페이지 체크

  //menuStore().setAllDisabled() //레이아웃 전체 비활성화
  // const store = userInfoStore()
  // if (process.client) {
  //   if (!store.getSessionKey()) {
  //     //로그인 페이지 띄우기
  //     return false
  //   }
  // }
  // if (to.params.id === '1') {
  //   return abortNavigation()
  // }
  // if (to.path !== '/') {
  //   return navigateTo('/')
  // }
});
