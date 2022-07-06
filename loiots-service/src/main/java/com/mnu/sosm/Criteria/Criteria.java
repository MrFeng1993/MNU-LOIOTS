/**
 * 
 */
package com.mnu.sosm.Criteria;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.mnu.sosm.repository.ICustomRepository;
import com.mnu.sosm.utils.PageModel;
import lombok.NoArgsConstructor;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.beans.BeanUtils;

/**
 * 描述：
 * 
 * 时间：2017年6月28日
 */
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public abstract class Criteria<T> extends PageModel {
    private static final Log LOG = LogFactory.getLog(Criteria.class);

    public abstract String createQuery();

    public abstract String createCount();

    private Class<T> cls;

    private boolean pagination = true;

    private boolean nativeQuery = false;

    private String sortField;

    private Boolean asc = Boolean.FALSE;// 是否升序排列

    public static String escapeLike(String likeKeyWord) {
        if (likeKeyWord == null) {
            return "%%";
        } else {
            return "%" + escape(likeKeyWord) + "%";
        }
    }
    public static String escape(String likeKeyWord) {
        if (likeKeyWord == null) {
            return "";
        } else {
            return (likeKeyWord.replaceAll("_", "\\\\_").replaceAll("\\[", "\\\\[").replaceAll("\\]", "\\\\]")
                    .replaceAll("\\^", "\\\\^").replaceAll("%", "\\\\%"));
        }
    }

    public Map<String, Object> param() {
        return new HashMap<String, Object>();
    }

    public Criteria(Class<T> cls) {
        this.cls = cls;
    }

    /**
     * 下划线命名转驼峰
     * @param str
     * @return
     */
    public static String underlineToHump(String str) {
        Pattern linePattern = Pattern.compile("_(\\w)");
        str = str.toLowerCase();
        Matcher matcher = linePattern.matcher(str);
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            matcher.appendReplacement(sb, matcher.group(1).toUpperCase());
        }
        matcher.appendTail(sb);
        return sb.toString();
    }

    /**
     * 驼峰命名转下划线命名
     * @param fieldName
     * @return
     */
    public static String humpToUnderline(String fieldName) {
        Pattern humpPattern = Pattern.compile("[A-Z]");
        Matcher matcher = humpPattern.matcher(fieldName);
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            matcher.appendReplacement(sb, "_" + matcher.group(0).toLowerCase());
        }
        matcher.appendTail(sb);
        return sb.toString();
    }

    public Long count(ICustomRepository<?, ?> dao) {
        Long count = 0L;
        if(nativeQuery){
            count = dao.countBySql(this.createCount(), this.param());
        }else {
            count = dao.countByJPQL(this.createCount(), this.param());
        }
        this.setCount(count);
        return this.getCount();
    }

    @SuppressWarnings("unchecked")
    public Criteria<T> doSearch(ICustomRepository<?, ?> dao) {
        if (!this.pagination) {
            this.setPageSize(Integer.MAX_VALUE);
        }
        try {
            List<T> datas = new ArrayList<>();
            if (this.pagination) {
                int counter = 0;
                while (datas.size() == 0 && counter <= 50){
                    if(nativeQuery){
                        datas = (List<T>)dao.nativeQuery(this.createQuery(), cls, this.param(), this.getCurrentNo(), this.getPageSize());
                    }else{
                        datas = (List<T>) dao.findByJPQL(this.createQuery(), this, this.param(), cls);
                    }
                    if(this.getCurrentNo() == 1) break;
                    if (datas.size() == 0){//当前页没有数据
                        int currentNo = this.getCurrentNo()-1;
                        this.setCurrentNo(currentNo < 1 ? 1 : currentNo);
                    }
                    counter++;
                }
            } else {
                if(nativeQuery){
                    datas = (List<T>)dao.nativeQuery(this.createQuery(), cls, this.param());
                } else {
                    datas = (List<T>) dao.findByJPQL(this.createQuery(), this.param(), cls);
                }
            }
            this.count(dao);
            this.setObject(datas);
        } catch (Exception e) {
            LOG.error("Criteria doSearch (...)执行失败,JPQL语句:" + this.createQuery() + "，错误：" + "", e);
        }
        return this;
    }


    public PageModel findByCriteria(ICustomRepository<?, ?> dao){
        Criteria c = doSearch(dao);
        PageModel ret = new PageModel();
        BeanUtils.copyProperties(c,ret);
        return ret;
    }


}
