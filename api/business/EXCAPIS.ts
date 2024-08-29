// 입금취소 요청목록 조회
type EXC0202S01Params = {
  inqStrtDate: string // 조회시작일
  inqEndDate: string // 조회종료일
}
// 정부 사업비 입금취소 승인
type EXC0202U01Params = {
  implMngNo: string			// 집행관리번호 
  bizNo: string				// 사업번호
  taskNo: string			// TASK번호
  ordrInstId: string		// 발주기관ID
  ordrInstNm: string		// 발주기관명
  ofldcRcptnDate: string	// 공문수신일자
  ofldcRcptnCtn: string		// 공문수신내용
}

export const excApi = {
  /**
   * 입금취소 요청목록 조회
   * @param CER0101S01Params
   */
  EXC0202S01(params: EXC0202S01Params) {
    return $fx.axios().post('EXC0202S01', params)
  },
  /**
   * 정부 사업비 입금취소 승인
   * @param EXC0202U01Params
   */
  EXC0202U01(params: EXC0202U01Params) {
    return $fx.axios().post('EXC0202U01', params)
  },
}
