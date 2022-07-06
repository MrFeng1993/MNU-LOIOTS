package com.mnu.sosm.controller;

import com.alibaba.fastjson.JSONArray;
import com.mnu.sosm.dao.IMenuDao;
import com.mnu.sosm.dao.IRoleMenuDao;
import com.mnu.sosm.entity.Menu;
import com.mnu.sosm.utils.JsonModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @BelongsProject: SOSM
 * @BelongsPackage: com.mnu.sosm.controller
 * @Author: fenggn
 * @CreateTime: 2022-06-26  18:42
 * @Description: TODO
 * @Version: 1.0
 */

@RestController
@Slf4j
@RequestMapping("/menu")
public class MenuController {


    @Resource
    private IMenuDao menuDao;


    @RequestMapping(value = "/findAll",method = RequestMethod.GET)
    public JsonModel getAllMenu(){
        List<Menu> menuList = menuDao.findAll();
        if (menuList == null || menuList.size() == 0){
            return new JsonModel(true,"操作成功",new JSONArray());
        }
        return new JsonModel(true,"操作成功",menuList);
    }


}
