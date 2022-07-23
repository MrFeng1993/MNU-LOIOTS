import Request from "../request";//引入封装好的公共请求
export default {
  /**
  * 排班列表
  */
  dutySearch: params => {
    return Request({
      url: "duty/search",
      method: "post",
      data: params
    })
  },
  /**
  * 排班详情
  */
  dutyFindOne: id => {
    return Request({
      url: `duty/findOne/${id}`,
      method: "get"
    })
  },
  /**
  * 查询某一排班对应的人员
  */
  dutyFindDutyUser: id => {
    return Request({
      url: `duty/findDutyUser/${id}`,
      method: "get"
    })
  },
  /**
  * 排班设置
  */
  dutyScheduling: params => {
    return Request({
      url: "duty/scheduling",
      method: "post",
      data: params
    })
  },
}