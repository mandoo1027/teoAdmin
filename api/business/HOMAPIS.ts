type HOM0101S01Params = {
  url: string
}
export const homeApi = {
  /**
   * 로그인
   * @param id : 'test'
   * @param pw : '1234'
   */
  HOM0101S01(params: HOM0101S01Params) {
    return $fx.axios().get('/todos/1', { params: params })
  },
}
