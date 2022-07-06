package com.mnu.sosm.utils;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * 用于json格式的数据返回
 * 
 *
 */
@Data
@AllArgsConstructor
public class JsonModel {
    private boolean success;

    private String msg;

    private int code;//错误码

    private Object obj;

    public JsonModel() {

    }

    public JsonModel(boolean success, String msg, Object obj) {
        this.success = success;
        this.msg = msg;
        this.obj = obj;

    }

    public JsonModel(boolean success, Object obj) {
        this.success = success;
        this.obj = obj;

    }

    public JsonModel(boolean success, String msg) {
        this.success = success;
        this.msg = msg;
    }

    public JsonModel(boolean success) {
        this.success = success;
    }

}
