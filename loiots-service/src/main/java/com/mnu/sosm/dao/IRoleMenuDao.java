package com.mnu.sosm.dao;

import com.mnu.sosm.entity.RoleMenu;
import com.mnu.sosm.repository.ICustomRepository;

import java.util.List;

public interface IRoleMenuDao extends ICustomRepository<RoleMenu,Long> {

    List<RoleMenu> findByRoleId(Long roleId);

    void deleteByRoleId(Long roleId);

}
