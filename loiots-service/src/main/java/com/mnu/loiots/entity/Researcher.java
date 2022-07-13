package com.mnu.loiots.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * @BelongsProject: LOIOTS
 * @BelongsPackage: com.mnu.loiots.entity
 * @Author: fenggn
 * @CreateTime: 2022-07-13  12:34
 * @Description: 科研人员信息类
 * @Version: 1.0
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "mnu_loiots_researcher")
public class Researcher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = " serial ",insertable = false)//设置自增insertable 必须 = false
    private Integer seq;//序号，用于排序（上移，下移操作）

    @Column(columnDefinition = "text")
    private String name;

    @Column(columnDefinition = "text")
    private String descr;//概述

    @Column(columnDefinition = "text")
    private String detailInfo;//详细信息

    @Column(columnDefinition = "text")
    private String profileImgLink;//头像链接

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;//上传时间

}