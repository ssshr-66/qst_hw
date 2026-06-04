package com.qst.wedding.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

/** 管理员确认拍摄完成请求 */
@Data
public class AppointmentFinishDTO {

    @NotNull(message = "预约ID不能为空")
    private Long appointmentId;

    @NotNull(message = "管理员ID不能为空")
    private Long adminId;
}
