// 가상계좌 목록
type COV1001S01Params = {
  ordrInstId: string // 발주기관ID
  accNum: string // 가상 계좌번호
}

// 가상계좌 현황조회 파라미터
type COV1001S02Params = {
  vraStatParam: string // 가상계좌 사용여부 옵션 (all: 전체, use: 사용, unused: 미사용)
  vraParam: string // 계좌번호 옵션 (vra: 가상계좌번호, part: 모 계좌번호)
  accNum: string // 계좌번호
}

// 기관ID로 사업자번호 조회 파라미터
type COV1001S03Params = {
  instId: string // 기관ID
}

// 가상계좌 등록
type COV1001I01Params = {
  varNoList: string[] //가상계좌번호
  partVraNo: string // 모계좌번호
  ordrInstId: string // 발주기관ID
  asgnDt: string // TASK 할당일시
  cnclDt: string // TASK해지일시
  userId: string // 등록자 ID
}

// 가상계좌 삭제
type COV1002D01Params = [
  {
    rowStatus: string // 상태값
    vaccNum: string // 계좌번호
  },
]

// 가상계좌 목록
type COV2001S01Params = {
  instId: string // 발주기관 코드
  vraNoGubun: string // 계좌구분  A:모계좌번호 B:집금계좌번호
}

export const covApi = {
  /**
   * 가상계좌 목록
   */
  COV1001S01(params: COV1001S01Params) {
    return $fx.axios().post('COV1001S01', params)
  },
  /**
   * 가상계좌 현황 조회
   */
  COV1001S02(params: COV1001S02Params) {
    return $fx.axios().post('COV1001S02', params)
  },
  /**
   * 기관ID로 사업자 번호 조회
   */
  COV1001S03(params: COV1001S03Params) {
    return $fx.axios().post('COV1001S03', params)
  },
  /**
   * 가상계좌 등록
   */
  COV1001I01(params: COV1001I01Params) {
    return $fx.axios().post('COV1001I01', params)
  },
  /**
   * 가상계좌 삭제
   */
  COV1002D01(params: COV1002D01Params) {
    return $fx.axios().post('COV1002D01', params)
  },
  /**
   * 발주기관 계좌잔액조회
   */
  COV2001S01(params: COV2001S01Params) {
    return $fx.axios().post('COV2001S01', params)
  },
}
