package com.mnu.loiots.Criteria;

import com.mnu.loiots.entity.MyUser;
import com.mnu.loiots.entity.Researcher;
import com.mnu.loiots.repository.ICustomRepository;
import com.mnu.loiots.utils.PageModel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.beans.BeanUtils;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@EqualsAndHashCode(callSuper = true)
public class ResearcherCriteria extends Criteria<Researcher> {


    private String name;//名称模糊匹配

    public ResearcherCriteria(){
        super(Researcher.class);
    }

    @Override public String createQuery() {
        if (isNativeQuery()){
            String sql = "SELECT s.* " + sql() + " ORDER BY s.seq asc";
            return sql;
        }else {
            String sql = "SELECT s " + sql() + " ORDER BY s.seq asc";
            return sql;
        }
    }
    @Override public String createCount() {

        return "select count(1) " + sql();
    }

    @Override
    public Map<String, Object> param() {
        Map<String, Object> param = new HashMap<>();
        if (StringUtils.hasLength(name)) {
            param.put("name", escapeLike(name));
        }
        return param;
    }

    public String sql() {
        StringBuilder sql = new StringBuilder();
        if(isNativeQuery()){
            sql.append(" from mnu_loiots_researcher s WHERE 1=1 ");
            if (StringUtils.hasLength(name)){
                sql.append(" and s.name = :name");
            }
        }else {
            sql.append(" from Researcher s WHERE 1=1 ");
            if (StringUtils.hasLength(name)){
                sql.append(" and s.name like :name");
            }
        }

        return sql.toString();


    }

    public PageModel findByCriteria(ICustomRepository<?, ?> dao){
        Criteria c = doSearch(dao);
        PageModel ret = new PageModel();
        BeanUtils.copyProperties(c,ret);

        //列表查询去掉详细内容信息（占空间）
        if (ret.getObject() != null){
            List<Researcher> users = (List<Researcher>)ret.getObject();
            users.stream().forEach(u -> {
                u.setDetailInfo("");
            });
        }
        return ret;
    }

}
