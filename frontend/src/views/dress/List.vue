<template>
  <div class="dress-list-container">
    <el-card>
      <h2>婚纱列表</h2>
      <el-button @click="$router.back()">返回</el-button>
      <el-row :gutter="20" style="margin-top: 20px">
        <el-col :span="6" v-for="dress in list" :key="dress.id">
          <el-card @click="$router.push(`/dress/detail/${dress.id}`)" class="dress-card">
            <img :src="dress.imageUrl" style="width: 100%" />
            <h3>{{ dress.name }}</h3>
            <p>{{ dress.description }}</p>
            <p style="color: red; font-weight: bold">¥{{ dress.price }}</p>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { listDress } from '@/api/dress'

const list = ref([])

onMounted(async () => {
  list.value = await listDress()
})
</script>

<style scoped>
.dress-list-container {
  padding: 20px;
}
.dress-card {
  cursor: pointer;
  margin-bottom: 20px;
}
.dress-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
}
</style>
