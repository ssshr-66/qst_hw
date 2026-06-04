package com.qst.wedding.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 样片表。
 */
@Data
@TableName("sample")
public class Sample {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String name;

    private String style;

    /** 拍摄价格 */
    private BigDecimal price;

    private String imageUrl;

    private String description;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}
