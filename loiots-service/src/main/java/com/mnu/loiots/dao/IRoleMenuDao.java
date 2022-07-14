package com.mnu.loiots.dao;

import com.mnu.loiots.entity.RoleMenu;
import com.mnu.loiots.repository.ICustomRepository;

import java.util.List;

public interface IRoleMenuDao extends ICustomRepository<RoleMenu,Long> {

    List<RoleMenu> findByRoleId(Long roleId);

    void deleteByRoleId(Long roleId);

}
