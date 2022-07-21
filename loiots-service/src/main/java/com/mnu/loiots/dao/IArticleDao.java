package com.mnu.loiots.dao;

import com.mnu.loiots.entity.ArticleInfo;
import com.mnu.loiots.entity.MediaInfo;
import com.mnu.loiots.entity.Menu;
import com.mnu.loiots.repository.ICustomRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IArticleDao extends ICustomRepository<ArticleInfo,Long> {


    @Query(value = "from ArticleInfo where id in :ids")
    List<Menu> findByIdIn(List<Long> ids);

    boolean existsById(Long id);

    boolean existsByCreator(String c);


}
