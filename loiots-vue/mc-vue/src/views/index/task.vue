<!-- 任务管理 -->
<template>
  <div class="task_html flex-h">
    <div class="search_list">
      <el-input
        v-model="taskName"
        placeholder="请输入搜索内容"
        size="mini"
        style="width: 400px"
      ></el-input>
      <el-button size="mini" style="margin-left: 10px" @click="taskSearch"
        >搜索</el-button
      >
    </div>
    <div style="margin: 10px">
      <el-button @click="onAdd" size="mini">添加</el-button>
    </div>
    <div class="table_box flex-h">
      <div>
        <el-table
          :data="data"
          border
          style="width: 100%"
          ref="table"
          height="calc(100vh - 230px)"
        >
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column prop="id" align="center" label="序号">
          </el-table-column>
          <el-table-column prop="taskName" align="center" label="名称">
          </el-table-column>
          <el-table-column prop="startTime" align="center" label="时间">
            <template scope="scope">
              {{ scope.row.startTime }}-{{ scope.row.endTime }}
            </template>
          </el-table-column>
          <el-table-column prop="isHandle" align="center" label="是否处理">
            <template scope="scope">
              {{ scope.row.isHandle ? "是" : "否" }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template scope="scope">
              <el-button
                size="mini"
                v-if="!scope.row.isHandle"
                @click="onExecute(scope.row.id)"
                >处理</el-button
              >
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
      <!-- 分页 -->
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
          <el-form-item label="名称" prop="taskName">
            <el-input v-model="ruleForm.taskName"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="ruleForm.startTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择开始时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="ruleForm.endTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择结束时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="onSet" size="mini">提交</el-button>
      </span>
    </el-dialog>
    <!-- 处理 -->
    <el-dialog title="处理" :visible.sync="execute" width="30%">
      <div class="flex">
        <div class="execute_title">完成情况</div>
        <el-input
          type="textarea"
          style="margin-left: 10px"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="finishDesc"
        >
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="execute = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="setExecute" size="mini"
          >提交</el-button
        >
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
      taskName: "",
      finishDesc: "",
      taskId: "",
      data: [],
      total: 0,
      show: false,
      execute: false,
      title: "",
      currentNo: 1,
      pageSize: 10,
      ruleForm: {
        taskName: "",
        startTime: "",
        endTime: "",
      },
      rules: {
        taskName: [
          { required: true, message: "请输入姓名", trigger: "change" },
        ],
        startTime: [
          { required: true, message: "请输入姓名", trigger: "change" },
        ],
        endTime: [{ required: true, message: "请输入姓名", trigger: "change" }],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 请求列表
    taskSearch() {
      let params = {
        taskName: this.taskName,
        currentNo: this.currentNo,
        pageSize: this.pageSize,
      };
      this.$Api.taskSearch(params).then((res) => {
        this.data = res.obj.object;
        this.total = res.obj.count;
      });
    },
    // 处理任务
    onExecute(id) {
      this.taskId = id;
      this.execute = true;
    },
    // 提交任务
    setExecute() {
      if (!this.finishDesc) {
        this.$message({
          message: "请输入完成情况",
          type: "warning",
        });
        return;
      }
      let params = {
        id: this.taskId,
        finishDesc: this.finishDesc,
      };
      this.$Api.taskExecute(params).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.taskSearch();
        this.execute = false;
      });
    },
    // 编辑任务
    onEdit(id) {
      this.title = "编辑";
      this.$Api.taskFindOne(id).then((res) => {
        this.ruleForm = res.obj;
      });
      this.show = true;
    },
    // 添加任务
    onAdd() {
      this.title = "添加";
      this.ruleForm = {
        taskName: "",
        startTime: "",
        endTime: "",
      };
      this.show = true;
    },
    // 删除任务
    onDel(id) {
      this.$Api.taskDelete(id).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
      });
      this.taskSearch();
    },
    // 切换页数
    handleSizeChange(val) {
      this.currentNo = val;
      this.taskSearch();
    },
    // 切换请求条数
    handleCurrentChange() {
      this.pageSize = val;
      this.taskSearch();
    },
    //修改&添加任务
    onSet() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$Api.taskUpdate(this.ruleForm).then((res) => {
            this.$message({
              message: this.title === "添加" ? "添加成功" : "修改成功",
              type: "success",
            });
            this.show = false;
            this.taskSearch();
          });
        }
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.taskSearch();
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
.task_html {
  padding: 10px;
  flex: 1;
  .search_list {
    margin: 10px;
  }
  .table_box {
    flex: 1;
  }
  .execute_title {
    white-space: nowrap;
  }
}
</style>