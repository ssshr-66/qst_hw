// 婚纱相关接口
// 功能：
// 1. listDress() - 获取婚纱列表
// 2. getDress(id) - 获取婚纱详情
// 3. createOrder(data) - 购买婚纱，创建订单
// 4. listMyOrders(userId) - 查询用户的订单列表
// 5. returnOrder(data) - 申请退货（修改订单状态和退货原因）
// Mock模式：操作mockDresses和mockOrders数组
// 真实模式：调用后端 /dress/* 接口