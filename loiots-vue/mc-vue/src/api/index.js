import test from "./apiList/test";//测试接口
import login from "./apiList/login";//登录相关接口
import role from "./apiList/researcher";//角色相关接口
import user from "./apiList/user";//用户相关接口
import duty from "./apiList/duty";//排班相关接口
import task from "./apiList/task";//任务相关接口
import article from "./apiList/article";//任务相关接口
export default {
  ...test,//引入test文件的所有接口
  ...login,//引入login的所有接口
  ...role,//引入role的所有接口
  ...user,//引入user的所有接口
  ...duty,//引入duty的所有接口
  ...task,//引入task的所有接口
  ...article,//引入task的所有接口
}