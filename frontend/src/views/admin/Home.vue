<template>
  <!-- 管理员主页容器 -->
  <div class="admin-home-container">
    <el-card>
      <!-- 页面标题 -->
      <h2>管理员首页</h2>
      <!-- 退出登录按钮，右浮动 -->
      <el-button @click="logout" type="danger" style="float: right">退出登录</el-button>
      <!-- 清除浮动，添加顶部间距 -->
      <div style="clear: both; margin-top: 20px">
        <!-- 栅格行布局，列间距20px -->
        <el-row :gutter="20">
          <!-- 婚纱管理菜单卡片，占据6列 -->
          <el-col :span="6">
            <el-card @click="$router.push('/admin/dress')" class="menu-card">
              <h3>婚纱管理</h3>
            </el-card>
          </el-col>
          <!-- 样片管理菜单卡片 -->
          <el-col :span="6">
            <el-card @click="$router.push('/admin/sample')" class="menu-card">
              <h3>样片管理</h3>
            </el-card>
          </el-col>
          <!-- 订单管理菜单卡片 -->
          <el-col :span="6">
            <el-card @click="$router.push('/admin/orders')" class="menu-card">
              <h3>订单管理</h3>
            </el-card>
          </el-col>
          <!-- 预约管理菜单卡片 -->
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
// 导入路由器
import { useRouter } from 'vue-router'

// 获取路由器实例
const router = useRouter()

// 退出登录函数
const logout = () => {
  // 从本地存储中删除用户信息
  localStorage.removeItem('user')
  // 跳转到登录页面
  router.push('/login')
}
</script>

<style scoped>
/* 管理员主页容器内边距 */
.admin-home-container {
  padding: 20px;
}
/* 菜单卡片样式，鼠标指针变为手型 */
.menu-card {
  cursor: pointer;
  text-align: center;
}
/* 菜单卡片悬停效果，增强阴影 */
.menu-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
}
</style>
