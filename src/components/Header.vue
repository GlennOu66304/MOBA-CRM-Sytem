<template>
  <div class="Header">
  <el-header
          style="text-align: right; font-size: 12px; background-color:#373d3f;"
        >
          <el-button type="info" @click="logout">退出</el-button>
        </el-header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return { };
  },
  methods: {
       logout() {
      // save the token into the session
      window.sessionStorage.clear();
      // router push to the /home section
      this.$router.push("/");
    },
  },
  
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>
