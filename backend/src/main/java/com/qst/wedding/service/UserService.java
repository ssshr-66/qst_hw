package com.qst.wedding.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.qst.wedding.common.BusinessException;
import com.qst.wedding.dto.LoginDTO;
import com.qst.wedding.dto.RegisterDTO;
import com.qst.wedding.entity.User;
import com.qst.wedding.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 用户业务：注册、登录。
 * 注意：课设阶段密码明文存储，生产环境应加密（如 BCrypt）。
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;

    /** 注册 */
    public void register(RegisterDTO dto) {
        Long count = userMapper.selectCount(new LambdaQueryWrapper<User>()
                .eq(User::getUsername, dto.getUsername()));
        if (count != null && count > 0) {
            throw new BusinessException("用户名已存在");
        }
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setPhone(dto.getPhone());
        user.setRole("USER");
        userMapper.insert(user);
    }

    /** 登录，返回脱敏后的用户信息 */
    public User login(LoginDTO dto) {
        User user = userMapper.selectOne(new LambdaQueryWrapper<User>()
                .eq(User::getUsername, dto.getUsername()));
        if (user == null || !user.getPassword().equals(dto.getPassword())) {
            throw new BusinessException("用户名或密码错误");
        }
        user.setPassword(null);
        return user;
    }

    /** 根据ID查用户（脱敏） */
    public User getById(Long id) {
        User user = userMapper.selectById(id);
        if (user == null) {
            throw new BusinessException("用户不存在");
        }
        user.setPassword(null);
        return user;
    }
}
