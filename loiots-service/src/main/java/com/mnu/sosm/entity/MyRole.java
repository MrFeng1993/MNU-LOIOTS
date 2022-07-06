package com.mnu.sosm.entity;

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
@Table(name = "mnu_sosm_role")
public class MyRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "text",unique = true)
    private String roleName;

    @Column(columnDefinition = "text",unique = true)
    private String roleCode;

    @Column(columnDefinition = "text")
    private String roledesc;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime;


    /**
     * 1:正常
     * -1: 已删除
     */
    @Column(columnDefinition = "smallint DEFAULT 1")
    private Byte status;
}
