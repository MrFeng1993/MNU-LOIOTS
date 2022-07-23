<!-- 登录 -->
<template>
  <div class="login_html center-w">
    <div class="login_body flex-h">
      <div class="title">{{ title }}</div>
      <div class="subtitle">创建人: {{ subtitle }}</div>
      <el-form
        :model="val"
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="form_lists center-h"
      >
        <el-form-item label="帐号" prop="username">
          <el-input v-model="val.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="val.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="button center-w">
        <el-button type="primary" @click="onLogin" style="width: 80%"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  props: {},
  components: {},
  data() {
    //这里存放数据
    return {
      title: "智慧安保管理平台",
      subtitle: "罗源",
      val: {
        username: "",
        // password: "5qojyRIb6/Q6LlBD53jCvw==",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入帐号", trigger: "change" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // post按钮点击事件
    onLogin() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$Api.postLogin(this.val).then((res) => {
            // 提示
            this.$message({
              message: "登录成功",
              type: "success",
            });
            localStorage.setItem("userName", res.obj.userName);
            localStorage.setItem("menu", JSON.stringify(res.obj.menus));
            // setTimeout  延时器
            setTimeout(() => {
              // 跳转路由
              this.$router.replace({
                path: "/", //跳转的路径
              });
              // 延时器延时1000毫秒
            }, 1000);
          });
        }
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.login_html {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url("../assets/login_bg.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.login_body {
  width: 400px;
  margin-left: 20px;
  // background: rgba(255, 255, 255,.8);
  background-image: url("../assets/login_box.jpg");
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  align-items: center;
  padding: 40px 20px;
  color: #fff;
  .title {
    font-size: 30px;
    font-weight: bold;
  }
  .subtitle {
    font-size: 15px;
    color: #83828b;
    margin-top: 10px;
  }
  .form_lists {
    margin: 20px;
  }
  .button {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>