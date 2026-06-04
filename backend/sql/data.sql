-- 婚纱影楼管理系统 初始化种子数据
-- 执行：mysql -uroot -p wedding_studio < data.sql
-- 注意：课设阶段密码为明文存储。

USE wedding_studio;

-- 用户：1 个管理员 + 1 个普通用户
INSERT INTO user (username, password, phone, role) VALUES
('admin', 'admin123', '13900000000', 'ADMIN'),
('zhangsan', '123456', '13800000000', 'USER');

-- 婚纱
INSERT INTO dress (name, style, size, price, image_url, stock, description) VALUES
('白色公主婚纱', '公主风', 'M', 999.00, 'https://picsum.photos/seed/dress1/400/500', 10, '经典白色公主风婚纱，蓬蓬裙摆，适合教堂婚礼'),
('简约鱼尾婚纱', '修身风', 'S', 1299.00, 'https://picsum.photos/seed/dress2/400/500', 5, '修身鱼尾设计，凸显身材曲线'),
('复古蕾丝婚纱', '复古风', 'L', 1599.00, 'https://picsum.photos/seed/dress3/400/500', 8, '法式复古蕾丝，长袖设计，优雅大气'),
('森系仙女婚纱', '森系', 'M', 899.00, 'https://picsum.photos/seed/dress4/400/500', 12, '轻盈雪纺，森系仙女风，适合户外婚礼');

-- 样片套餐
INSERT INTO sample (name, style, price, image_url, description) VALUES
('海边浪漫套餐', '海景风', 1299.00, 'https://picsum.photos/seed/sample1/400/300', '三亚海边外景拍摄，含 2 套服装、精修 20 张'),
('复古胶片套餐', '复古风', 1599.00, 'https://picsum.photos/seed/sample2/400/300', '胶片质感，复古街景，含 3 套服装、精修 30 张'),
('室内梦幻套餐', '梦幻风', 999.00, 'https://picsum.photos/seed/sample3/400/300', '室内棚拍，梦幻布景，含 2 套服装、精修 15 张'),
('森系自然套餐', '森系', 1399.00, 'https://picsum.photos/seed/sample4/400/300', '森林公园外景，自然光拍摄，含 2 套服装、精修 25 张');
