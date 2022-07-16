<template>
  <div class="basic-layout">
    <div class="nav-side"></div>
    <div class="content-right">
      <div class="nav-top">
        <div class="bread">面包屑</div>
        <div class="user">用户</div>
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

export default {
  name: "HomePage",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    // request({
    //   'url': '/login'
    // }).then(res => console.log(res))
  },
  mounted() {},
  unmounted() {},
  methods: {},
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
  }
  .content-right {
    margin-left: 200px;
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
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
