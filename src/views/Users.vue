<template>
  <div class="users-main">
    <!-- 头部查询功能区域 start -->
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
          <el-button type="primary" @click="onSearchHandler">查询</el-button>
          <el-button @click="onResetHandler('selectForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 头部查询功能区域 end -->

    <!-- 表格区域 start -->
    <div class="users-bottom">
      <div class="users-bottom-top">
        <el-button type="primary" @click="addUserHandler" v-permisson="'user-create'">新增用户</el-button>
        <el-button type="danger" @click="handlePatch" v-permisson="'user-deletes'">批量删除</el-button>
      </div>
      <div class="users-bottom-table">
        <!-- 展示用户信息 -->
        <el-table :data="userData" @select="selectHandler">
          <el-table-column type="selection" width="55" />
          <el-table-column
            v-for="item in columList"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            show-overflow-tooltip
            :formatter="item.formatter"
          />
          <!-- 操作 -->
          <el-table-column label="操作" width="180" align="center">
            <!-- scope.row 可以获取单条数据，作用域插槽 -->
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row)" v-permisson="'user-edit'">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDel(scope.row)"
                v-permisson="'user-delete'"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pager.pageSize"
          :total="pager.total"
          class="pagination"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>

      <!-- 新增用户弹窗 -->
      <el-dialog title="新增用户" 
      v-model="userDialogVisible"
      @close="dialogCancelHandler" 
      width="30%">
        <el-form
          :model="userForm"
          :rules="rules"
          ref="userRuleForm"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input
              v-model="userForm.userName"
              placeholder="请输入用户名称"
              :disabled="action == 'edit'"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="userEmail">
            <el-input
              v-model="userForm.userEmail"
              placeholder="请输入用户邮箱"
              :disabled="action == 'edit'"
            >
              <template #append>@qq.com</template>
            </el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input
              v-model="userForm.mobile"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="岗位" prop="job">
            <el-input
              v-model="userForm.job"
              placeholder="请输入岗位"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select v-model="userForm.state" placeholder="请选择">
              <el-option label="在职" :value="1"></el-option>
              <el-option label="离职" :value="2"></el-option>
              <el-option label="试用期" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统角色" prop="roleList">
            <el-select
              v-model="userForm.roleList"
              placeholder="请选择"
              multiple
            >
              <el-option
                v-for="item in rolesNameList"
                :key="item._id"
                :label="item.roleName"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属部门" prop="deptId">
            <el-cascader
              :options="deptList"
              :props="{
                checkStrictly: true,
                value: '_id',
                label: 'deptName',
                children: 'children',
              }"
              clearable
              v-model="userForm.deptId"
              placeholder="请选择"
            >
            </el-cascader>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogCancelHandler">取 消</el-button>
            <el-button type="primary" @click="dialogSubmitHandler"
              >确 定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
    <!-- 表格区域 end -->
  </div>
</template>
<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import publicFn from "../utils/publicFn";

const { proxy } = getCurrentInstance();
// 头部查询功能表单对象
const selectData = reactive({
  state: 1,
});
// 获取查询表单组件的引用
const selectForm = ref(null);
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
    // 对表格字段格式化
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
      return publicFn.formateDate(new Date(value));
    },
  },
  {
    prop: "lastLoginTime",
    label: "最后登录时间",
    formatter(row, col, value) {
      return publicFn.formateDate(new Date(value));
    },
  },
]);

// 动态表格数据对象
const userData = ref([]);
// 分页对象
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});

// 当前选中的用户对象
const checkedUserIds = ref([]);
// 新增用户弹窗显示开关
const userDialogVisible = ref(false);
// 新增用户表单对象
const userForm = reactive({
  state: 3,
});
// 操作类型
const action = ref('add')
// 添加用户表单验证规则
const rules = reactive({
  userName: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  userEmail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  mobile: [
    {
      pattern: /1\d{10}/,
      message: "请输入正确的手机号格式",
      trigger: "blur",
    },
  ],
  deptId: [{ required: true, message: "请选择", trigger: "blur" }],
});
//角色名称列表
const rolesNameList = ref([]);
//部门列表
const deptList = ref([]);

// mounted 钩子函数
onMounted(() => {
  getUserList();
  getRolesRequest();
  getDeptListRequest();
});
// methods
/**
 * 网络请求方法
 */
const getUserList = async () => {
  // 顶部查询表单的参数，分页的参数，一起发送给后端
  let params = { ...selectData, ...pager };
  try {
    const { list, page } = await proxy.$api.getUserList(params);
    userData.value = list;
    pager.total = page.total;
  } catch (error) {
    console.log(error);
  }
};

// 获取角色名称列表
const getRolesRequest = async () => {
  const { list } = await proxy.$api.getRolesNameList();
  rolesNameList.value = list;
  // console.log(rolesNameList.value);
};

// 获取部门列表
const getDeptListRequest = async () => {
  const res = await proxy.$api.getDeptList();
  deptList.value = res;
  // console.log(deptList.value);
};

/**
 * 事件处理方法
 */
// 删除单个用户
const handleDel = async (row) => {
  await proxy.$api.userDel({
    userIds: [row.userId],
  });
  proxy.$message.success("删除成功");
  getUserList();
};

// 批量删除
const handlePatch = async () => {
  if (checkedUserIds.value.length === 0) {
    proxy.$message.error("请选择要删除的用户");
  }
  const res = await proxy.$api.userDel({
    userIds: [...checkedUserIds.value],
  });

  if (res.nModified > 0) {
    proxy.$message.success("删除成功");
    getUserList();
  } else {
    proxy.$message.success("删除失败");
  }
};

// 查询事件
const onSearchHandler = () => {
  getUserList();
};
// 重置事件
const onResetHandler = (form) => {
  // selectForm.value.resetFields();
  proxy.$refs[form].resetFields();
};

// 分页事件处理
const handleCurrentChange = (val) => {
  // 修改页码
  pager.pageNum = val;
  // 请求这页的数据
  getUserList();
};

//表格选中事件
const selectHandler = (selection, row) => {
  var arr = [];
  selection.map((item) => {
    arr.push(item.userId);
  });
  checkedUserIds.value = arr;
};

// 添加用户按钮事件
const addUserHandler = () => {
  // 改变 ref 对象的值，要赋值给属性 value
  action.value = "add";
  userDialogVisible.value = true;
};

// 新增用户弹窗取消按钮事件
const dialogCancelHandler = () => {
  userDialogVisible.value = false;
  onResetHandler("userRuleForm");
};

// 新增用户弹窗确定按钮事件
const dialogSubmitHandler = () => {
  proxy.$refs["userRuleForm"].validate(async (valid) => {
    if (valid) {
      // 尽量不要直接操作 userForm，因为是响应式的
      let params = { ...userForm };
      if (params.userEmail) {
        params.userEmail += "@qq.com";
      }
      params.action = action.value;
      await proxy.$api.postUserC_U(params);
      if (params.action === "add") {
        proxy.$message.success("添加用户信息成功");
      } else {
        proxy.$message.success("修改用户信息成功");
      }
      userDialogVisible.value = false;
      // 新增或编辑完成后清空对话框
      onResetHandler("userRuleForm");
      getUserList();
    } else {
      proxy.$message.error("您填写的信息不符合规则，请重新输入");
      return false;
    }
  });
};

// 编辑用户信息
const handleEdit = async (row) => {
  action.value = 'edit'
  // 使弹窗可见
  userDialogVisible.value = true
  // 等弹框的 DOM 更新完了（状态确定，渲染完成）再执行回调，不然操作不了 DOM
  proxy.$nextTick(() => {
    // 对 row 做浅拷贝，也就是一层深拷贝。这样修改 userForm 不会影响到 row 
    Object.assign(userForm, row)
  })
}
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
        // text-align: center;
        display: flex;
        justify-content: right;
      }
    }
  }
}
</style>
