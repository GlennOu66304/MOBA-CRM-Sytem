<template>
  <div class="CategoryCreate">
    <h1>{{ id ? "编辑" : "新建" }}管理员</h1>
    <el-form
      label="名称"
      label-width="120px"
      ref="createFormRef"
      :model="createForm"
      :rules="create_rules"
    >
     <el-form-item prop="name" label="用户名">
        <el-input v-model="createForm.username"> </el-input>
      </el-form-item>
       <el-form-item prop="name" label="密码">
        <el-input v-model="createForm.password"> </el-input>
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
  name: "AdminCreate",
  props: {
    id: {},
  },
  data() {
    return {
      createForm: {
        username: "",
        password:""
      },
    
      
      create_rules: {
        // name: [
        //   // rules not filled the content
        //   { required: true, message: "Admin必填", trigger: "blur" },
        //   // rule filled the content
        //   {
        //     min: 1,
        //     max: 15,
        //     message: "Admin长度要在1到15个字符",
        //     trigger: "blur",
        //   },
        // ],
      },
    };
  },
  created() {
    
    this.id && this.loadData2();
  
  },
  methods: {
    async loadData2() {
      await this.$axios
        .get(`${process.env.VUE_APP_API}/api/admin/${this.id}`)
        .then((res) => {
          console.log(res);
          this.createForm.username = res.data.username;
          this.createForm.password = res.data.password;
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
          const body = this.createForm;
          if (!valid) {
            return false;
          }
          await this.$axios.put(
            `${process.env.VUE_APP_API}/api/admin/${this.id}`,
            body
          );
          
        });
      } else {
        this.$refs.createFormRef.validate(async (valid) => {
          console.log(this.createForm);
          const body = this.createForm;
          if (!valid) {
            return false;
          }
          await this.$axios.post(`${process.env.VUE_APP_API}/api/admin`, body);
          
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
      this.$router.push("/admin/list");
    },
 
  },
};
</script>

<style lang="less" scoped></style>