<template>
  <!-- 订单列表页面容器 -->
  <div class="orders-container">
    <el-card>
      <!-- 页面标题 -->
      <h2>婚纱订单</h2>
      <!-- 返回按钮，返回上一页 -->
      <el-button @click="$router.back()">返回</el-button>
      <!-- 订单表格，绑定订单数据 -->
      <el-table :data="orders" style="margin-top: 20px">
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
        <!-- 操作列 -->
        <el-table-column label="操作">
          <template #default="{ row }">
            <!-- 只有已购买状态的订单才显示退货按钮 -->
            <el-button v-if="row.status === 1" type="danger" size="small" @click="handleReturn(row)">
              申请退货
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
// 导入 Vue 的响应式和生命周期钩子
import { ref, onMounted } from 'vue'
// 导入订单相关的 API 接口
import { listMyOrders, returnOrder } from '@/api/dress'
// 导入消息提示和弹框组件
import { ElMessage, ElMessageBox } from 'element-plus'

// 创建订单列表的响应式引用
const orders = ref([])
// 从本地存储获取当前登录用户信息
const user = JSON.parse(localStorage.getItem('user') || '{}')

// 组件挂载时加载用户的订单列表
onMounted(async () => {
  orders.value = await listMyOrders(user.id)
})

// 处理退货请求
const handleReturn = async (order) => {
  // 弹出输入框，让用户输入退货原因
  const { value } = await ElMessageBox.prompt('请输入退货原因', '申请退货', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  // 如果没有输入退货原因，显示警告并返回
  if (!value) return ElMessage.warning('请输入退货原因')
  // 调用退货接口，传入订单ID、用户ID和退货原因
  await returnOrder({ orderId: order.id, userId: user.id, returnReason: value })
  // 显示成功提示
  ElMessage.success('退货申请成功')
  // 重新加载订单列表以显示最新状态
  orders.value = await listMyOrders(user.id)
}
</script>

<style scoped>
/* 订单容器内边距 */
.orders-container {
  padding: 20px;
}
</style>
