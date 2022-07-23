// 公共请求文件
import Axios from "axios";//引入请求插件
import Api from "./config";//引入请求地址
import qs from "qs"//引入参数格式化插件
import { Message } from "element-ui";
import router from '../router'
// 接口请求配置
let request = Axios.create({
  baseURL: Api.url,//请求地址
  timeout: 10000//请求超时时间设置
})

// 请求拦截器----------------------发送请求之前
request.interceptors.request.use(config => {
  // config  请求的所有信息
  // ===========操作请求信息----开始
  if (config.url === 'login') {
    config.data = qs.stringify(config.data)
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'//修改请求方式为formData方式
  }
  // config.url === 'login' ? config.data = qs.stringify(config.data) : ""
  // : config.params = config.params//判断是否post请求，post请求需要用qs格式化一下请求参数
  // ==============操作请求信息-----结束
  return config//返回请求信息
}, error => {
  Message.error('请求失败，请求未发送')
  // 请求发送错误
  return Promise.reject(error)
})

// 请求响应器---------------------发送请求回来
request.interceptors.response.use(res => {
  // 判断请求返回状态是否成功
  if (res.data.success) {
    // 返回成功的数据
    return res.data
  } else {
    Message.error(res.data.msg)
    // 返回状态失败的数据
    return Promise.reject(res.data)
  }
}, err => {
  Message.error('请求失败，请求无响应')
  // localStorage.removeItem("userName")
  // 返回失败方法
  return Promise.reject(err)
})

// ----------------------------将方法映射出去
export default request