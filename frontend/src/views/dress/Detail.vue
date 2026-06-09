<template>
  <div class="dress-detail-container">
    <el-card v-if="dress">
      <el-button @click="$router.back()">返回</el-button>
      <el-row :gutter="20" style="margin-top: 20px">
        <el-col :span="12">
          <img :src="dress.imageUrl" style="width: 100%" />
        </el-col>
        <el-col :span="12">
          <h2>{{ dress.name }}</h2>
          <p>{{ dress.description }}</p>
          <p style="color: red; font-size: 24px; font-weight: bold">¥{{ dress.price }}</p>
          <p>库存：{{ dress.stock }}</p>
          <el-button type="primary" @click="handleBuy" :disabled="dress.stock === 0">立即购买</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDress, createOrder } from '@/api/dress'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const dress = ref(null)

onMounted(async () => {
  dress.value = await getDress(route.params.id)
})

const handleBuy = async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!user.id) {
    ElMessage.warning('请先登录')
    return router.push('/login')
  }
  await createOrder({ userId: user.id, dressId: dress.value.id })
  ElMessage.success('购买成功')
  router.push('/user/orders')
}
</script>

<style scoped>
.dress-detail-container {
  padding: 20px;
}
</style>
