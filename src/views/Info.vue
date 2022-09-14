<template>
  <div class="info">
    <!-- path section -->

    <!--S: Mian bao xie Component -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- table content -->
    <el-card>
      <!-- search section -->

      <!-- 1.search section -->
      <!-- 1.1 search input -->

      <!-- S: When you click the search or hit the eneter, it will call the api and render the data below -->

      <el-row :gutter="20">
        <!-- 1.3 add new user : Modal icon effect use-->
        <!-- S:1. Modal Compoenent use 2. call the api request-->
        <el-col :span="4">
          <el-button type="primary">添加角色</el-button></el-col
        >
      </el-row>

      <el-row>
        <!-- 2.data display -->
        <!-- S:When the page come in, then load the data from  -->
        <el-table :data="tableData" border width="100%">
          <!-- 2.2 data row -->
          <!-- 2.1 column name first row -->
          <!-- index column -->
          <el-table-column
            label="列表"
            width="140"
            align="center"
            type="index"
            fixed
          >
          </el-table-column>
          <el-table-column prop="name" label="角色名称" width="300" align="center">
          </el-table-column>
          <el-table-column prop="email" label="角色描述" width="300" align="center">
          </el-table-column>
         
         
        
          <!-- 2.3 data edit, delete, assign the perssion :Modal Pop up-->
          <el-table-column
            prop="address"
            label="操作"
            align="center"
            fixed="right"
            width="300"
          >
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              ><i class="el-icon-delete"></i
            ></el-button>

            <el-button
              size="mini"
              type="warning"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <i class="el-icon-setting"></i
            ></el-button>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Info",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      phone: "15647823020",
      email: "test@qq.com",
      roles: "admin",
    };
    return {
      tableData: Array(20).fill(item),
      value: true,
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.el-row {
  margin-bottom: 20px;
}
</style>