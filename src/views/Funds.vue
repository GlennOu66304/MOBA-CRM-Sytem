<template>
  <div class="funds">
    <!-- path section -->

    <!--S: Mian bao xie Component -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>资金管理管理</el-breadcrumb-item>
      <el-breadcrumb-item>交易记录</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- table content -->
    <el-card>
      <!-- search section -->

      <!-- 1.search section -->
      <!-- 1.1 search input -->

      <!-- S: When you click the search or hit the eneter, it will call the api and render the data below -->

      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <!-- 1.2 search icon -->
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>

        <!-- 1.3 add new user : Modal icon effect use-->
        <!-- S:1. Modal Compoenent use 2. call the api request-->
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button></el-col
        >
      </el-row>

      <el-row>
        <!-- 2.data display -->
        <!-- S:When the page come in, then load the data from  -->
        <el-table :data="userList" border>
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
          <el-table-column prop="username" label="姓名" width="140" align="center">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="120" align="center">
          </el-table-column>
          <el-table-column prop="mobile" label="电话" align="center">
          </el-table-column>
          <el-table-column prop="role_name" label="角色" width="120" align="center">
          </el-table-column>
          <!-- data switch status -->
          <el-table-column
            prop="mg_state"
            label="状态"
            width="120"
            align="center"
          >
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-table-column>
          <!-- 2.3 data edit, delete, assign the perssion :Modal Pop up-->
          <el-table-column
            prop="address"
            label="操作"
            align="center"
            fixed="right"
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
      <!-- 2.4 pagination section:total page, page size, current page, go to the target page -->

      <el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Funds",
  components: {},

  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 4,
      },
      userList: [],
      value: true,
      currentPage4: 4,
      total: "",
      pagenum: "",
    };
  },

  // created() {
  //   // load the table data first
  //   this.loadData();
  // },

  methods: {
    // Load the data

    async loadData() {
      await this.$axios
        .get(`${process.env.VUE_APP_API}/api/users`, { params: this.queryInfo })
        .then((res) => {
          console.log(res.data);
          this.userList = res.data.data.users;
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  }
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