<template>
  <div class="ArticleCreate">
    <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
    <el-form
      label="名称"
      label-width="120px"
      ref="createFormRef"
      :model="createForm"
      :rules="create_rules"
    >
      <el-form-item prop="name" label="标题">
        <el-input v-model="createForm.title"> </el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button
          @click="createForm.items.push({})"
          size="small"
          round
          type="primary"
        >
          <i class="el-icon-plus"></i> 添加广告</el-button
        >
      </el-form-item>

      <!-- style="flex-wrap: wrap" hide -->
      <el-row type="flex">
        <el-col v-for="(item, index) in createForm.items" :key="index">
          <el-form-item label="名称(URL)">
            <el-input v-model="item.url"> </el-input>
          </el-form-item>

          <el-form-item prop="name" label="图标">
            <el-upload
              class="avatar-uploader"
              action="/api/ad/upload"
               :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(res) => (item.img = res.url)"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="item.img" :src="item.img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button
              type="danger"
              size="small"
              @click="createForm.items.splice(index, 1)"
            >
              删除
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="addSubmit">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdCreate",

  props: {
    id: {},
  },
  data() {
    return {
      createForm: {
        title: "",
        items: [],
      },

      create_rules: {
        title: [
          // rules not filled the content
          { required: true, message: "分类名必填", trigger: "blur" },
          // rule filled the content
          {
            min: 2,
            max: 15,
            message: "分类长度要在2到15个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.id && this.loadData2();
  },
  methods: {
    async loadData2() {
      await this.$axios.get(`${process.env.VUE_APP_API}/api/ad/${this.id}`).then((res) => {
        this.createForm = Object.assign({}, this.createForm, res.data);
      });
    },
    async addSubmit(e) {
      // console.log(this.createForm);
      // React onClick and preventDefault() link refresh/redirect?
      // https://stackoverflow.com/questions/36316846/react-onclick-and-preventdefault-link-refresh-redirect
      e.preventDefault();
      if (this.id) {
        this.$refs.createFormRef.validate(async (valid) => {
          const body = this.createForm;
          if (!valid) {
            return false;
          }
          await this.$axios.put(`${process.env.VUE_APP_API}/api/ad/${this.id}`, body);
        });
      } else {
        this.$refs.createFormRef.validate(async (valid) => {
          // console.log(this.createForm);
          const body = this.createForm;
          if (!valid) {
            return false;
          }
          await this.$axios.post(`${process.env.VUE_APP_API}/api/ad`, body);
        });
      }
      // if (!data) {
      //   // console.log("login failed");
      //   this.$message.error("保存失败");
      //   return;
      // }

      this.$message({
        message: "保存成功",
        type: "success",
      });
      this.$router.push("/ad/list");
    },
     beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      const res = await this.$axios.post(`${process.env.VUE_APP_API}/api/ad/upload`, formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
  },
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
  border-color: #409eff;
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