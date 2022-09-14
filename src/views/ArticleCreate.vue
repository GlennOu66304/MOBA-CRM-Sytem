<template>
  <div class="ArticleCreate">
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form
      label="名称"
      label-width="120px"
      ref="createFormRef"
      :model="createForm"
      :rules="create_rules"
    >
      <el-form-item label="请选择上级分类">
        <el-select
          v-model="createForm.categories"
          placeholder="请选择"
          multiple
        >
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="name" label="标题">
        <el-input v-model="createForm.title"> </el-input>
      </el-form-item>
      <el-form-item prop="name" label="详情">
        <vue-editor
          id="editor"
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="createForm.body"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="addSubmit">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "ArtileCreate",
  components: {
    VueEditor,
  },
  props: {
    id: {},
  },
  data() {
    return {
      parents: "",
      createForm: {
        title: "",
        categories: [],
        body: "",
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
    this.loadCategory();
    this.id && this.loadData2();
  },
  methods: {
    async loadCategory() {
      await this.$axios.get(`${process.env.VUE_APP_AP}/api/category`).then((res) => {
        // console.log(res);
        this.parents = res.data;
      });
    },
    async loadData2() {
      await this.$axios.get(`${process.env.VUE_APP_AP}/api/article/${this.id}`).then((res) => {
        this.createForm = res.data;
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
          await this.$axios.put(`${process.env.VUE_APP_AP}/api/article/${this.id}`, body);
        });
      } else {
        this.$refs.createFormRef.validate(async (valid) => {
          // console.log(this.createForm);
          const body = this.createForm;
          if (!valid) {
            return false;
          }
          await this.$axios.post(`${process.env.VUE_APP_AP}/api/article`, body);
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
      this.$router.push("/article/list");
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      const res = await this.$axios.post(`${process.env.VUE_APP_AP}/api/article/upload`, formData);
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