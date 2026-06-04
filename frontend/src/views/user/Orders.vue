<template>
  <!-- 我的订单页（用户端） -->
  <!-- 功能：
       1. 页面加载时调用listMyOrders(userId)获取当前用户的订单列表
       2. 用表格展示订单信息（婚纱名称、价格、状态、退货原因）
       3. 订单状态显示：已购买（绿色）、已退货（灰色）
       4. 对于"已购买"状态的订单，提供"申请退货"按钮
       5. 点击申请退货：弹出对话框输入退货原因、调用returnOrder()、刷新列表
       6. 提供返回按钮
  -->
</template>

<script setup>
// 导入Vue、订单列表和退货接口、消息提示和对话框
// 从localStorage获取用户信息
// 定义响应式数据orders存储订单列表
// onMounted钩子中加载订单列表
// 实现handleReturn方法：弹出对话框、提交退货申请、刷新列表
</script>

<style scoped>
/* 订单页布局样式 */
</style>