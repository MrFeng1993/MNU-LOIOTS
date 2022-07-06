package com.mnu.sosm.Criteria;

import com.mnu.sosm.entity.Task;
import com.mnu.sosm.repository.ICustomRepository;
import com.mnu.sosm.utils.PageModel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.beans.BeanUtils;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.Map;

@Data
@EqualsAndHashCode(callSuper = true)
public class TaskCriteria extends Criteria<Task> {


    private String taskName;//名称模糊匹配

    public TaskCriteria(){
        super(Task.class);
    }

    @Override public String createQuery() {
        if (isNativeQuery()){
            String sql = "SELECT s.* " + sql() + " ORDER BY s.create_time desc";
            return sql;
        }else {
            String sql = "SELECT s " + sql() + " ORDER BY s.createTime desc";
            return sql;
        }
    }
    @Override public String createCount() {

        return "select count(1) " + sql();
    }

    @Override
    public Map<String, Object> param() {
        Map<String, Object> param = new HashMap<>();
        if (StringUtils.hasLength(taskName)) {
            param.put("taskName", escapeLike(taskName));
        }
        return param;
    }

    public String sql() {
        StringBuilder sql = new StringBuilder();
        if(isNativeQuery()){
            sql.append(" from mnu_sosm_task s WHERE 1=1 ");
            if (StringUtils.hasLength(taskName)){
                sql.append(" and s.task_name like :taskName");
            }
        }else {
            sql.append(" from Task s WHERE 1=1 ");
            if (StringUtils.hasLength(taskName)){
                sql.append(" and s.taskName like :taskName");
            }
        }

        return sql.toString();


    }

    public PageModel findByCriteria(ICustomRepository<?, ?> dao){
        Criteria c = doSearch(dao);
        PageModel ret = new PageModel();
        BeanUtils.copyProperties(c,ret);

        return ret;
    }

}
