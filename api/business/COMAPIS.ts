// 인증번호 요청
type CER0101S01Params = {}
// 인증번호 요청
type CER0101S02Params = {}
// 결재자 목록 조회
type COM0201S01Params = {}
// 승인요청번호 결재정보 조회
type COM0201S02Params = {
  aprvReqNo: string // 승인요청번호
}
export const comApi = {
  /**
   * (휴대폰,이메일)인증번호 요청
   * @param CER0101S01Params
   */
  CER0101S01(params: CER0101S01Params) {
    return $fx.axios().post('CER0101S01', params)
  },
  /**
   * (휴대폰,이메일)인증번호 확인
   * @param CER0101S01Params
   */
  CER0101S02(params: CER0101S02Params) {
    return $fx.axios().post('CER0101S02', params)
  },
  /**
   * 결재자 목록 조회
   * @param COM0201S01Params
   */
  COM0201S01(params: COM0201S01Params) {
    return $fx.axios().post('COM0201S01', params)
  },
  /**
   * 승인요청번호 결재정보 조회
   * @param COM0201S02Params
   */
  COM0201S02(params: COM0201S02Params) {
    return $fx.axios().post('COM0201S02', params)
  },
}
