package com.mnu.sosm.service;

import com.mnu.sosm.dao.IMyUserDao;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class MyUserService {



    @Resource
    private IMyUserDao myUserDao;


    /**
     * 判断是否能删除角色
     * @param roleId
     * @return 能：false  不能：true
     */
    public boolean canDeleteRole(Long roleId) {
        return myUserDao.existsByRoleIdAndStatus(roleId,(byte)1);
    }
}
