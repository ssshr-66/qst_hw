package com.qst.wedding.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 婚纱订单表。status：1 已购买，2 已退货。
 */
@Data
@TableName("dress_order")
public class DressOrder {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Long userId;

    private Long dressId;

    private BigDecimal price;

    /** 订单状态 1已购买 2已退货 */
    private Integer status;

    private String returnReason;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}
