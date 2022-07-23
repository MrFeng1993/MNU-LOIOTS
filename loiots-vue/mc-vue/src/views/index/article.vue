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
        </el-table-column >
        <el-table-column
          type="index"
           width="80"
          align="center" label="序号"
          >
        </el-table-column>
        <!-- <el-table-column prop="seq" align="center" label="序号"> -->
        <!-- </el-table-column> -->
        <el-table-column prop="part" align="center" label="栏目">
          <template scope="scope">
            <span>{{partMap[scope.row.part]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" align="center" label="标题">
        </el-table-column>
        <el-table-column  align="center" label="状态">
          <template scope="scope">
            <el-button type="success" v-if="scope.row.status === 1">已上架</el-button>
            <el-button type="info" v-else-if="scope.row.status === 0">未上架</el-button>
            <el-button type="danger" v-else>未知状态</el-button>
          </template>
        
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
            
            <el-button size="mini" @click="launch(scope.row.status,scope.row.id)"
              >{{scope.row.status === 0 ? "上架":"下架"}}</el-button
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
          <el-form-item label="标题:" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="封面:">
            <el-upload
              class="avatar-uploader"
              action="api/apis/media/upload"
              :show-file-list="true"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload">
              <img v-if="ruleForm.coverImgLink && ruleForm.coverImgLink !== ''" :src="ruleForm.coverImgLink" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            
          </el-form-item>
          <el-form-item label="栏目:" prop="part">
            <template>
              <el-radio v-model="ruleForm.part" label="ZHXW" :disabled = disable>综合新闻</el-radio>
              <el-radio v-model="ruleForm.part" label="TZGG" :disabled = disable>通知公告</el-radio>
              <el-radio v-model="ruleForm.part" label="JSDT" :disabled = disable>教师动态</el-radio>
              <el-radio v-model="ruleForm.part" label="YJFX" :disabled = disable>研究方向</el-radio>
              <el-radio v-model="ruleForm.part" label="YJCG" :disabled = disable>研究成果</el-radio>
              <el-radio v-model="ruleForm.part" label="XSHD" :disabled = disable>学术活动</el-radio>
              <el-radio v-model="ruleForm.part" label="SYSGLZD" :disabled = disable>实验室制度</el-radio>
              <el-radio v-model="ruleForm.part" label="XMHZ" :disabled = disable>项目合作</el-radio>
              <el-radio v-model="ruleForm.part" label="RCQK"  disabled >人才情况</el-radio>
              <el-radio v-model="ruleForm.part" label="SYSAQ" disabled >实验室安全</el-radio>
              <el-radio v-model="ruleForm.part" label="LXWM" disabled >联系我们</el-radio>
              <el-radio v-model="ruleForm.part" label="SYSJJ" disabled >实验室简介</el-radio>
            </template>
          </el-form-item>
          <el-form-item  label="状态:">
          <template scope="scope">
            <el-button type="success" v-if="ruleForm.status === 1">已上架</el-button>
            <el-button type="info" v-else-if="ruleForm.status === 0">未上架</el-button>
            <el-button type="danger" v-else>未知状态</el-button>
          </template>
        </el-form-item>
          <el-form-item label="详细介绍:" prop="content" >
            <MyEditor :content = "ruleForm.content"  @editor-value="getEditorValue"></MyEditor>
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
      partMap:{
        SYSJJ:"实验室简介",
        ZHXW:"综合新闻",
        TZGG:"通知公告",
        RCQK:"人才情况",
        JSDT:"教师动态",
        YJFX:"研究方向",
        YJCG:"研究成果",
        XSHD:"学术活动",
        SYSGLZD:"实验室管理制度",
        SYSAQ:"实验室安全",
        XMHZ:"项目合作",
        LXWM:"联系我们",
      },
      show: false,
      title: "",
      data: [],
      ruleForm: {
        title: "",
        status:0,
        coverImgLink: "",
        part: "",
        content:"",
        creator:""
      },
      disable:false,
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
  watch: {

    'ruleForm.creator'(newVal,oldVal){

      if(newVal === 'system'){
        this.disable = true;
      }
      console.log(newVal)
    }
  },
  //方法集合
  methods: {

    uploadSuccess(response, file, fileList){


      this.ruleForm.coverImgLink = response.obj
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
      this.ruleForm.content = val;
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
      this.$Api.articleFindAll(params).then((res) => {
        this.data = res.obj.object;
        this.total = res.obj.count;
      });
    },
    // 删除
    onDel(id) {
      this.$Api.articleDelete(id).then((res) => {
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
        title: "",
        status: 0,
        coverImgLink: "",
        part: "",
        content:"",
        creator:""
      };
      this.show = true;
    },
    // 编辑
    onEdit(id) {
      this.title = "编辑";
      this.show = true;
      this.$Api.articleFindOne(id).then((res) => {
        this.ruleForm = res.obj;
      });
    },
    // 上架/下架
    launch(s,id) {
      if(s === 0){
        s = 1;
      }else{
        s = 0;
      }
      this.$Api.launch(s,id).then((res) => {
        this.findAll();
      });
    },
    // 编辑&添加
    onSet() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$Api.articleUpdate(this.ruleForm).then((res) => {
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
<style >


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