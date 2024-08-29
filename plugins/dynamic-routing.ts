import component from "*.vue";
import { commonApi } from "@/api/index";
import { menuStore } from "@/store/menuStore";
import _ from "lodash";

export default defineNuxtPlugin(async (nuxtApp) => {
  const response = await commonApi.searchMenuList({ sysDivCd: "", type: "" });
  let mappingMenuList = []; //메뉴 전체 목록
  if (response?.result) {
    const mappingAll = response?.data?.adm[0].children;
    mappingMenuList = response?.data?.admMappingList;
    menuStore().setMenuListAll(mappingAll); //스토어에 셋팅하기
    menuStore().setMappingMenuList(mappingMenuList); //스토어에 셋팅하기
  }
  const routeList = nuxtApp.vueApp.config.globalProperties.$router.getRoutes();
  mappingMenuList.forEach((routeData) => {
    const existingRoute = routeList.find(
      (route) => route.path === routeData.filePath
    );
    console.log(routeData);
    console.log(existingRoute);
    if (existingRoute) {
      let copyRoute = _.cloneDeep(existingRoute);
      copyRoute.name = routeData.menuCode;
      copyRoute.path = `/${routeData.menuCode}`;
      nuxtApp.vueApp.config.globalProperties.$router.addRoute(copyRoute);
    }
    
    // 기존라우트 제거
    // if (existingRoute) {
    //   nuxtApp.vueApp.config.globalProperties.$router.removeRoute(existingRoute.name)
    // }
  });
  nuxtApp.vueApp.config.globalProperties.$router.addRoute({
    name: "AHOM001",
    path: "/AHOM001",
    component: import("@/pages/MAIN/index.vue"),
  });
});
