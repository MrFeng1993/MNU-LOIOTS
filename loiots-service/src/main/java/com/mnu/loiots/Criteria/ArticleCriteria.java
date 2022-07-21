package com.mnu.loiots.Criteria;

import com.mnu.loiots.entity.ArticleInfo;
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
public class ArticleCriteria extends Criteria<ArticleInfo> {


    private String title;//名称模糊匹配
    private List<String> part;//栏目
    private Byte status;//0-下架   1-上架

    public ArticleCriteria(){
        super(ArticleInfo.class);
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
        if (StringUtils.hasLength(title)) {
            param.put("title", escapeLike(title));
        }
        if (part != null && part.size() > 0) {
            param.put("part", part);
        }
        if (status != null) {
            param.put("status", status);
        }
        return param;
    }

    public String sql() {
        StringBuilder sql = new StringBuilder();
        if(isNativeQuery()){
            sql.append(" from mnu_loiots_article s WHERE 1=1 ");
        }else {
            sql.append(" from ArticleInfo s WHERE 1=1 ");

        }

        if (StringUtils.hasLength(title)){
            sql.append(" and s.title like :title");
        }
        if (part != null && part.size() > 0){
            sql.append(" and s.part in :part");
        }
        if (status != null) {
            sql.append(" and s.status = :status");
        }
        return sql.toString();


    }

    public PageModel findByCriteria(ICustomRepository<?, ?> dao){
        Criteria c = doSearch(dao);
        PageModel ret = new PageModel();
        BeanUtils.copyProperties(c,ret);

        //列表查询去掉详细内容信息（占空间）
//        if (ret.getObject() != null){
//            List<ArticleInfo> users = (List<ArticleInfo>)ret.getObject();
//            users.stream().forEach(u -> {
//                u.setContent("");
//            });
//        }
        return ret;
    }

}
