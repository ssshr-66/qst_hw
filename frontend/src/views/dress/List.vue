<template>
  <!-- 婚纱列表页面容器 -->
  <div class="dress-list-container">
    <el-card>
      <!-- 页面标题 -->
      <h2>婚纱列表</h2>
      <!-- 返回按钮 -->
      <el-button @click="$router.back()">返回</el-button>
      <!-- 栅格布局，列间距20px -->
      <el-row :gutter="20" style="margin-top: 20px">
        <!-- 遍历婚纱列表，每个婚纱占6列 -->
        <el-col :span="6" v-for="dress in list" :key="dress.id">
          <!-- 婚纱卡片，点击跳转到详情页 -->
          <el-card @click="$router.push(`/dress/detail/${dress.id}`)" class="dress-card">
            <!-- 婚纱图片，宽度100% -->
            <img :src="dress.imageUrl" style="width: 100%" />
            <!-- 婚纱名称 -->
            <h3>{{ dress.name }}</h3>
            <!-- 婚纱描述 -->
            <p>{{ dress.description }}</p>
            <!-- 婚纱价格，红色加粗显示 -->
            <p style="color: red; font-weight: bold">¥{{ dress.price }}</p>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
// 导入 Vue 的响应式和生命周期钩子
import { ref, onMounted } from 'vue'
// 导入获取婚纱列表的 API 接口
import { listDress } from '@/api/dress'

// 创建婚纱列表的响应式引用
const list = ref([])

// 组件挂载时加载婚纱列表数据
onMounted(async () => {
  list.value = await listDress()
})
</script>

<style scoped>
/* 列表容器内边距 */
.dress-list-container {
  padding: 20px;
}
/* 婚纱卡片样式，鼠标指针变为手型，底部留白 */
.dress-card {
  cursor: pointer;
  margin-bottom: 20px;
}
/* 婚纱卡片悬停效果，增强阴影 */
.dress-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
}
</style>
