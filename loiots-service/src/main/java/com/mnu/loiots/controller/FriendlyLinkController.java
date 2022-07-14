package com.mnu.loiots.controller;

import com.mnu.loiots.Criteria.ArticleCriteria;
import com.mnu.loiots.dao.IArticleDao;
import com.mnu.loiots.dao.IFriendlyLinkDao;
import com.mnu.loiots.entity.ArticleInfo;
import com.mnu.loiots.entity.FriendlyLink;
import com.mnu.loiots.utils.JsonModel;
import com.mnu.loiots.utils.PageModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.Date;
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
@RequestMapping("/flink")
public class FriendlyLinkController {



    @Resource
    private IFriendlyLinkDao friendlyLinkDao;


    /**
     * 科研队伍新增/编辑
     * @param param
     * @return
     */
    @Transactional
    @RequestMapping(value = "update",method = RequestMethod.POST)
    public JsonModel update(@RequestBody FriendlyLink param){



        try {

            if (param.getId() == null){//新增，直接保存
                param.setCreateTime(new Date());
                friendlyLinkDao.save(param);
            }else {
                friendlyLinkDao.update(param.getId(),param);
            }
            return new JsonModel(true,"操作成功",null);
        }  catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,"友情链接新增/编辑接口错误",null);
        }


    }




    /**
     * 删除友情链接信息（单个）
     * @return
     */
    @Transactional
    @RequestMapping(value = "deleteOne/{id}",method = RequestMethod.DELETE)
    public JsonModel deleteOne(@PathVariable("id") Long id){

        try {
            friendlyLinkDao.deleteById(id);
            return new JsonModel(true,"操作成功",null);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,e.getMessage(),null);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,"删除友情链接接口错误",null);
        }


    }

    /**
     * 查询友情链接详细信息（单个）
     * @return
     */
    @RequestMapping(value = "ig/findOne/{id}",method = RequestMethod.GET)
    public JsonModel copyLink(@PathVariable("id") Long id){

        try {
            FriendlyLink ret = friendlyLinkDao.findOne(id);
            return new JsonModel(true,"操作成功",ret);
        }  catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,"查询友情链接接口错误",null);
        }


    }

    /**
     * 查询所有友情链接
     * @return
     */
    @RequestMapping(value = "ig/findAll",method = RequestMethod.GET)
    public JsonModel findAll(){

        try {
            List<FriendlyLink> ret = friendlyLinkDao.findAll();
            return new JsonModel(true,"操作成功",ret);
        }  catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,"查询所有友情链接接口错误",null);
        }


    }
}
