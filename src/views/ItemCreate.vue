<template>
  <div class="ItemCreate">
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <el-form
      label="名称"
      label-width="120px"
      ref="createFormRef"
      :model="createForm"
      :rules="create_rules"
    >
      <el-form-item prop="name" label="输入物品内容">
        <el-input v-model="createForm.name"> </el-input>
      </el-form-item>
      <el-form-item prop="name" label="输入物品图标">
        <el-upload
          class="avatar-uploader"
          action="/api/item/upload"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="createForm.icon" :src="createForm.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- <el-form-item prop="name" label="输入物品图标">
        <el-input v-model="createForm.icon"> </el-input>
      </el-form-item> -->
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
  name: "ItemCreate",
  props: {
    id: {},
  },
  data() {
    return {
      createForm: {
        name: "",
        icon: "",
      },

      create_rules: {
        name: [
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
      await this.$axios.get(`/api/item/${this.id}`).then((res) => {
        this.createForm.name = res.data.name;
        this.createForm.icon = res.data.icon;
      });
    },
    async addSubmit(e) {
      // console.log(this.createForm);
      // React onClick and preventDefault() link refresh/redirect?
      // https://stackoverflow.com/questions/36316846/react-onclick-and-preventdefault-link-refresh-redirect
      e.preventDefault();
      if (this.id) {
        this.$refs.createFormRef.validate(async (valid) => {
        
          const body = {
            name: this.createForm.name,
            icon: this.createForm.icon,
          };
          if (!valid) {
            return false;
          }
          await this.$axios.put(`/api/item/${this.id}`, body);
        });
      } else {
        this.$refs.createFormRef.validate(async (valid) => {
          // console.log(this.createForm);
          const body = {
            name: this.createForm.name,
            icon: this.createForm.icon,
          };
          if (!valid) {
            return false;
          }
          await this.$axios.post("/api/item", body);
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
      this.$router.push("/item/list");
    },

    handleAvatarSuccess(res) {
   
      this.createForm.icon = res.url;
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