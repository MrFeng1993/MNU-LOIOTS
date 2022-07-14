package com.mnu.loiots.service;

import com.mnu.loiots.dao.IArticleDao;
import com.mnu.loiots.dao.IResearcherDao;
import com.mnu.loiots.entity.ArticleInfo;
import com.mnu.loiots.entity.Researcher;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;

@Slf4j
@Service
public class ArticleService {






    @Resource
    private IArticleDao articleDao;


    /**
     * 调整顺序上移或者下移
     * @param id
     * @param status
     */
    @Transactional
    public void launch(Long id, Byte status) {
        ArticleInfo a = new ArticleInfo();
        a.setId(id);
        a.setStatus(status);
        if (articleDao.existsById(id)){
            articleDao.update(id,a);
        }

    }
}
