package com.qst.wedding.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 婚纱表。
 */
@Data
@TableName("dress")
public class Dress {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String name;

    /** 风格 */
    private String style;

    /** 尺寸 */
    private String size;

    private BigDecimal price;

    private String imageUrl;

    private Integer stock;

    private String description;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}
