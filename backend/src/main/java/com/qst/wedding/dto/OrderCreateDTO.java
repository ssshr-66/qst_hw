package com.qst.wedding.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

/** 创建婚纱订单请求 */
@Data
public class OrderCreateDTO {

    @NotNull(message = "用户ID不能为空")
    private Long userId;

    @NotNull(message = "婚纱ID不能为空")
    private Long dressId;
}
