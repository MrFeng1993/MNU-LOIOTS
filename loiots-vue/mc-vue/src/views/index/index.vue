<!-- 首页 -->
<template>
  <div class="home_index_html center-w">
    <div class="title">实验室后台管理平台</div>
  </div>
</template>
<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  props: {},
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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
.home_index_html {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/login_box.jpg");
  background-size: cover;
  background-position: center;
  .title {
    font-size: 60px;
    font-weight: bold;
    // color: #fff;
    letter-spacing: 10px;
    // 渐变色-------start
    background-image: -webkit-linear-gradient(bottom, red, #fd8403, yellow);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    // 渐变色--------end
  }
}
</style>