package com.mnu.sosm.dao;

import com.mnu.sosm.entity.MyUser;
import com.mnu.sosm.repository.ICustomRepository;

public interface IMyUserDao extends ICustomRepository<MyUser,Long> {

    MyUser findByAccount(String username);

    boolean existsByRoleIdAndStatus(Long roleId, Byte status);
}
