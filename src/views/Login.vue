<template>
  <div class="login_container">
    <!-- login area -->
    <div class="login_box">
      <!-- avatar -->
      <div class="login_avatar">
        <img src="../assets/logo.png" alt="" />
      </div>

      <!-- login form -->

      <el-form
        :model="loginForm"
        :rules="login_rules"
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
      >
        <!-- email -->
        <el-form-item prop="email">
          <!-- v-model get the model object's value -->
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <!-- login and reset button -->
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      login_rules: {
        email: [
          // rules not filled the content
          // { required: true, message: "邮箱必填", trigger: "blur" },
          // rule filled the content
          // {
          //   min: 3,
          //   max: 15,
          //   message: "用户名长度要在3到15个字符",
          //   trigger: "blur",
          // },
        ],
        password: [
          // rules not filled the content
          { required: true, message: "用户密码必填", trigger: "blur" },
          // rule filled the content
          {
            min: 3,
            max: 6,
            message: "用户密码长度要在3到6个字符",
            trigger: "blur",
          },
        ],
      },
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // test the submited value
        // const result = this.loginForm;
        // console.log(result);
        if (!valid) {
          return false;
        }

        // desctructure content
        const { data } = await axios.post(
          `${process.env.VUE_APP_AP}/api/adminauth/login`,
          this.loginForm
        );

        // const { data } = await this.$axios({
        //   method: "post",
        //   url: "http://localhost:8800/api/auth/login",
        //   data: this.loginForm,
        // });

        // login success
        // console.log("login success");
       
        // save the token into the session
        window.sessionStorage.setItem("token", data.token);
        // router push to the /home section
        this.$router.push("/home");
         this.$message({
          message: "登录成功",
          type: "success",
        });
      });
    },

    resetForm() {
      this.$refs.loginFormRef.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  width: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .login_avatar {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    box-shadow: 0 0 10px #ddd;
    // round corner
    border-radius: 50%;
    // location in the middle
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    // half of the body is in the login form section
    img {
      width: 100%;
      height: 100%;
      // round corner
      border-radius: 50%;
      background-color: #eee;
    }
  }

  // form section
  .login_form {
    // form area in the center
    position: absolute;
    width: 100%;
    bottom: 0;
    // input field in the middle
    padding: 0 20px;
    // button in the right bottom corner
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>