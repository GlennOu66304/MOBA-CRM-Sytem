<template>
  <div class="ItemList">
    <p>物品列表</p>
    <el-table :data="tableData" border width="100%">
      <!-- 2.2 data row -->
      <!-- 2.1 column name first row -->
      <!-- index column -->
      <el-table-column
        label="列表"
        width="100"
        align="center"
        type="index"
        fixed
      >
      </el-table-column>
      <el-table-column prop="_id" label="ID" width="200" align="center">
      </el-table-column>

      <el-table-column prop="name" label="名称" width="120" align="center">
      </el-table-column>
      <el-table-column prop="icon" label="图标" width="120" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height:30px;" alt="" />
        </template>
      </el-table-column>
      <!-- 2.3 data edit, delete, assign the perssion :Modal Pop up-->
      <el-table-column
        prop="address"
        label="操作"
        align="center"
        fixed="right"
        width="300"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push(`/item/create/${scope.row._id}`)"
            ><i class="el-icon-edit"></i
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
            ><i class="el-icon-delete"></i
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ItemList",

  data() {
    return {
      tableData: [],
    };
  },
  created() {
    // load the table data first
    this.loadData();
  },
  methods: {
    async loadData() {
      await this.$axios.get(`${process.env.VUE_APP_AP}/api/item`).then((res) => {
        // console.log(res.data);
        this.tableData = res.data;
        // this.filterTableData = res.data;
        // this.total = res.data.length;
        // this.profileList = this.allProfileList.filter((item, index) => {
        //   return index < this.pagesize;
        // });
      });
    },
    // handleEdit(row) {
    //   console.log("edit",row);
    // },
    async handleDelete(id) {
      // console.log("delete",id);
      await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning", // text color in the middle
      })
        .then(async () => {
          await this.$axios.delete(`${process.env.VUE_APP_AP}/api/item/${id}`).then((res) => {
            //  console.log(res.data.meta)
            if (res.data.success != true) {
              this.$message.error("删除失败");
            }
            // When you finish the delete, then
            //1.Reset the search field
            // 2.load the data again(query info is zero)

            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.loadData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped></style>