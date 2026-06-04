package com.qst.wedding.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 拍摄预约表。status：0已预约 1已报道 2已拍摄完成 3已支付待取片。
 */
@Data
@TableName("appointment")
public class Appointment {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Long userId;

    private Long sampleId;

    /** 预约时间 */
    private LocalDateTime appointmentTime;

    /** 报道时间 */
    private LocalDateTime reportTime;

    /** 拍摄完成时间 */
    private LocalDateTime finishTime;

    /** 支付时间 */
    private LocalDateTime payTime;

    /** 状态 0已预约 1已报道 2已拍摄完成 3已支付待取片 */
    private Integer status;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}
