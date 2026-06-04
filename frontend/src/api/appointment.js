// 预约相关接口
// 功能：
// 1. createAppointment(data) - 创建预约（预约拍摄）
// 2. listMyAppointments(userId) - 查询用户的预约列表
// 3. checkin(data) - 到店报道（状态变为已报道）
// 4. finish(data) - 确认拍摄完成（管理员操作，状态变为已完成）
// 5. pay(data) - 取片支付（状态变为已取片）
// Mock模式：操作mockAppointments数组
// 真实模式：调用后端 /appointment/* 接口
