<template>
  <div class="login-main">
    <div class="login-modal">
      <h1 class="login-title">后台管理系统</h1>
      <el-form :model="user" :rules="rules" ref="ruleForm" status-icon>
        <el-form-item prop="userName">
          <el-input
            v-model="user.userName"
            :prefix-icon="User"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="user.passWord"
            placeholder="请输入密码"
            :prefix-icon="View"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="loginHandler"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
// 按需引入图标，动态绑定到 input 表单上
import { User, View } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import publicFn from "@/utils/publicFn";
import storage from "@/utils/storage";

// 定义一些表单数据，再双向绑定上去
// reactive: 让对象变成响应式
const user = reactive({
  userName: "",
  passWord: "",
});

// 定义一些校验规则
const rules = reactive({
  userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
  passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const ruleForm = ref("ruleForm");

const { proxy } = getCurrentInstance();

const router = useRouter();
const store = useStore();

function loginHandler() {
  // this.refs['ruleForm'] 获取组件 DOM
  // validate 表单校验时触发，校验表单是否有效
  ruleForm.value.validate(async (valid) => {
    if (valid) {
      // 全局属性要通过 proxy 来取
      const res = await proxy.$api.login({
        userName: user.userName,
        userPwd: user.passWord,
      });
      // 保存登录状态到 Vuex 中
      store.commit("saveUserInfo", res);
      await loadAsyncRoutes();
      router.replace("/");
    } else {
      return false;
    }
  });
}

// 添加动态路由
async function loadAsyncRoutes() {
  try {
    const userInfo = storage.getItem("userInfo") || {};
    if (userInfo.token) {
      // 再请求一份，以防篡改
      const { menuList } = await proxy.$api.getPermissonMenuList();
      const routes = publicFn.gennerateRoutes(menuList);
      routes.map((route) => {
        router.addRoute("home", route);
      });
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<script>
export default {
  name: "LoginPage",
};
</script>
<style lang="scss" scoped>
.login-main {
  background-color: #f8fcff;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    box-shadow: 0 0 14px 7px #c7c9cb4d;
    .login-title {
      text-align: center;
      font-size: 26px;
      font-weight: 400;
      margin-bottom: 30px;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
