import Request from "../request";//引入封装好的公共请求

export default {
  // post请求
  postLogin: params => {
    return Request({
      url: "login",//请求路径
      method: "post",//请求方法
      data: params//请求参数
    })
  },
  // get请求
  getLogin: params => {
    return Request({
      url: "login",//请求路径
      method: "get",//请求方法
      params//请求参数
    })
  },
  // delete请求
  delLogin: params => {
    return Request({
      url: "login",//请求路径
      method: "delete",//请求方法
      params//请求参数
    })
  },
}