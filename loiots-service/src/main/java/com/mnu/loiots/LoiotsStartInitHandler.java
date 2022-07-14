package com.mnu.loiots;

import com.mnu.loiots.dao.IMenuDao;
import com.mnu.loiots.dao.IMyRoleDao;
import com.mnu.loiots.dao.IMyUserDao;
import com.mnu.loiots.dao.IRoleMenuDao;
import com.mnu.loiots.entity.Menu;
import com.mnu.loiots.entity.MyRole;
import com.mnu.loiots.entity.MyUser;
import com.mnu.loiots.entity.RoleMenu;
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
public class LoiotsStartInitHandler implements InitializingBean {

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
            super_admin.setRoledesc("实验室网站超级管理员");
            super_admin = iMyRoleDao.save(super_admin);
        }

        MyUser sys_user = iMyUserDao.findByAccount("admin");
        if (sys_user == null) {
            log.info("初始化超级管理员用户");
            sys_user = new MyUser();
            sys_user.setDepartment("信工学院");
            sys_user.setRoleId(super_admin.getId());
            sys_user.setPassword(passwordEncoder.encode("admin258"));
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
            Menu menu1 = new Menu(1l,"科研队伍管理","research-team","back",null,0l,now);
            Menu menu2 = new Menu(2l,"动态发布","trends","back",null,0l,now);
            Menu menu3 = new Menu(3l,"友情链接","flink","back",null,0l,now);
            Menu menu4 = new Menu(4l,"媒体库","media-library","back",null,0l,now);
            menus.add(menu1);
            menus.add(menu2);
            menus.add(menu3);
            menus.add(menu4);

            //保存默认菜单信息
            menuDao.saveAllAndFlush(menus);

            List<RoleMenu> role_menus = new ArrayList<>();
            RoleMenu roleMenu1 = new RoleMenu(super_role_id,1l);
            RoleMenu roleMenu2 = new RoleMenu(super_role_id,2l);
            RoleMenu roleMenu3 = new RoleMenu(super_role_id,3l);
            RoleMenu roleMenu4 = new RoleMenu(super_role_id,4l);
            role_menus.add(roleMenu1);
            role_menus.add(roleMenu2);
            role_menus.add(roleMenu3);
            role_menus.add(roleMenu4);
            //保存菜单和超级管理员的关系
            roleMenuDao.saveAllAndFlush(role_menus);

        }
        log.info("初始化系统菜单初始化完成");
    }
}
