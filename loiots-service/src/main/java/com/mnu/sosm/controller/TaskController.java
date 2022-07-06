package com.mnu.sosm.controller;


import com.mnu.sosm.Criteria.TaskCriteria;
import com.mnu.sosm.dao.ITaskDao;
import com.mnu.sosm.entity.Task;
import com.mnu.sosm.utils.JsonModel;
import com.mnu.sosm.utils.PageModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.Date;


@RestController
@RequestMapping("/task")
@Slf4j
public class TaskController {


    @Resource
    private ITaskDao taskDao;


    /**
     * 新增/编辑
     * @param task
     * @return
     */
    @Transactional
    @RequestMapping(value = "/update",method = RequestMethod.POST)
    public JsonModel update(@RequestBody Task task){
        if (task .getId() == null) {//新增
            task.setCreateTime(new Date());

            //防止前端错误传参
            task.setIsHandle(false);
            task.setFinishDesc(null);
            task.setHandleUserId(null);

            task = taskDao.save(task);
        }else {//编辑
            task = taskDao.update(task.getId(),task);
        }
        return new JsonModel(true,"操作成功",task);
    }

    /**
     * 单个删除
     * @param id
     * @return
     */
    @RequestMapping(value = "/delete/{id}",method = RequestMethod.DELETE)
    public JsonModel delete(@PathVariable("id")Long id){
        try {
            Assert.notNull(id,"缺少必要参数");
            boolean e = taskDao.existsById(id);
            if (!e) {
                return new JsonModel(true,"任务不存在");
            }
            boolean e2 = taskDao.existsByIdAndIsHandle(id,true);
            if (e2) {
                return new JsonModel(true,"任务已处理，不能删除");
            }
            taskDao.deleteById(id);
            return new JsonModel(true,"操作成功");

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,e.getMessage());
        }

    }


    /**
     * 查询（分页）
     * @param
     * @return
     */
    @RequestMapping(value = "/search",method = RequestMethod.POST)
    public JsonModel search(@RequestBody TaskCriteria criteria){
        try {
            PageModel page = criteria.findByCriteria(taskDao);
            return new JsonModel(true, "操作成功", page);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,e.getMessage());
        }

    }

    /**
     * 单个查询
     * @param
     * @return
     */
    @RequestMapping(value = "/findOne/{id}",method = RequestMethod.GET)
    public JsonModel findOne(@PathVariable("id") Long id){
        try {
            Assert.notNull(id,"缺少必要参数");
            boolean e = taskDao.existsById(id);
            if (!e){

                return new JsonModel(false,"任务不存在");
            }
            Task task = taskDao.findOne(id);
            return new JsonModel(true,"操作成功",task);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,e.getMessage());
        }

    }

    /**
     * 执行任务
     * @param
     * @return
     */
    @RequestMapping(value = "/execute",method = RequestMethod.POST)
    public JsonModel execute(@RequestBody Task task, HttpSession session){
        try {
            if (task == null) {
                return new JsonModel(true,"参数错误",task);
            }else {
                Long userId = (Long)session.getAttribute("userId");
                Assert.notNull(task.getId(),"缺少必要参数");
                task.setIsHandle(true);
                task.setHandleUserId(userId);
                task = taskDao.update(task.getId(),task);
                return new JsonModel(true,"操作成功",task);
            }

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return new JsonModel(false,e.getMessage());
        }

    }

}
