package com.qst.wedding.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

/** 预约操作请求（报道 / 取片支付，携带归属用户ID用于权限校验） */
@Data
public class AppointmentActionDTO {

    @NotNull(message = "预约ID不能为空")
    private Long appointmentId;

    @NotNull(message = "用户ID不能为空")
    private Long userId;
}
