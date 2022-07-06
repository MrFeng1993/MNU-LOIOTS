package com.mnu.sosm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @BelongsProject: SOSM
 * @BelongsPackage: com.mnu.sosm.dto
 * @Author: fenggn
 * @CreateTime: 2022-06-26  18:58
 * @Description: 用于设置角色菜单权限的时候接收前端参数
 * @Version: 1.0
 */


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuSettingDto {

    private Long roleId;

    private List<Long> menuIds;
}
