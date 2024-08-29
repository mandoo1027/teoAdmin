type SearchDayBParams = {
  stdt: string
  pageNum: string
  pageSize: string
}

type SearchParams = {
  id: string
  ip: string
  pageNum: string
  pageSize: string
}

type saveParams = {
  id: string
  pwd: string
  pwdOk: string
  name: string
  idno: string
  ip: string
  moblTelno1: string
  moblTelno2: string
  moblTelno3: string
  email: string
  useStatCd: string
  useStrtDate: string
  useEndDate: string
  menuAuth: string
  deptCd: string
  deptNm: string
  memo: string
  otpSkey: string
  hidKeyData:string
  hidEncData:string
}

export const hcoApi = {
  /**
   * 일배치현황 조회
   * @param SearchDayBParams : Obejct
   */
  HCO0508S01(params: SearchParams) {
    return $fx.axios().post('HCO0508S01', params)
  },

  /**
   * 관리자 계정관리 조회
   * @param SearchParams : Obejct
   */
  HCO0603S01(params: SearchParams) {
    return $fx.axios().post('HCO0603S01', params)
  },
  /**
   * 관리자 계정관리 상세조회
   * @param SearchParams : Obejct
   */
  HCO0603S02(params: SearchParams) {
    return $fx.axios().post('HCO0603S02', params)
  },
  /**
   * 관리자 계정관리  아이디 중복 체크
   * @param SearchParams : Obejct
   */
  HCO0603S03(params: SearchParams) {
    return $fx.axios().post('HCO0603S03', params)
  },
  /**
   * 관리자 계정관리  IP체크
   * @param SearchParams : Obejct
   */
  HCO0604S02(params: SearchParams) {
    return $fx.axios().post('HCO0604S02', params)
  },
  /**
   * 관리자 계정관리 등록
   * @param saveParams : Obejct
   */
  HCO0603I01(params: saveParams) {
    return $fx.axios().post('HCO0603I01', params)
  },
  /**
   * 관리자 계정관리 수정
   * @param saveParams : Obejct
   */
  HCO0603U01(params: saveParams) {
    return $fx.axios().post('HCO0603U01', params)
  },
  /**
   * 관리자 계정관리 삭제
   * @param SearchParams : Obejct
   */
  HCO0603D01(params: SearchParams) {
    return $fx.axios().post('HCO0603D01', params)
  },
}
