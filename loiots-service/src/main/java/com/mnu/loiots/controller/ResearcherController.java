package com.mnu.loiots.controller;

import com.mnu.loiots.Criteria.ResearcherCriteria;
import com.mnu.loiots.dao.IMediaDao;
import com.mnu.loiots.dao.IResearcherDao;
import com.mnu.loiots.dto.MediaUploadDto;
import com.mnu.loiots.entity.MediaInfo;
import com.mnu.loiots.entity.Researcher;
import com.mnu.loiots.service.MediaService;
import com.mnu.loiots.service.ResearcherService;
import com.mnu.loiots.utils.JsonModel;
import com.mnu.loiots.utils.PageModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.io.IOException;
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
@RequestMapping("/researcher")
public class ResearcherController {


    @Resource
    private ResearcherService researcherService;

    @Resource
    private IResearcherDao researcherDao;


    /**
     * 科研队伍新增/编辑
     * @param param
     * @return
     */
    @Transactional
    @RequestMapping(value = "update",method = RequestMethod.POST)
    public JsonModel update(@RequestBody Researcher param){



        try {

            if (param.getId() == null){//新增，直接保存
                param.setCreateTime(new Date());
                researcherDao.save(param);
            }else {
                researcherDao.update(param.getId(),param);
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
    public JsonModel search(@RequestBody ResearcherCriteria criteria){

        try {
            PageModel ret = criteria.findByCriteria(researcherDao);
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
            researcherDao.deleteById(id);
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
            Researcher info = researcherDao.findOne(id);
            return new JsonModel(true,"操作成功",info);
        }  catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,"查询科研人员接口错误",null);
        }


    }

    /**
     * 上移-up  或者下移--down
     * @return
     */
    @RequestMapping(value = "move/{direction}/{id}",method = RequestMethod.GET)
    public JsonModel copyLink(@PathVariable("direction") String direction,@PathVariable("id") Long id){

        try {
            researcherService.move(id,direction);
            return new JsonModel(true,"操作成功",null);
        }  catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,"不能再移动了",null);
        }


    }
}
