package com.mnu.sosm.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "text")
    private String userName;

    private String department;

    @Column(columnDefinition = "text",unique = true)
    private String account;

    @Column(columnDefinition = "text")
    private String password;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    @JSONField(format = "yyyy-MM-dd")
    private Date createTime;

    private Long roleId;

    /**
     * 1:正常
     * -1: 已删除
     */
    @Column(columnDefinition = "smallint DEFAULT 1")
    private Byte status;

    @OneToOne
    @JoinColumn(name = "roleId",insertable = false, updatable = false)
    private MyRole role;

}
