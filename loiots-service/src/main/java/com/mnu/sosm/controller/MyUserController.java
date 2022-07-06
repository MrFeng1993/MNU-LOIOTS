package com.mnu.sosm.controller;


import com.mnu.sosm.Criteria.MyUserCriteria;
import com.mnu.sosm.dao.IMyUserDao;
import com.mnu.sosm.entity.Menu;
import com.mnu.sosm.entity.MyUser;
import com.mnu.sosm.entity.MyUser;
import com.mnu.sosm.service.RoleMenuService;
import com.mnu.sosm.utils.AESUtils2;
import com.mnu.sosm.utils.CopyBeanUtils;
import com.mnu.sosm.utils.JsonModel;
import com.mnu.sosm.utils.PageModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/user")
@Slf4j
public class MyUserController {

    @Resource
    private IMyUserDao iMyUserDao;

    @Resource
    private RoleMenuService roleMenuService;

//    @Resource
//    private PasswordEncoder passwordEncoder;




    @Transactional
    @RequestMapping(value = "/update",method = RequestMethod.POST)
    public JsonModel update(@RequestBody MyUser user){

        //AES密钥
        String SECRETKEY = "jkl;POIU1234++==";
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        if (user .getId() == null) {//新增
            user.setCreateTime(new Date());
            user.setStatus((byte) 1);

            try {
                user.setPassword(encoder.encode(AESUtils2.Decrypt(user.getPassword(),SECRETKEY)));
            } catch (Exception e) {
                log.error("用户密码加解密错误，请检查前端加密算法",e);
                return new JsonModel(false,"密码处理失败");
            }
            user = iMyUserDao.save(user);
        }else {//编辑
            if (StringUtils.hasLength(user.getPassword())){
                try {
                    user.setPassword(encoder.encode(AESUtils2.Decrypt(user.getPassword(),SECRETKEY)));
                } catch (Exception e) {
                    log.error("用户密码加解密错误，请检查前端加密算法",e);
                    return new JsonModel(false,"密码处理失败");
                }
            }
            user = iMyUserDao.update(user.getId(),user);
        }
        MyUser ret = new MyUser();
        CopyBeanUtils.copyProperties(user,ret,"password");
//        user.setPassword("");
        return new JsonModel(true,"操作成功",ret);

    }

    /**
     * 单个删除
     * @param id
     * @return
     */
    @Transactional
    @RequestMapping(value = "/delete/{id}",method = RequestMethod.DELETE)
    public JsonModel delete(@PathVariable("id")Long id){
        try {
            Assert.notNull(id,"缺少必要参数");
            MyUser user = new MyUser();
            user.setId(id);
            user.setStatus((byte) -1);
            iMyUserDao.update(id,user);
            return new JsonModel(true,"操作成功");

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,e.getMessage());
        }

    }


    /**
     * 查询（不分页）
     * @param
     * @return
     */
    @RequestMapping(value = "/search",method = RequestMethod.POST)
    public JsonModel search(@RequestBody MyUserCriteria criteria){
        try {
            PageModel page = criteria.findByCriteria(iMyUserDao);
            return new JsonModel(true, "操作成功", page);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,e.getMessage());
        }

    }

    /**
     * 单个查询用于回显
     * @param
     * @return
     */
    @RequestMapping(value = "/findOne/{id}",method = RequestMethod.GET)
    public JsonModel findOne(@PathVariable("id") Long id){
        try {
            Assert.notNull(id,"缺少必要参数");
            MyUser user = iMyUserDao.findOne(id);
            user.setPassword(null);
            return new JsonModel(true,"操作成功",user);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,e.getMessage());
        }

    }

    @RequestMapping(value = "/getMenu/{id}", method = RequestMethod.GET)
    public JsonModel getMenu(@PathVariable("id") Long id){
        try {
            Assert.notNull(id,"缺少必要参数");
            boolean e = iMyUserDao.existsById(id);
            if (!e) {
                return new JsonModel(false,"用户不存在");
            }
            MyUser user = iMyUserDao.findOne(id);
            List<Menu> menus = roleMenuService.getMenuByRoleId(user.getRoleId());
            return new JsonModel(true,"操作成功",menus);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,e.getMessage());
        }
    }


}
