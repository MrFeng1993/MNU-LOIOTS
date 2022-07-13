package com.mnu.loiots.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @BelongsProject: LOIOTS
 * @BelongsPackage: com.mnu.loiots.dto
 * @Author: fenggn
 * @CreateTime: 2022-07-13  11:08
 * @Description: TODO
 * @Version: 1.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MediaSaveReturnDto {

    private String fileName;//文件名

    private String fileExt;//文件后缀


}
