<template>
  <!-- 样片管理页（管理员端） -->
  <!-- 功能：
       1. 页面加载时调用listAllSample()获取所有样片套餐
       2. 用表格展示样片列表（标题、价格）
       3. 提供"添加样片"按钮
       4. 每行提供"编辑"和"删除"按钮
       5. 添加/编辑：弹出对话框，表单包含（标题、描述、价格、图片URL）
          - 添加时调用addSample()
          - 编辑时调用updateSample()
       6. 删除：弹出确认对话框，调用deleteSample()
       7. 操作成功后刷新列表
       8. 提供返回按钮
  -->
</template>

<script setup>
// 导入Vue、管理员样片相关接口、消息提示和确认对话框
// 定义响应式数据list存储样片列表
// 定义对话框显示状态dialogVisible
// 定义表单数据form（id, title, description, price, imageUrl）
// onMounted钩子中加载样片列表
// 实现showDialog方法：显示添加/编辑对话框，编辑时填充表单数据
// 实现handleSave方法：根据form.id判断是添加还是编辑、调用相应接口、刷新列表
// 实现handleDelete方法：弹出确认对话框、调用删除接口、刷新列表
</script>

<style scoped>
/* 管理页布局样式 */
</style>