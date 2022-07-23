import Request from "../request";//引入封装好的公共请求

export default {
  /**
  * 分页查询科研人员
  */
  roleFindAll: (params) => {
    return Request({
      url: "apis/researcher/ig/search",
      method: "post",
      data: params
    })
  },
  /**
  * 科研人员详情
  */
  researcherFindOne: id => {
    return Request({
      url: `apis/researcher/ig/findOne/${id}`,
      method: "get",
    })
  },
  /**
  * 添加&修改科研人员信息
  */
  researcherUpdate: params => {
    return Request({
      url: "apis/researcher/update",
      method: "post",
      data: params
    })
  },
  /**
  * 删除角色
  */
  researcherDelete: id => {
    return Request({
      url: `apis/researcher/deleteOne/${id}`,
      method: "delete"
    })
  },
  /**
  * 设置菜单
  */
  changeSeq: (direction,id) => {
    return Request({
      url:`apis/researcher/move/${direction}/${id}`,
      method: "get"
    })
  },
}