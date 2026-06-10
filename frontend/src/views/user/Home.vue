<template>
  <!-- 用户主页容器 -->
  <div class="home-container">
    <el-card>
      <!-- 欢迎标题，显示用户名 -->
      <h2>欢迎，{{ user.username }}</h2>
      <!-- 退出登录按钮，右浮动 -->
      <el-button @click="logout" type="danger" style="float: right">退出登录</el-button>
      <!-- 清除浮动，添加顶部间距 -->
      <div style="clear: both; margin-top: 20px">
        <!-- 栅格行布局，列间距20px -->
        <el-row :gutter="20">
          <!-- 浏览婚纱菜单卡片，占据6列（总共24列） -->
          <el-col :span="6">
            <el-card @click="$router.push('/dress/list')" class="menu-card">
              <h3>浏览婚纱</h3>
            </el-card>
          </el-col>
          <!-- 婚纱订单菜单卡片 -->
          <el-col :span="6">
            <el-card @click="$router.push('/user/orders')" class="menu-card">
              <h3>婚纱订单</h3>
            </el-card>
          </el-col>
          <!-- 浏览样片菜单卡片 -->
          <el-col :span="6">
            <el-card @click="$router.push('/sample/list')" class="menu-card">
              <h3>浏览样片</h3>
            </el-card>
          </el-col>
          <!-- 摄影预约菜单卡片 -->
          <el-col :span="6">
            <el-card @click="$router.push('/user/appointments')" class="menu-card">
              <h3>摄影预约</h3>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
// 导入 Vue 的响应式引用函数
import { ref } from 'vue'
// 导入路由器
import { useRouter } from 'vue-router'

// 获取路由器实例
const router = useRouter()
// 从本地存储中获取用户信息，并转换为响应式引用
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

// 退出登录函数
const logout = () => {
  // 从本地存储中删除用户信息
  localStorage.removeItem('user')
  // 跳转到登录页面
  router.push('/login')
}
</script>

<style scoped>
/* 主页容器内边距 */
.home-container {
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
