package com.mnu.loiots.controller;

import com.mnu.loiots.Criteria.ArticleCriteria;
import com.mnu.loiots.Criteria.ResearcherCriteria;
import com.mnu.loiots.dao.IArticleDao;
import com.mnu.loiots.dao.IResearcherDao;
import com.mnu.loiots.entity.ArticleInfo;
import com.mnu.loiots.entity.Researcher;
import com.mnu.loiots.service.ArticleService;
import com.mnu.loiots.service.ResearcherService;
import com.mnu.loiots.utils.JsonModel;
import com.mnu.loiots.utils.PageModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.Date;

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
@RequestMapping("/article")
public class ArticleController {



    @Resource
    private IArticleDao articleDao;

    @Resource
    private ArticleService articleService;


    /**
     * 科研队伍新增/编辑
     * @param param
     * @return
     */
    @Transactional
    @RequestMapping(value = "update",method = RequestMethod.POST)
    public JsonModel update(@RequestBody ArticleInfo param){



        try {

            if (param.getId() == null){//新增，直接保存
                param.setStatus((byte)0);//默认发布之后处于未上架状态
                param.setCreateTime(new Date());
                articleDao.save(param);
            }else {
                articleDao.update(param.getId(),param);
            }
            return new JsonModel(true,"操作成功",null);
        }  catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,"科研队伍新增/编辑接口错误",null);
        }


    }



    /**
     * 批量查询科研人员信息（分页）
     * @return
     */
    @RequestMapping(value = "ig/search",method = RequestMethod.POST)
    public JsonModel search(@RequestBody ArticleCriteria criteria){

        try {
            PageModel ret = criteria.findByCriteria(articleDao);
            return new JsonModel(true,"操作成功",ret);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,e.getMessage(),null);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,"查询媒体接口错误",null);
        }


    }

    /**
     * 删除科研人员信息（单个）
     * @return
     */
    @Transactional
    @RequestMapping(value = "deleteOne/{id}",method = RequestMethod.DELETE)
    public JsonModel deleteOne(@PathVariable("id") Long id){

        try {
            articleDao.deleteById(id);
            return new JsonModel(true,"操作成功",null);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,e.getMessage(),null);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,"删除科研人员接口错误",null);
        }


    }

    /**
     * 查询科研人员详细信息（单个）
     * @return
     */
    @RequestMapping(value = "ig/findOne/{id}",method = RequestMethod.GET)
    public JsonModel copyLink(@PathVariable("id") Long id){

        try {
            ArticleInfo info = articleDao.findOne(id);
            return new JsonModel(true,"操作成功",info);
        }  catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,"查询科研人员接口错误",null);
        }


    }

    /**
     * 文章上下架
     * 0-下架   1-上架
     * @return
     */
    @RequestMapping(value = "launch/{status}/{id}",method = RequestMethod.GET)
    public JsonModel copyLink(@PathVariable("status") Byte status,@PathVariable("id") Long id){

        try {
            articleService.launch(id,status);
            return new JsonModel(true,"操作成功",null);
        }  catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,"文章上下架接口错误",null);
        }


    }
}
