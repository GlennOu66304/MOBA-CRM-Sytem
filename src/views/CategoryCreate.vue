<template>
  <div class="CategoryCreate">
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form
      label="名称"
      label-width="120px"
      ref="createFormRef"
      :model="createForm"
      :rules="create_rules"
    >
      <el-form-item label="请选择上级分类">
        <el-select v-model="createForm.parent" placeholder="请选择">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- ————————————————
版权声明：本文为CSDN博主「辰兮要努力」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45393094/article/details/109963282 -->
      <el-form-item prop="name" label="输入分类内容">
        <el-input v-model="createForm.name"> </el-input>
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
export default {
  name: "CategoryCreate",
  props: {
    id: {},
  },
  data() {
    return {
      createForm: {
        name: "",
        parent:""
      },
      parents: "",
      
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
    this.loadParents();
  },
  methods: {
    async loadData2() {
      await this.$axios
        .get(`${process.env.VUE_APP_API}/api/category/${this.id}`)
        .then((res) => {
          console.log(res);
          this.createForm.name = res.data.name;
        });
    },
    async addSubmit(e) {
      console.log(this.createForm)
      // React onClick and preventDefault() link refresh/redirect?
      // https://stackoverflow.com/questions/36316846/react-onclick-and-preventdefault-link-refresh-redirect
      e.preventDefault();
      if (this.id) {
        this.$refs.createFormRef.validate(async (valid) => {
          console.log(this.createForm);
          const body = {
            name: this.createForm.name,
            parent:this.createForm.parent
          };
          if (!valid) {
            return false;
          }
          await this.$axios.put(
            `${process.env.VUE_APP_API}/api/category/${this.id}`,
            body
          );
           this.loadData2()
        });
      } else {
        this.$refs.createFormRef.validate(async (valid) => {
          console.log(this.createForm);
          const body = {
            name: this.createForm.name,
            parent:this.createForm.parent
          };
          if (!valid) {
            return false;
          }
          await this.$axios.post(`${process.env.VUE_APP_API}/api/category`, body);
           this.loadData2()
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
      this.$router.push(`/category/list`);
    },
    async loadParents() {
      await this.$axios
        .get(`${process.env.VUE_APP_API}/api/category`)
        .then((res) => {
          // console.log(res);
          this.parents = res.data;
          console.log(this.parents)
        });
    },
  },
};
</script>

<style lang="less" scoped></style>