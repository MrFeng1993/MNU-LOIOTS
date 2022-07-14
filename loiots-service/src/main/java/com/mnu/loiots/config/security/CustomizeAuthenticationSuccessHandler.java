package com.mnu.loiots.config.security;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.mnu.loiots.dao.IMenuDao;
import com.mnu.loiots.dao.IMyRoleDao;
import com.mnu.loiots.dao.IMyUserDao;
import com.mnu.loiots.dao.IRoleMenuDao;
import com.mnu.loiots.entity.Menu;
import com.mnu.loiots.entity.MyRole;
import com.mnu.loiots.entity.MyUser;
import com.mnu.loiots.entity.RoleMenu;
import com.mnu.loiots.utils.JsonModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @Author: fenggn
 * @Description: 登录成功处理逻辑
 * @Date Create in 2022/6/3 15:52
 */
@Component
@Slf4j
public class CustomizeAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    //AES密钥
    @Value("${loiots.config.oss.host}")
    private String HOST;


    @Autowired
    IMyUserDao iMyUserDao;

    @Autowired
    IMyRoleDao iMyRoleDao;

    @Autowired
    IRoleMenuDao iRoleMenuDao;

    @Autowired
    IMenuDao iMenuDao;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
        MyUserDetails userDetails = (MyUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        HttpSession session = httpServletRequest.getSession();
        //往session中存入你想要的东西
        MyUser user = iMyUserDao.findByAccount(userDetails.getUsername());
        session.setAttribute("userName",user.getUserName());
        JsonModel ret = new JsonModel(true,"登录成功");
        JSONObject modelObj = new JSONObject();
        ret.setObj(modelObj);
        if (user != null){
            session.setAttribute("userId",user.getId());
            modelObj.put("userId",user.getId());
            modelObj.put("userName",user.getUserName());
            MyRole role = iMyRoleDao.findOne(user.getRoleId());
            if (role != null){
                session.setAttribute("roleCode",role.getRoleCode());
                modelObj.put("roleCode",role.getRoleCode());

            }
            List<RoleMenu> roleMenus = iRoleMenuDao.findByRoleId(user.getRoleId());
            if (roleMenus != null && roleMenus.size() > 0){
                List<Long> menuIds = roleMenus.stream().map(RoleMenu::getMenuId).collect(Collectors.toList());
                List<Menu> menus = iMenuDao.findByIdIn(menuIds);
                session.setAttribute("menus",menus );
                modelObj.put("menus", menus);
            }
        }



        //处理编码方式，防止中文乱码的情况
        httpServletResponse.setContentType("text/json;charset=utf-8");
        //塞到HttpServletResponse中返回给前台
        httpServletResponse.getWriter().write(JSON.toJSONString(ret));
//        httpServletResponse.sendRedirect(HOST);
        log.info("登录成功");
    }
}

