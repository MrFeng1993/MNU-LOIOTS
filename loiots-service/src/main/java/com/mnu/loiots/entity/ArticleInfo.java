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
 * @CreateTime: 2022-07-13  16:40
 * @Description: TODO
 * @Version: 1.0
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "mnu_loiots_article")
public class ArticleInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(columnDefinition = "text")
    private String title;

    /**
     * -----栏目
     * SYSJJ-实验室简介
     * ZHXW-综合新闻
     * TZGG-通知公告
     * RCQK-人才情况
     * JSDT-教师动态
     * YJFX-研究方向
     * YJCG-研究成果
     * XSHD-学术活动
     * SYSGLZD-实验室管理制度
     * SYSAQ-实验室安全
     * XMHZ-项目合作
     * LXWM-联系我们
     */
    private String part;

    @Column(columnDefinition = "text")
    private String content;//详细信息

    @Column(columnDefinition = "text")
    private String coverImgLink;//封面图链接

    private String creator;//创建者：system--系统自动初始化

    private Byte status;//0-下架   1-上架


    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;//创建时间

}
