package com.qst.wedding.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/** 申请退货请求 */
@Data
public class OrderReturnDTO {

    @NotNull(message = "订单ID不能为空")
    private Long orderId;

    @NotNull(message = "用户ID不能为空")
    private Long userId;

    @NotBlank(message = "退货原因不能为空")
    private String returnReason;
}
