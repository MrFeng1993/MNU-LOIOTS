<!-- 用户管理 -->
<template>
  <div class="role_html flex-h">
    <div class="search_list">
      <el-input
        v-model="userName"
        placeholder="请输入搜索内容"
        size="mini"
        style="width: 400px"
      ></el-input>
      <el-button size="mini" style="margin-left: 10px" @click="userSearch"
        >搜索</el-button
      >
    </div>
    <div>
      <el-button @click="onAdd" size="mini">添加</el-button>
    </div>
    <div class="table_box flex-h">
      <div>
        <el-table
          :data="data"
          border
          style="width: 100%"
          ref="table"
          height="calc(100vh - 220px)"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column prop="id" align="center" label="序号">
          </el-table-column>
          <el-table-column prop="userName" align="center" label="姓名">
          </el-table-column>
          <el-table-column prop="department" align="center" label="部门">
          </el-table-column>
          <el-table-column prop="account" align="center" label="登录帐号">
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template scope="scope">
              <el-button size="mini" @click="onEdit(scope.row.id)"
                >编辑</el-button
              >
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                style="margin-left: 10px"
                @confirm="onDel(scope.row.id)"
              >
                <el-button size="mini" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 添加&编辑 -->
    <el-dialog :title="title" :visible.sync="show" v-if="show" width="50%">
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-input v-model="ruleForm.department"></el-input>
          </el-form-item>
          <el-form-item label="登录帐号" prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="password">
            <el-select v-model="ruleForm.roleId" placeholder="请选择角色">
              <el-option
                v-for="item in roleData"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="onSet" size="mini">提交</el-button>
      </span>
    </el-dialog>
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
      currentNo: 1, //当前页
      pageSize: 10, //每页条数
      total: 0, //总条数
      userName: "", //搜索内容
      selectText: false,
      multipleSelection: [],
      data: [],
      // 弹窗
      show: false,
      title: "",
      ruleForm: {
        userName: "",
        department: "",
        account: "",
        password: "",
        roleId: "",
      },
      roleData: [],
      rules: {
        userName: [
          { required: true, message: "请输入姓名", trigger: "change" },
        ],
        department: [
          { required: true, message: "请输入角色名", trigger: "change" },
        ],
        account: [
          { required: true, message: "请输入登录帐号", trigger: "change" },
        ],
        roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 切换请求条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.userSearch();
    },
    // 切换请求页数
    handleCurrentChange(val) {
      this.currentNo = val;
      this.userSearch();
    },
    // 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    // 全选&全不选
    onSelect() {
      this.selectText = !this.selectText;
      if (!this.selectText) {
        this.$refs.table.clearSelection();
      } else {
        this.data.forEach((item) => {
          this.$refs.table.toggleRowSelection(item, true);
        });
      }
    },
    // 删除用户
    onDel(id) {
      this.$Api.userDelete(id).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.userSearch();
      });
    },
    // 列表
    userSearch() {
      let params = {
        currentNo: this.currentNo,
        pageSize: this.pageSize,
        userName: this.userName,
      };
      this.$Api.userSearch(params).then((res) => {
        this.data = res.obj.object;
        this.total = res.obj.count;
      });
    },
    roleFindAll() {
      this.$Api.roleFindAll().then((res) => {
        this.roleData = res.obj;
      });
    },
    // 编辑弹窗
    onEdit(id) {
      this.title = "编辑";
      this.$Api.userFindOne(id).then((res) => {
        this.ruleForm = {
          id: res.obj.id,
          userName: res.obj.userName,
          department: res.obj.department,
          account: res.obj.account,
          password: res.obj.password,
          roleId: res.obj.roleId,
        };
        this.show = true;
      });
    },
    // 添加弹窗
    onAdd() {
      this.title = "添加";
      this.ruleForm = {
        userName: "",
        department: "",
        account: "",
        password: "",
        roleId: "",
      };
      this.show = true;
    },
    // 提交
    onSet() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$Api.userUpdate(this.ruleForm).then((res) => {
            this.$message({
              message: this.title === "添加" ? "添加成功" : "编辑成功",
              type: "success",
            });
            this.show = false;
            this.userSearch();
          });
        }
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.roleFindAll();
    this.userSearch();
  },
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
.role_html {
  padding: 10px 30px;
  flex: 1;
  .search_list {
    padding: 10px;
  }
  .table_box {
    width: 100%;
    flex: 1;
    margin-top: 10px;
    overflow: auto;
    .pagination {
      margin-top: 10px;
    }
  }
}
</style>