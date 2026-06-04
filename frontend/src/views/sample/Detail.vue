<template>
  <!-- 样片套餐详情页（用户端） -->
  <!-- 功能：
       1. 根据路由参数id调用getSample()获取样片套餐详情
       2. 展示样片大图、标题、描述、价格
       3. 提供预约表单（日期时间选择器）
       4. 点击预约：检查登录状态、验证预约时间、调用createAppointment()创建预约、跳转到预约页
       5. 提供返回按钮
  -->
</template>

<script setup>
// 导入Vue、路由、样片详情和创建预约接口、消息提示
// 从路由参数获取样片id
// 定义响应式数据sample存储样片详情
// 定义表单数据form（appointmentTime）
// onMounted钩子中加载样片详情
// 实现handleAppointment方法：验证登录、验证时间、创建预约、跳转
</script>

<style scoped>
/* 详情页布局样式 */
</style>