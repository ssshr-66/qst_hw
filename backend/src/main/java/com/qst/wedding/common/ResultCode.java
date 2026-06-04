package com.qst.wedding.common;

import lombok.Getter;

/**
 * 返回状态码。
 */
@Getter
public enum ResultCode {

    SUCCESS(200, "成功"),
    ERROR(500, "失败");

    private final Integer code;
    private final String message;

    ResultCode(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
