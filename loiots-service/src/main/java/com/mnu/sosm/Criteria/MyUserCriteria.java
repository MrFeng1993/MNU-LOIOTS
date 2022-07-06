package com.mnu.sosm.Criteria;

import com.mnu.sosm.entity.MyUser;
import com.mnu.sosm.repository.ICustomRepository;
import com.mnu.sosm.utils.PageModel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.beans.BeanUtils;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
@EqualsAndHashCode(callSuper = true)
public class MyUserCriteria extends Criteria<MyUser> {


    private String userName;//名称模糊匹配

    public MyUserCriteria(){
        super(MyUser.class);
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
        if (StringUtils.hasLength(userName)) {
            param.put("userName", escapeLike(userName));
        }
        return param;
    }

    public String sql() {
        StringBuilder sql = new StringBuilder();
        if(isNativeQuery()){
            sql.append(" from my_user s WHERE 1=1 ");
            if (StringUtils.hasLength(userName)){
                sql.append(" and s.user_Name = :userName");
            }
        }else {
            sql.append(" from MyUser s WHERE 1=1 ");
            if (StringUtils.hasLength(userName)){
                sql.append(" and s.userName like :userName");
            }
        }
            sql.append(" and s.status = 1");

        return sql.toString();


    }

    public PageModel findByCriteria(ICustomRepository<?, ?> dao){
        Criteria c = doSearch(dao);
        PageModel ret = new PageModel();
        BeanUtils.copyProperties(c,ret);

        //去点敏感信息
        if (ret.getObject() != null){
            List<MyUser> users = (List<MyUser>)ret.getObject();
            users.stream().forEach(u -> {
                u.setPassword("");
            });
        }
        return ret;
    }

}
