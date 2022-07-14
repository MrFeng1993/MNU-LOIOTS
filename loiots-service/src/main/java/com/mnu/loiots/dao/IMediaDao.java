package com.mnu.loiots.dao;

import com.mnu.loiots.entity.MediaInfo;
import com.mnu.loiots.entity.Menu;
import com.mnu.loiots.repository.ICustomRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IMediaDao extends ICustomRepository<MediaInfo,Long> {


    @Query(value = "from MediaInfo where id in :ids")
    List<Menu> findByIdIn(List<Long> ids);

    boolean existsById(Long id);


}
