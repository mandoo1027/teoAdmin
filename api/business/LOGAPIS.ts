// 로그인
type LOG0101S01Params = {
  id: string;
  pwd: string;
};
export const loginApi = {
  /**
   * 로그인
   * @param LOG0101S01Params
   */
  LOG0101S01(params: LOG0101S01Params) {
    return $fx.axios().post("HCO0101S01", params);
  },
  /**
   * 로그인 연장
   *
   */
  LOG0101S02() {
    return $fx.axios().post("HCO0101S02", {});
  },
  /**
   * 로그아웃
   *
   */
  LOG0101S03() {
    return $fx.axios().post("HCO0101S03", {});
  },
};
