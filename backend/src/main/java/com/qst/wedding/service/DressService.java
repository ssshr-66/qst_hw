package com.qst.wedding.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.qst.wedding.common.BusinessException;
import com.qst.wedding.dto.OrderCreateDTO;
import com.qst.wedding.dto.OrderReturnDTO;
import com.qst.wedding.entity.Dress;
import com.qst.wedding.entity.DressOrder;
import com.qst.wedding.mapper.DressMapper;
import com.qst.wedding.mapper.DressOrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 婚纱业务：列表、详情、购买、订单、退货，以及管理员维护。
 */
@Service
@RequiredArgsConstructor
public class DressService {

    private final DressMapper dressMapper;
    private final DressOrderMapper dressOrderMapper;

    /** 订单状态 */
    private static final int STATUS_BOUGHT = 1;
    private static final int STATUS_RETURNED = 2;

    /* ============ 用户端 ============ */

    public List<Dress> list() {
        return dressMapper.selectList(new LambdaQueryWrapper<Dress>().orderByDesc(Dress::getId));
    }

    public Dress getById(Long id) {
        Dress dress = dressMapper.selectById(id);
        if (dress == null) {
            throw new BusinessException("婚纱信息不存在");
        }
        return dress;
    }

    /** 购买：校验库存，扣减库存，生成已购买订单 */
    @Transactional(rollbackFor = Exception.class)
    public DressOrder createOrder(OrderCreateDTO dto) {
        Dress dress = dressMapper.selectById(dto.getDressId());
        if (dress == null) {
            throw new BusinessException("婚纱信息不存在");
        }
        if (dress.getStock() == null || dress.getStock() <= 0) {
            throw new BusinessException("当前婚纱库存不足");
        }
        dress.setStock(dress.getStock() - 1);
        dressMapper.updateById(dress);

        DressOrder order = new DressOrder();
        order.setUserId(dto.getUserId());
        order.setDressId(dress.getId());
        order.setPrice(dress.getPrice());
        order.setStatus(STATUS_BOUGHT);
        dressOrderMapper.insert(order);
        return order;
    }

    /** 我的订单 */
    public List<DressOrder> myOrders(Long userId) {
        return dressOrderMapper.selectList(new LambdaQueryWrapper<DressOrder>()
                .eq(DressOrder::getUserId, userId)
                .orderByDesc(DressOrder::getId));
    }

    /** 退货：校验归属与状态，回补库存，状态改为已退货 */
    @Transactional(rollbackFor = Exception.class)
    public void returnOrder(OrderReturnDTO dto) {
        DressOrder order = dressOrderMapper.selectById(dto.getOrderId());
        if (order == null) {
            throw new BusinessException("订单不存在");
        }
        if (!order.getUserId().equals(dto.getUserId())) {
            throw new BusinessException("无权限操作该数据");
        }
        if (order.getStatus() != STATUS_BOUGHT) {
            throw new BusinessException("当前订单不能退货");
        }
        order.setStatus(STATUS_RETURNED);
        order.setReturnReason(dto.getReturnReason());
        dressOrderMapper.updateById(order);

        // 回补库存
        Dress dress = dressMapper.selectById(order.getDressId());
        if (dress != null) {
            dress.setStock((dress.getStock() == null ? 0 : dress.getStock()) + 1);
            dressMapper.updateById(dress);
        }
    }

    /* ============ 管理员端 ============ */

    public List<DressOrder> listAllOrders() {
        return dressOrderMapper.selectList(new LambdaQueryWrapper<DressOrder>()
                .orderByDesc(DressOrder::getId));
    }

    public void add(Dress dress) {
        dress.setId(null);
        dressMapper.insert(dress);
    }

    public void update(Dress dress) {
        if (dress.getId() == null || dressMapper.selectById(dress.getId()) == null) {
            throw new BusinessException("婚纱信息不存在");
        }
        dressMapper.updateById(dress);
    }

    public void delete(Long id) {
        dressMapper.deleteById(id);
    }
}
