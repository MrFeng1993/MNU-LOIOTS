package com.mnu.loiots.dao;

import com.mnu.loiots.entity.ArticleInfo;
import com.mnu.loiots.entity.FriendlyLink;
import com.mnu.loiots.entity.Menu;
import com.mnu.loiots.repository.ICustomRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IFriendlyLinkDao extends ICustomRepository<FriendlyLink,Long> {



    boolean existsById(Long id);


}
