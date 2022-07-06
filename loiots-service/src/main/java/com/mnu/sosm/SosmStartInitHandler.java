package com.mnu.sosm;

import com.mnu.sosm.dao.IMenuDao;
import com.mnu.sosm.dao.IMyRoleDao;
import com.mnu.sosm.dao.IMyUserDao;
import com.mnu.sosm.dao.IRoleMenuDao;
import com.mnu.sosm.entity.Menu;
import com.mnu.sosm.entity.MyRole;
import com.mnu.sosm.entity.MyUser;
import com.mnu.sosm.entity.RoleMenu;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
@Configuration
@Slf4j
public class SosmStartInitHandler implements InitializingBean {

    @Resource
    private IMyRoleDao iMyRoleDao;

    @Resource
    private IMyUserDao iMyUserDao;

    @Resource
    private IMenuDao menuDao;

    @Resource
    private IRoleMenuDao roleMenuDao;


    @Resource
    private PasswordEncoder passwordEncoder;

    @Override
    public void afterPropertiesSet() throws Exception {


        try {

            log.info("开始系统初始化......");
            initSysDefaultRoleAndUser();

            initSysDefaultMenu();

            log.info("系统初始化完成");

        } catch (Exception e) {
            log.error("初始化错误",e);
        }
    }

    /**
     * 初始化系统默认角色和超级管理员
     */
    @Transactional
    public void initSysDefaultRoleAndUser(){
        MyRole super_admin = iMyRoleDao.findOneByRoleCode("super_admin");
        if (super_admin == null){
            log.info("初始化超级管理员角色");
            super_admin = new MyRole();
            super_admin.setCreateTime(new Date());
            super_admin.setRoleCode("super_admin");
            super_admin.setStatus((byte)1);
            super_admin.setRoleName("超级管理员");
            super_admin.setRoledesc("乱七八糟");
            super_admin = iMyRoleDao.save(super_admin);
        }

        MyUser sys_user = iMyUserDao.findByAccount("admin");
        if (sys_user == null) {
            log.info("初始化超级管理员用户");
            sys_user = new MyUser();
            sys_user.setDepartment("总裁办");
            sys_user.setRoleId(super_admin.getId());
            sys_user.setPassword(passwordEncoder.encode("123456"));
            sys_user.setStatus((byte)1);
            sys_user.setCreateTime(new Date());
            sys_user.setUserName("admin");
            sys_user.setAccount("admin");
            iMyUserDao.save(sys_user);
        }
    }

    /**
     * 初始化系统默认角色和超级管理员
     */
    @Transactional
    public void initSysDefaultMenu(){
        log.info("初始化系统菜单....");
        List<Menu> menus = menuDao.findAll();
        if (menus == null || menus.size() == 0){
            boolean has_super_admin = iMyRoleDao.existsByRoleCode("super_admin");
            if (!has_super_admin){
                initSysDefaultRoleAndUser();
            }
            MyRole super_admin = iMyRoleDao.findOneByRoleCode("super_admin");
            Long super_role_id = super_admin.getId();
            menus = new ArrayList<>();
            Date now = new Date();
            Menu menu1 = new Menu(1l,"权限管理","authority",null,0l,now);
            Menu menu2 = new Menu(2l,"角色管理","authority/role",null,1l,now);
            Menu menu3 = new Menu(3l,"用户管理","authority/usser",null,1l,now);
            Menu menu5 = new Menu(5l,"排班管理","duty",null,0l,now);
            Menu menu6 = new Menu(6l,"任务管理","task",null,0l,now);
            menus.add(menu1);
            menus.add(menu2);
            menus.add(menu3);
            menus.add(menu5);
            menus.add(menu6);

            //保存默认菜单信息
            menuDao.saveAllAndFlush(menus);

            List<RoleMenu> role_menus = new ArrayList<>();
            RoleMenu roleMenu1 = new RoleMenu(super_role_id,1l);
            RoleMenu roleMenu2 = new RoleMenu(super_role_id,2l);
            RoleMenu roleMenu3 = new RoleMenu(super_role_id,3l);
            RoleMenu roleMenu5 = new RoleMenu(super_role_id,5l);
            RoleMenu roleMenu6 = new RoleMenu(super_role_id,6l);
            role_menus.add(roleMenu1);
            role_menus.add(roleMenu2);
            role_menus.add(roleMenu3);
            role_menus.add(roleMenu5);
            role_menus.add(roleMenu6);
            //保存菜单和超级管理员的关系
            roleMenuDao.saveAllAndFlush(role_menus);

        }
        log.info("初始化系统菜单初始化完成");
    }
}
