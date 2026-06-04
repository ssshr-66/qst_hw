package com.qst.wedding.common;

/**
 * 业务异常。抛出后由全局异常处理器统一转换为 code=500 的返回体。
 */
public class BusinessException extends RuntimeException {

    public BusinessException(String message) {
        super(message);
    }
}
