package com.mnu.loiots.controller;

import com.alibaba.fastjson.JSONArray;
import com.mnu.loiots.dao.IMediaDao;
import com.mnu.loiots.dao.IMenuDao;
import com.mnu.loiots.dto.MediaUploadDto;
import com.mnu.loiots.entity.MediaInfo;
import com.mnu.loiots.entity.Menu;
import com.mnu.loiots.service.MediaService;
import com.mnu.loiots.utils.JsonModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.io.IOException;
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
@RequestMapping("/media")
public class MediaController {


    @Resource
    private MediaService mediaService;

    @Resource
    private IMediaDao mediaDao;


    /**
     * 文件上传
     * @param param
     * @return
     */
    @RequestMapping(value = "upload",method = RequestMethod.POST)
    public JsonModel update(MediaUploadDto param){

        try {
            String url = mediaService.uploadMedia(param);
            return new JsonModel(true,"操作成功",url);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,e.getMessage(),null);
        } catch (IOException e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,"文件存储出错",null);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,"文件上传接口错误",null);
        }


    }

    /**
     * 重命名媒体
     * @return
     */
    @Transactional
    @RequestMapping(value = "rename",method = RequestMethod.POST)
    public JsonModel rename(@RequestParam("id") Long id,@RequestParam("mark") String mark){

        try {
            Assert.notNull(id,"参数错误");
            Assert.isTrue(StringUtils.hasLength(mark),"参数错误");
            if (mediaDao.existsById(id)){
                MediaInfo temp = new MediaInfo();
                temp.setMark(mark);
                mediaDao.update(id,temp);
            }else {
                return new JsonModel(false,"数据不存在",null);
            }
            return new JsonModel(true,"操作成功",null);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,e.getMessage(),null);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,"重命名媒体接口错误",null);
        }


    }


    /**
     * 查询所有媒体（不分页）
     * @return
     */
    @RequestMapping(value = "findAll",method = RequestMethod.GET)
    public JsonModel findAll(){

        try {
            List<MediaInfo> ret = mediaDao.findAll();
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
     * 查询单条媒体信息
     * @return
     */
    @RequestMapping(value = "findOne/{id}",method = RequestMethod.GET)
    public JsonModel findOne(@PathVariable("id") Long id){

        try {
            MediaInfo ret = mediaDao.findOne(id);
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
     * 删除媒体（单个）
     * @return
     */
    @RequestMapping(value = "deleteOne/{id}",method = RequestMethod.DELETE)
    public JsonModel deleteOne(@PathVariable("id") Long id){

        try {
            mediaService.deleteOne(id);
            return new JsonModel(true,"操作成功",null);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,e.getMessage(),null);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,"删除媒体接口错误",null);
        }


    }

    /**
     * 复制链接
     * @return
     */
    @RequestMapping(value = "copyLink/{id}",method = RequestMethod.GET)
    public JsonModel copyLink(@PathVariable("id") Long id){

        try {
            MediaInfo info = mediaDao.findOne(id);
            String url = "";
            if (info != null && StringUtils.hasLength(info.getFileLink())){
                url = info.getFileLink();
            }
            return new JsonModel(true,"操作成功",url);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,e.getMessage(),null);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,"删除媒体接口错误",null);
        }


    }
}
