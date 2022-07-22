<!-- 主页面 -->
<template>
  <div class="home_html flex-h">
    <!-- 顶部 -->
    <div class="top_box center-w">
      <div class="logo">LOGO 安保系统</div>
      <div class="site center-w">
        <div class="name"><i class="el-icon-user-solid"></i>{{ val.name }}</div>

        <el-popconfirm title="是否退出到登录页?" @confirm="onOut">
          <el-button
            icon="el-icon-delete"
            slot="reference"
            class="out"
            size="mini"
            circle
            type="danger"
          ></el-button>
        </el-popconfirm>
      </div>
    </div>
    <!-- 菜单和页面 -->
    <div class="body flex">
      <!-- 菜单 -->
      <div class="left_menus">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          router
        >
          <div v-for="(item, index) in menuData" :key="`${index}`">
            <el-submenu :index="String(index)" v-if="!item.url">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.menuName }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="itemA.url"
                  v-for="(itemA, indexA) in item.list"
                  :key="`${index}-${indexA}`"
                  >{{ itemA.menuName }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="item.url" v-else>
              <i class="el-icon-menu"></i>
              <span slot="title">{{ item.menuName }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
      <div class="body_content flex-h">
        <div class="navigation">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: path }" v-if="path !== '/'">{{
              title
            }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view />
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
      activeIndex: "",
      title: "",
      path: "",
      val: {
        // name: localStorage.getItem("userName"),
        name: "jaychou",
      },
      menuData: [
            {
                "createTime": 1656155378437,
                "id": 1,
                "menuName": "科研队伍管理",
                "url": "researcher"
            },
            {
                "createTime": 1656155378437,
                "id": 2,
                "menuName": "动态发布",
                "pid": 1,
                "url": "article"
            },
            {
                "createTime": 1656155378437,
                "id": 3,
                "menuName": "友情链接",
                "pid": 1,
                "url": "flink"
            },
            {
                "createTime": 1656155378437,
                "id": 4,
                "menuName": "媒体库",
                "url": "media"
            }
        ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    $route(val) {
      this.getTitle(val);
    },
  },
  //方法集合
  methods: {
    // 退出到登录
    onOut() {
      this.$Api.logout().then((res) => {
        this.$message({
          message: "退出成功",
          type: "success",
        });
        localStorage.removeItem("userName");
        setTimeout(() => {
          this.$router.replace({
            path: "/login",
          });
        }, 1000);
      });
    },
    // 渲染面包屑和页面
    getTitle(val) {
      this.activeIndex = val.name;
      this.title = val.meta.title;
      this.path = val.path;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTitle(this.$route);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    localStorage.removeItem("token");
  }, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss">
.home_html,
.top_box,
.el-menu,
.el-table,
.el-table tr,
.el-table th.el-table__cell {
  // 整个项目的背景颜色
  background: #fff !important;
  // 整个项目的边框
  border-color: #eee !important;
}
</style>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.home_html {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .top_box {
    height: 40px;
    justify-content: space-between;
    padding: 0px 20px;
    border: 1px solid #eee;

    .out {
      margin-left: 20px;
    }
  }

  .body {
    flex: 1;
    overflow: hidden;
    .left_menus {
      width: 220px;
      max-width: 220px;
      min-width: 220px;
      height: 100%;
      border: 1px solid #eee;
      border-top: 0px;
    }

    .body_content {
      flex: 1;
      text-align: left;

      .navigation {
        padding: 10px;
      }
    }
  }
}
</style>