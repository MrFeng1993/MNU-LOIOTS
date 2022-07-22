import Request from "../request";//引入封装好的公共请求
export default {
  /**
   * 登录
   * username 帐号 password 密码
   */
  login: params => {
    return Request({
      url: "login",
      method: "post",
      data: params
    })
  },
  /**
   * 登出
   */
  logout: () => {
    return Request({
      url: "logout",
      method: "post",
    })
  },
  /**
   * 当前角色菜单
   */
  getMenu: id => {
    return Request({
      url: `role/getMenu/${id}`,
      method: "get",
    })
  },
  /**
   * 全部菜单
   */
  menuFindAll: () => {
    return Request({
      url: "menu/findAll",
      method: "get",
    })
  },
}