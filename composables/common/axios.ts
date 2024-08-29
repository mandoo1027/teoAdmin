import axios from "axios";
export const useAxios = () => {
  const config = useRuntimeConfig();
  const clientOS = determineClientOS();
  let pathList = window.location.pathname.split("/");

  const getQueryParam = (key: string) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(key);
  };
  const screenId = getQueryParam("z") ?? "MAIN";

  // let maxLength = pathList.length
  // let screenId
  // if (pathList[maxLength - 1]) {
  //   screenId = pathList[maxLength - 1]
  // } else {
  //   screenId = pathList[maxLength - 2]
  // }
  // screenId = screenId ? screenId : '/'
  const defaultData = {
    REQ_COM: {
      screenId,
      langCd: "ko",
      clientAgent: navigator.userAgent,
      clientOS,
      areaCd: "03",
    },
  };
  const instance = axios.create({
    baseURL: config.public.apiBase + "/admin/service",
    timeout: 60000,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  instance.interceptors.request.use(
    function (config) {
      const serviceId = config.url;
      defaultData.REQ_COM.serviceId = serviceId;
      Object.assign(defaultData, config.data);
      config.data = defaultData;
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      $fx.saveLoginTime();
      return response && response.data;
    },
    async (err) => {
      const resErr = err.response?.data?.isFail;

      if (resErr) {
        $fx.finishLoadingbar();
        await $fx.throwAlert(`${resErr.errorMsg}[${resErr.errorCode}]`, "경고");
        if (resErr.errorCode === "ECM4007") {
          $fx.logout("MLOG001");
        } else if (resErr.errorCode === "COM0004") {
          //키보드 보안 세션 없을때 새로고침
          location.reload();
        }
        console.log(`[${resErr.errorCode}]${resErr.errorAddMsg}`);
        return Promise.reject(resErr);
      }
    }
  );
  // 파일업로드용
  const uploadInstance = axios.create({
    baseURL: config.public.apiBase + "/admin/ext",
    // timeout: 6000,
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });

  // pdf파일뷰어용
  const pdfViewInstance = axios.create({
    baseURL: config.public.apiBase + "/admin/ext",
    // timeout: 6000,
    withCredentials: true,
    responseType: "arraybuffer",
  });

  // image파일뷰어용
  const imageViewInstance = axios.create({
    baseURL: config.public.apiBase + "/admin/ext",
    // timeout: 6000,
    responseType: "blob",
  });

  // 다운로드용
  const fileDownloadInstance = axios.create({
    baseURL: config.public.apiBase + "/admin/ext",
    // timeout: 6000,
    withCredentials: true,
    responseType: "blob",
    headers: { Accept: "application/octet-stream" },
  });
  function determineClientOS() {
    if (/android/i.test(navigator.userAgent)) {
      return "Android";
    }

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return "iOS";
    }

    return "Web";
  }
  return {
    instance,
    uploadInstance,
    pdfViewInstance,
    fileDownloadInstance,
    imageViewInstance,
  };
};
