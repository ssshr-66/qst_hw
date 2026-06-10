<template>
  <!-- 婚纱详情页面容器 -->
  <div class="dress-detail-container">
    <!-- 只有当婚纱数据加载完成后才显示卡片 -->
    <el-card v-if="dress">
      <!-- 返回按钮 -->
      <el-button @click="$router.back()">返回</el-button>
      <!-- 栅格布局，列间距20px -->
      <el-row :gutter="20" style="margin-top: 20px">
        <!-- 左侧列，占12列，显示婚纱图片 -->
        <el-col :span="12">
          <img :src="dress.imageUrl" style="width: 100%" />
        </el-col>
        <!-- 右侧列，占12列，显示婚纱详细信息 -->
        <el-col :span="12">
          <!-- 婚纱名称 -->
          <h2>{{ dress.name }}</h2>
          <!-- 婚纱描述 -->
          <p>{{ dress.description }}</p>
          <!-- 婚纱价格，红色大号加粗显示 -->
          <p style="color: red; font-size: 24px; font-weight: bold">¥{{ dress.price }}</p>
          <!-- 库存数量 -->
          <p>库存：{{ dress.stock }}</p>
          <!-- 立即购买按钮，库存为0时禁用 -->
          <el-button type="primary" @click="handleBuy" :disabled="dress.stock === 0">立即购买</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
// 导入 Vue 的响应式和生命周期钩子
import { ref, onMounted } from 'vue'
// 导入路由相关函数
import { useRoute, useRouter } from 'vue-router'
// 导入婚纱相关的 API 接口
import { getDress, createOrder } from '@/api/dress'
// 导入消息提示组件
import { ElMessage } from 'element-plus'

// 获取当前路由信息，用于获取婚纱ID
const route = useRoute()
// 获取路由器实例，用于页面跳转
const router = useRouter()
// 创建婚纱详情的响应式引用
const dress = ref(null)

// 组件挂载时根据路由参数加载婚纱详情
onMounted(async () => {
  dress.value = await getDress(route.params.id)
})

// 处理购买操作
const handleBuy = async () => {
  // 从本地存储获取当前登录用户信息
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  // 如果用户未登录，提示并跳转到登录页
  if (!user.id) {
    ElMessage.warning('请先登录')
    return router.push('/login')
  }
  // 调用创建订单接口
  await createOrder({ userId: user.id, dressId: dress.value.id })
  // 显示购买成功提示
  ElMessage.success('购买成功')
  // 跳转到订单列表页面
  router.push('/user/orders')
}
</script>

<style scoped>
/* 详情容器内边距 */
.dress-detail-container {
  padding: 20px;
}
</style>
