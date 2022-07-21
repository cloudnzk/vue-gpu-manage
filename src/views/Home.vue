<template>
  <div class="basic-layout">
    <div class="nav-side" :class="isCollapse ? 'fold-menu' : ''">
      <!-- logo -->
      <div class="nav-left-logo">
        <img src="./../assets/logo.png" alt="" />
        <span>Manger</span>
      </div>
      <!-- 菜单 -->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#409eff"
        :collapse="isCollapse"
      >
        <!-- <MenuTree :menuList="menuList"/> -->
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="1-1">用户管理</el-menu-item>
          <el-menu-item index="1-2">菜单管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Promotion /></el-icon>
            <span>审批管理</span>
          </template>
          <el-menu-item index="2-1">休假申请</el-menu-item>
          <el-menu-item index="2-2">待我审批</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>

    <div class="content-right" :class="isCollapse ? 'fold-content' : ''">
      <div class="nav-top">
        <!-- 面包屑 -->
        <div class="bar-left">
          <el-icon class="collapse-i" @click="toggleMenu">
            <Fold />
          </el-icon>
          <div class="bread"><bread-crumb /></div>
        </div>
        <!-- 用户信息 -->
        <div class="top-userinfo">
          <!-- 通知 -->
          <el-badge
            :is-dot="noticeCount > 0"
            class="item bellicon"
            style="cursor: pointer"
            ><el-icon><Bell /></el-icon>
          </el-badge>
          <!-- 下拉菜单 -->
          <el-dropdown @command="dropMenuHandler">
            <span class="userinfo-name">{{ userInfo.userName }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email"
                  >邮箱：{{ userInfo.userEmail }}</el-dropdown-item
                >
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <!-- 子路由展示 -->
      <div class="wrapper">
        <div class="main-page">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {request} from "utils/request"
import BreadCrumb from "components/Breadcrumb/BreadCrumb";
// import MenuTree from './MenuTree/MenuTree'

export default {
  name: "HomePage",
  mixins: [],
  components: {
    BreadCrumb,
    // MenuTree,
  },
  props: {},
  data() {
    return {
      isCollapse: false, // 菜单是否折叠
      userInfo: this.$store.state.userInfo, // 用户信息
      noticeCount: 0, // 通知数量
      menuList: [], // 菜单列表数据
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    //收缩菜单
    toggleMenu() {
      this.isCollapse = !this.isCollapse;
    },
    //下拉菜单点击事件
    dropMenuHandler(command) {
      if (command === "email") {
        return;
      } else if (command === "logout") {
        //退出登录，清空登录状态并跳转到登录页
        this.$store.commit("saveUserInfo", "");
        this.$router.replace("/login");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    // 侧边栏菜单折叠展开过渡动画
    transition: width 0.5s;

    .nav-left-logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      span {
        font-size: 25px;
        color: #fff;
      }
      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }

    .el-menu-item:hover {
      background-color: #0c2b42 !important;
    }
    .el-menu-vertical-demo {
      border: none;
    }
    &.fold-menu {
      width: 65px;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .content-right {
    margin-left: 200px;
    transition: all 0.5s;

    &.fold-content {
      margin-left: 65px;
    }
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;

      .bar-left {
        display: flex;
        align-items: center;
        .collapse-i {
          margin-right: 10px;
          font-size: 18px;
          cursor: pointer;
        }
      }

      .top-userinfo {
        display: flex;
        justify-content: center;
        align-items: center;
        .item {
          line-height: 30px;
          margin-top: 6px;
        }
        .bellicon {
          font-size: 20px;
          margin-right: 15px;
        }
        .userinfo-name {
          font-size: 18px;
          cursor: pointer;
          color: #409eff;
        }
        .el-badge__content.is-fixed.is-dot {
          right: 19px;
        }
      }
    }
    .wrapper {
      background: #eef0f3;
      padding: 20px;
      // 因为设置了盒模型的类型为 border-box，所以不用再减去 padding 的值
      height: calc(100vh - 50px);
      // background-color: #fff;
      .main-page {
        background-color: #fff;
        height: 100%;
      }
    }
  }
}
</style>
