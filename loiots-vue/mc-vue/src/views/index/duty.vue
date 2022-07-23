<!-- 排班管理 -->
<template>
  <div class="schedule_html flex-h">
    <div>
      <el-table
        :data="data"
        border
        style="width: 100%"
        height="calc(100vh - 130px)"
      >
        <el-table-column prop="id" align="center" label="序号">
        </el-table-column>
        <el-table-column prop="time" align="center" label="日期">
          <template scope="scope">
            <div>{{ scope.row.startTime }}-{{ scope.row.endTime }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="number" align="center" label="班次">
          <template scope="scope">
            <div>{{ scope.row.dailyOrder === 1 ? "白班" : "晚班" }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
            <el-button size="mini" @click="onScheduling(scope.row.id)"
              >排班</el-button
            >
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
    <!-- 排班弹窗 -->
    <el-dialog title="排班" :visible.sync="show" width="30%">
      <div class="show_body">
        <el-checkbox-group v-model="userIds">
          <el-checkbox
            v-for="(item, index) in dutyData"
            :label="item.id"
            :key="index"
            >{{ item.userName }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="onSet">确 定</el-button>
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
      show: false,
      currentNo: 1,
      pageSize: 10,
      total: 0,
      data: [],
      // 弹窗
      dutyId: "",
      userIds: [],
      dutyData: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 排班
    onScheduling(id) {
      this.dutyId = id;
      this.$Api.dutyFindDutyUser(id).then((res) => {
        this.userIds = res.obj.map((item) => {
          return item.id;
        });
        this.show = true;
      });
    },
    // 切换请求条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.dutyList();
    },
    // 切换请求页数
    handleCurrentChange(val) {
      this.currentNo = val;
      this.dutyList();
    },
    // 排班列表
    dutyList() {
      let params = {
        currentNo: this.currentNo,
        pageSize: this.pageSize,
      };
      this.$Api.dutySearch(params).then((res) => {
        this.data = res.obj.object;
        this.total = res.obj.count;
      });
    },
    // 全部用户
    getUser() {
      this.$Api.userFindAll().then((res) => {
        this.dutyData = res.obj;
      });
    },
    // 设置排版
    onSet() {
      let params = {
        dutyId: this.dutyId,
        userIds: this.userIds,
      };
      this.$Api.dutyScheduling(params).then((res) => {
        this.$message({
          message: "设置成功",
          type: "success",
        });
        this.show = false;
        this.dutyList();
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getUser();
    this.dutyList();
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
.schedule_html {
  padding: 10px;
  flex: 1;

  .schedule_lists {
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>