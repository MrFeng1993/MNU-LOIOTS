import Request from "../request";//引入封装好的公共请求

export default {
  /**
  * 分页查询科研人员
  */
  articleFindAll: (params) => {
    return Request({
      url: "apis/article/ig/search",
      method: "post",
      data: params
    })
  },
  /**
  * 科研人员详情
  */
   articleFindOne: id => {
    return Request({
      url: `apis/article/ig/findOne/${id}`,
      method: "get",
    })
  },
  /**
  * 添加&修改科研人员信息
  */
   articleUpdate: params => {
    return Request({
      url: "apis/article/update",
      method: "post",
      data: params
    })
  },
  /**
  * 删除角色
  */
   articleDelete: id => {
    return Request({
      url: `apis/article/deleteOne/${id}`,
      method: "delete"
    })
  },

   /**
  * 删除角色
  */
    launch: (s,id) => {
      return Request({
        url: `apis/article/launch/${s}/${id}`,
        method: "get"
      })
    }
}