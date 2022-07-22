import Request from "../request";//引入封装好的公共请求

export default {
  /**
  * 用户列表
  */
  userSearch: params => {
    return Request({
      url: "user/search",
      method: "post",
      data:params
    })
  },
  /**
  * 用户列表所有
  */
  userFindAll: () => {
    return Request({
      url: "user/findAll",
      method: "get"
    })
  },
  /**
  * 用户详情
  */
  userFindOne: id => {
    return Request({
      url: `user/findOne/${id}`,
      method: "get",
    })
  },
  /**
 * 删除用户
 */
  userDelete: id => {
    return Request({
      url: `user/delete/${id}`,
      method: "delete",
    })
  },
  /**
 * 添加&编辑用户
 */
  userUpdate: params => {
    return Request({
      url: "user/update",
      method: "post",
      data: params
    })
  },
}