<template>
  <!-- total continer -->
  <el-container style="height: 100%; border: 1px solid #eee">
    <!-- 1.header row -->
    <el-header
      style="text-align: right; font-size: 12px; background-color: #373d3f"
    >
      <!-- left side -->

      <div class="left">
        <!-- icon -->
        <img src="../assets/logo.png" alt="" />
        <!-- text -->
        <span>米修在线后台管理系统</span>
      </div>
      <!-- right side -->
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <!-- 2.Aside and Main contet in one row -->

    <el-container>
      <!-- toggle section -->

      <el-aside :width="isCollapse ? '64px' : '200px'" height="700px">
        <!-- menu container -->
        <!-- toggle section
        1.three vertical lines
       
        
         -->
        <div class="toggle" @click="toggleSideBar">|||</div>
        <el-menu
          router
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          :collapse-transition="false"
          :unique-opened="true"
          :default-active="$route.path"
          @select="handleSelect"
        >
          <!-- group 1 -->
          <el-submenu
            v-for="item in menuList"
            :key="item.id"
            :index="item.id + ''"
          >
            <!--toggle title -->
            <template slot="title">
              <!-- dynamic get the data -->
              <i :class="iconObej[item.id]"></i>

              <span slot="title">{{ item.authName }}</span>
            </template>

            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="'/' + subItem.path"
            >
              <i class="el-icon-menu"></i>
              <span>{{ subItem.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- right side content -->

      <el-main height="100%">
        <router-view :key="$router.path"> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import menuList from "../config/menuConfig";
export default {
  name: "Home",
  data() {
    return {
      // fake data generate
      menuList: menuList,
      iconObej: {
        666: "el-icon-info",
        125: "el-icon-user-solid",
        103: "el-icon-s-operation",
        101: "el-icon-s-goods",
        102: "el-icon-s-order",
        145: "el-icon-s-data",
        107: "el-icon-s-data",
        117: "el-icon-s-order",
        127: "el-icon-s-goods",
        137: "el-icon-s-goods",
        147: "el-icon-s-goods",
        157: "el-icon-s-goods",
      },
      isCollapse: false,
    };
  },

  created() {
    // console.log(menuList);
  },

  methods: {
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
      // console.log(this.isCollapse)
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/");
    },

// vue使用element-ui，页面刷新，导航栏选中问题
// https://blog.csdn.net/weixin_43953518/article/details/115176265
    handleSelect(data) {
      this.$router.push({ path: data });
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  align-items: center;
  color: white;

  /* vertical-align: middle; */
  > div {
    display: flex;
    img {
      width: 40px;
      height: 40px;
      padding-top: 12px;
      padding-left: 12px;
    }
    span {
      margin-left: 1px;
      font-size: 20px;
    }
  }
}

.el-aside {
  background-color: #333744;
  bottom: 0;
}
.el-main {
  background-color: #eaedf1;
}

// color is white,font size is 10px, in the middle, background -color, top and middle
.toggle {
  font-size: 10px;
  background-color: #4a5064;
  text-align: center;
  line-height: 24px;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>