<template>
  <!-- 订单管理页面容器 -->
  <div class="admin-orders-container">
    <el-card>
      <!-- 页面标题 -->
      <h2>订单管理</h2>
      <!-- 返回按钮 -->
      <el-button @click="$router.back()">返回</el-button>
      <!-- 订单列表表格 -->
      <el-table :data="orders" style="margin-top: 20px">
        <!-- 用户列 -->
        <el-table-column prop="userName" label="用户" />
        <!-- 婚纱名称列 -->
        <el-table-column prop="dressName" label="婚纱名称" />
        <!-- 价格列 -->
        <el-table-column prop="price" label="价格" />
        <!-- 状态列，使用自定义模板 -->
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <!-- 根据订单状态显示不同颜色的标签，1为已购买（绿色），2为已退货（灰色） -->
            <el-tag :type="row.status === 1 ? 'success' : 'info'">
              {{ row.status === 1 ? '已购买' : '已退货' }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 退货原因列 -->
        <el-table-column prop="returnReason" label="退货原因" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
// 导入 Vue 的响应式和生命周期钩子
import { ref, onMounted } from 'vue'
// 导入获取所有订单的 API 接口
import { listAllOrders } from '@/api/admin'

// 创建订单列表的响应式引用
const orders = ref([])

// 组件挂载时加载所有订单数据
onMounted(async () => {
  orders.value = await listAllOrders()
})
</script>

<style scoped>
/* 订单管理容器内边距 */
.admin-orders-container {
  padding: 20px;
}
</style>
