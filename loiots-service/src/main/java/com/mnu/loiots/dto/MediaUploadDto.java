package com.mnu.loiots.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

/**
 * @BelongsProject: LOIOTS
 * @BelongsPackage: com.mnu.loiots.dto
 * @Author: fenggn
 * @CreateTime: 2022-07-13  10:52
 * @Description: TODO
 * @Version: 1.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MediaUploadDto {

    private String mark;


    private MultipartFile file;

}
