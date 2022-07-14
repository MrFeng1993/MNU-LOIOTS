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
 * @CreateTime: 2022-07-13  09:57
 * @Description: TODO
 * @Version: 1.0
 */

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "mnu_loiots_media")
public class MediaInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "text",unique = true)
    private String mark;

    @Column(columnDefinition = "text",unique = true)
    private String fileName;//文件名不+后缀

    @Column(columnDefinition = "text",unique = true)
    private String fileLink;//文件名不+后缀

    private String fileExt;//文件后缀

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date uploadTime;//上传时间

}
