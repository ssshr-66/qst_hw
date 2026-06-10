<template>
  <!-- 婚纱管理页面容器 -->
  <div class="admin-dress-container">
    <el-card>
      <!-- 页面标题 -->
      <h2>婚纱管理</h2>
      <!-- 返回按钮 -->
      <el-button @click="$router.back()">返回</el-button>
      <!-- 添加婚纱按钮，点击打开对话框 -->
      <el-button type="primary" @click="showDialog()">添加婚纱</el-button>
      <!-- 婚纱列表表格 -->
      <el-table :data="list" style="margin-top: 20px">
        <!-- 名称列 -->
        <el-table-column prop="name" label="名称" />
        <!-- 价格列 -->
        <el-table-column prop="price" label="价格" />
        <!-- 库存列 -->
        <el-table-column prop="stock" label="库存" />
        <!-- 操作列 -->
        <el-table-column label="操作">
          <template #default="{ row }">
            <!-- 编辑按钮，点击打开对话框并填充数据 -->
            <el-button size="small" @click="showDialog(row)">编辑</el-button>
            <!-- 删除按钮 -->
            <el-button size="small" type="danger" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加/编辑婚纱对话框，根据表单是否有ID判断标题 -->
    <el-dialog v-model="dialogVisible" :title="form.id ? '编辑婚纱' : '添加婚纱'">
      <!-- 表单，绑定表单数据 -->
      <el-form :model="form">
        <!-- 名称输入框 -->
        <el-form-item label="名称"><el-input v-model="form.name" /></el-form-item>
        <!-- 描述输入框 -->
        <el-form-item label="描述"><el-input v-model="form.description" /></el-form-item>
        <!-- 价格数字输入框 -->
        <el-form-item label="价格"><el-input-number v-model="form.price" /></el-form-item>
        <!-- 库存数字输入框 -->
        <el-form-item label="库存"><el-input-number v-model="form.stock" /></el-form-item>
        <!-- 图片URL输入框 -->
        <el-form-item label="图片URL"><el-input v-model="form.imageUrl" /></el-form-item>
      </el-form>
      <!-- 对话框底部按钮 -->
      <template #footer>
        <!-- 取消按钮，关闭对话框 -->
        <el-button @click="dialogVisible = false">取消</el-button>
        <!-- 保存按钮，提交表单 -->
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
// 导入 Vue 的响应式、reactive 和生命周期钩子
import { ref, reactive, onMounted } from 'vue'
// 导入婚纱管理相关的 API 接口
import { listAllDress, addDress, updateDress, deleteDress } from '@/api/admin'
// 导入消息提示和确认对话框组件
import { ElMessage, ElMessageBox } from 'element-plus'

// 创建婚纱列表的响应式引用
const list = ref([])
// 控制对话框显示/隐藏的响应式引用
const dialogVisible = ref(false)
// 创建表单数据的响应式对象
const form = reactive({ id: null, name: '', description: '', price: 0, stock: 0, imageUrl: '' })

// 组件挂载时加载婚纱列表
onMounted(async () => { list.value = await listAllDress() })

// 显示添加/编辑对话框
const showDialog = (row) => {
  // 如果传入了行数据，说明是编辑，将数据填充到表单
  if (row) Object.assign(form, row)
  // 否则是添加，重置表单为空
  else Object.assign(form, { id: null, name: '', description: '', price: 0, stock: 0, imageUrl: '' })
  // 打开对话框
  dialogVisible.value = true
}

// 保存婚纱（添加或编辑）
const handleSave = async () => {
  // 根据表单是否有ID判断是更新还是添加
  await (form.id ? updateDress(form) : addDress(form))
  // 显示成功提示
  ElMessage.success('操作成功')
  // 关闭对话框
  dialogVisible.value = false
  // 重新加载列表
  list.value = await listAllDress()
}

// 删除婚纱
const handleDelete = async (id) => {
  // 弹出确认对话框
  await ElMessageBox.confirm('确定删除？', '提示')
  // 调用删除接口
  await deleteDress(id)
  // 显示成功提示
  ElMessage.success('删除成功')
  // 重新加载列表
  list.value = await listAllDress()
}
</script>

<style scoped>
/* 管理页面容器内边距 */
.admin-dress-container { padding: 20px; }
</style>
