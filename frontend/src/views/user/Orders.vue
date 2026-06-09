<template>
  <div class="orders-container">
    <el-card>
      <h2>我的订单</h2>
      <el-button @click="$router.back()">返回</el-button>
      <el-table :data="orders" style="margin-top: 20px">
        <el-table-column prop="dressName" label="婚纱名称" />
        <el-table-column prop="price" label="价格" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'">
              {{ row.status === 1 ? '已购买' : '已退货' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="returnReason" label="退货原因" />
        <el-table-column label="操作">
          <template #default="{ row }">
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
import { ref, onMounted } from 'vue'
import { listMyOrders, returnOrder } from '@/api/dress'
import { ElMessage, ElMessageBox } from 'element-plus'

const orders = ref([])
const user = JSON.parse(localStorage.getItem('user') || '{}')

onMounted(async () => {
  orders.value = await listMyOrders(user.id)
})

const handleReturn = async (order) => {
  const { value } = await ElMessageBox.prompt('请输入退货原因', '申请退货', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  if (!value) return ElMessage.warning('请输入退货原因')
  await returnOrder({ orderId: order.id, userId: user.id, returnReason: value })
  ElMessage.success('退货申请成功')
  orders.value = await listMyOrders(user.id)
}
</script>

<style scoped>
.orders-container {
  padding: 20px;
}
</style>
