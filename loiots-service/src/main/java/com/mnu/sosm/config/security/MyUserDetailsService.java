package com.mnu.sosm.config.security;


import com.mnu.sosm.dao.IMyRoleDao;
import com.mnu.sosm.dao.IMyUserDao;
import com.mnu.sosm.entity.MyRole;
import com.mnu.sosm.entity.MyUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MyUserDetailsService implements UserDetailsService {


    @Autowired
    private IMyUserDao iMyUserDao;

    @Autowired
    private IMyRoleDao iMyRoleDao;




    @Override
    public UserDetails loadUserByUsername(String userName)
                                      throws UsernameNotFoundException {

        MyUser user = iMyUserDao.findByAccount(userName);
        if (user != null){
            //加载基础用户信息
            MyUserDetails myUserDetails = getUserDetails(user);

            MyRole role = iMyRoleDao.findOne(user.getRoleId());

            List<String> authorities = new ArrayList<>();
//            if (role != null){
//                //角色是一 个特殊的权限，ROLE_前缀
//                authorities.add("ROLE_" + role.getRoleCode());
//            }
            myUserDetails.setAuthorities(
                    AuthorityUtils.commaSeparatedStringToAuthorityList(role.getRoleCode()));


            return myUserDetails;
        }


        return new MyUserDetails();


    }

    public MyUserDetails getUserDetails(MyUser user){
        MyUserDetails userDetails = null;

        if (user != null){

            userDetails = new MyUserDetails();
            userDetails.setUsername(user.getAccount());
            userDetails.setPassword(user.getPassword());
            userDetails.setEnabled(1 == user.getStatus() ? true : false);
            userDetails.setCredentialsNonExpired(true);
        }
        return userDetails;
    }

}
