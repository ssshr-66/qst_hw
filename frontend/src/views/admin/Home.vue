<template>
  <div class="admin-home-container">
    <el-card>
      <h2>管理员首页</h2>
      <el-button @click="logout" type="danger" style="float: right">退出登录</el-button>
      <div style="clear: both; margin-top: 20px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card @click="$router.push('/admin/dress')" class="menu-card">
              <h3>婚纱管理</h3>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card @click="$router.push('/admin/sample')" class="menu-card">
              <h3>样片管理</h3>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card @click="$router.push('/admin/orders')" class="menu-card">
              <h3>订单管理</h3>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card @click="$router.push('/admin/appointments')" class="menu-card">
              <h3>预约管理</h3>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
.admin-home-container {
  padding: 20px;
}
.menu-card {
  cursor: pointer;
  text-align: center;
}
.menu-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
}
</style>
