<template>
  <div class="admin-orders-container">
    <el-card>
      <h2>订单管理</h2>
      <el-button @click="$router.back()">返回</el-button>
      <el-table :data="orders" style="margin-top: 20px">
        <el-table-column prop="userName" label="用户" />
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
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { listAllOrders } from '@/api/admin'

const orders = ref([])

onMounted(async () => {
  orders.value = await listAllOrders()
})
</script>

<style scoped>
.admin-orders-container {
  padding: 20px;
}
</style>
