import Request from "../request";//引入封装好的公共请求
export default {
  /**
   * 任务列表
   */
  taskSearch: params => {
    return Request({
      url: "task/search",
      method: "post",
      data: params
    })
  },
  /**
   * 任务详情
   */
  taskFindOne: id => {
    return Request({
      url: `task/findOne/${id}`,
      method: "get"
    })
  },
  /**
   * 删除任务
   */
  taskDelete: id => {
    return Request({
      url: `task/delete/${id}`,
      method: "delete"
    })
  },
  /**
   * 添加&编辑任务
   */
  taskUpdate: params => {
    return Request({
      url: "task/update",
      method: "post",
      data: params
    })
  },
  /**
   * 处理任务
   */
  taskExecute: params => {
    return Request({
      url: "task/execute",
      method: "post",
      data: params
    })
  },
}