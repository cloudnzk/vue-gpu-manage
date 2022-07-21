<template>
  <div class="users-main">
    <!-- 头部查询功能区域 -->
    <div class="users-top">
      <el-form :inline="true" :model="selectData" ref="selectForm">
        <el-form-item label="用户ID" prop="userId">
          <el-input
            v-model="selectData.userId"
            type="Number"
            placeholder="请输入用户ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="selectData.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户状态" prop="state">
          <el-select v-model="selectData.state" placeholder="请选择">
            <el-option label="所有" :value="0"></el-option>
            <el-option label="在职" :value="1"></el-option>
            <el-option label="离职" :value="2"></el-option>
            <el-option label="试用期" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <div class="users-bottom">
      <div class="users-bottom-top">
        <el-button type="primary">新增用户</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
      <div class="users-bottom-table">
        <el-table :data="userData">
          <el-table-column type="selection" width="55" />
          <el-table-column
            v-for="item in columList"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
          />
          <!-- 操作 -->
          <el-table-column label="操作" width="180" align="center">
            <template #default="scope">
              <el-button
                size="mini"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";

// 头部查询功能表单对象
const selectData = reactive({
  state: 1,
});

// 动态表格数据对象
var userData = ref([]);
// 动态表格字段格式
const columList = reactive([
  {
    prop: "userId",
    label: "用户ID",
  },
  {
    prop: "userName",
    label: "用户名",
  },
  {
    prop: "userEmail",
    label: "用户邮箱",
  },
  {
    prop: "role",
    label: "用户角色",
    formatter(row, col, value) {
      return {
        0: "管理员",
        1: "普通用户",
      }[value];
    },
  },
  {
    prop: "state",
    label: "用户状态",
    formatter(row, col, value) {
      return {
        1: "在职",
        2: "离职",
        3: "试用期",
      }[value];
    },
  },
  {
    prop: "createTime",
    label: "注册时间",
    formatter(row, col, value) {
      //   return publicFn.formateDate(new Date(value));
      return new Date(value);
    },
  },
  {
    prop: "lastLoginTime",
    label: "最后登录时间",
    formatter(row, col, value) {
      //   return publicFn.formateDate(new Date(value));
      return new Date(value);
    },
  },
]);

// mounted 钩子函数
onMounted(() => {});
</script>

<script>
export default {
  name: "UsersPage",
};
</script>

<style lang="scss" scoped>
.users-main {
  // background-color: #fff;
  height: 100%;
  .users-top {
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }
  .users-bottom {
    background-color: #fff;
    border-radius: 5px 5px 0 0;
    margin-top: 10px;
    .el-select {
      width: 100%;
    }
    :deep(.el-cascader) {
      width: 100%;
    }
    .users-bottom-top {
      padding: 20px;
      border-bottom: 1px solid #ececec;
    }
    .users-bottom-table {
      .pagination {
        padding: 10px;
        text-align: right;
      }
    }
  }
}
</style>
