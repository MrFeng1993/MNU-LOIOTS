<!-- 角色管理 -->
<template>
  <div class="user_html flex-h">
    <div class="search_list">
      <el-button size="mini" type="primary" @click="onAdd">添加</el-button>
    </div>
    <div class="table_box flex-h">
      <div>
      <el-table
        :data="data"
        border
        style="width: 100%"
        height="calc(100vh - 200px)"
      >
        <el-table-column prop="id" align="center" label="序号"  v-if="false">
        </el-table-column>

        <el-table-column
          width="80"
          type="index"
          align="center" label="序号"
          >
        </el-table-column>
        <!-- <el-table-column prop="seq" align="center" label="序号"> -->
        <!-- </el-table-column> -->
        <el-table-column prop="name" align="center" label="姓名">
        </el-table-column>
        <el-table-column prop="descr" align="center" label="概述">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
            <el-button size="mini" @click="changeSeq('up',scope.row.id)"
              >上移</el-button
            >
            <el-button size="mini" @click="changeSeq('down',scope.row.id)"
              >下移</el-button
            >
            <el-button size="mini" @click="onEdit(scope.row.id)"
              >编辑</el-button
            >
            <el-popconfirm
              title="确认删除？"
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
    <el-dialog :title="title" :visible.sync="show" v-if="show" width="80%">
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          

          <el-form-item label="图片">
            <el-upload
              class="avatar-uploader"
              action="api/apis/media/upload"
              :show-file-list="true"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload">
              <img v-if="ruleForm.profileImgLink && ruleForm.profileImgLink !== ''" :src="ruleForm.profileImgLink" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!-- <el-input v-model="ruleForm.profileImgLink"></el-input> -->
          </el-form-item>
          <el-form-item label="概述">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="ruleForm.descr">
            </el-input>
            
          </el-form-item>
          <el-form-item label="详细介绍:" prop="detailInfo" >
            <MyEditor :content = "ruleForm.detailInfo"  @editor-value="getEditorValue"></MyEditor>
            <!-- <el-input v-model="ruleForm.content"></el-input> -->
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
import MyEditor from '@/utils/editor/wangeditor.vue';
export default {
  //import引入的组件需要注入到对象中才能使用
  props: {},
  components: { MyEditor },
  data() {
    //这里存放数据
    return {
      show: false,
      title: "",
      headerObj:{
        'Content-Type':"multipart/form-data"
      },
      data: [],
      ruleForm: {
        name: "",
        profileImgLink: "",
        detailInfo: "",
        descr:""
      },
      total: 0,
      currentNo: 1,
      pageSize: 10,
      rules: {
        roleName: [
          { required: true, message: "请输入角色名", trigger: "change" },
        ],
        roleCode: [
          { required: true, message: "请输入角色编码", trigger: "change" },
        ],
        roledesc: [
          { required: true, message: "请输入描述", trigger: "change" },
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

    uploadSuccess(response, file, fileList){


      this.ruleForm.profileImgLink = response.obj
      console.log("uploadSuccess" + response.obj)
    },

    uploadError(err, file, fileList){
      console.log(err)
    },

    beforeUpload(file){
      console.log("beforeUpload")
    },
    // 获取富文本内容
    getEditorValue(val) {
      this.ruleForm.detailInfo = val;
    },

    // 更改每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.findAll();
    },
    // 翻页
    handleCurrentChange(val) {
      this.currentNo = val;
      this.findAll();
    },
    // 列表
    findAll() {
      let params = {
        name: this.name,
        currentNo: this.currentNo,
        pageSize: this.pageSize,
      };
      this.$Api.roleFindAll(params).then((res) => {
        this.data = res.obj.object;
        this.total = res.obj.count;
      });
    },
    // 删除
    onDel(id) {
      this.$Api.researcherDelete(id).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.findAll();
      });
    },
    // 添加
    onAdd() {
      this.title = "添加";
      this.ruleForm = {
        name: "",
        profileImgLink: "",
        detailInfo: "",
        descr:""
      };
      this.show = true;
    },
    // 编辑
    onEdit(id) {
      this.title = "编辑";
      this.show = true;
      this.$Api.researcherFindOne(id).then((res) => {
        this.ruleForm = res.obj;
      });
    },
    // 上移/下移
    changeSeq(d,id) {
      
      this.$Api.changeSeq(d,id).then((res) => {
        this.findAll();
      });
    },
    // 编辑&添加
    onSet() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$Api.researcherUpdate(this.ruleForm).then((res) => {
            this.$message({
              message: this.title === "添加" ? "添加成功" : "编辑成功",
              type: "success",
            });
            this.show = false;
            this.findAll();
          });
        }
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.findAll();
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
<style>

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>