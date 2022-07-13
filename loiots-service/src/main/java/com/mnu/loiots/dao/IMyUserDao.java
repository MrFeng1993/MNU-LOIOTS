package com.mnu.loiots.dao;

import com.mnu.loiots.entity.MyUser;
import com.mnu.loiots.repository.ICustomRepository;

public interface IMyUserDao extends ICustomRepository<MyUser,Long> {

    MyUser findByAccount(String username);

    boolean existsByRoleIdAndStatus(Long roleId, Byte status);
}
