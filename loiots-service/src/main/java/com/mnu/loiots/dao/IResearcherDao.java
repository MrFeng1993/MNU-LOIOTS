package com.mnu.loiots.dao;

import com.mnu.loiots.entity.MediaInfo;
import com.mnu.loiots.entity.Menu;
import com.mnu.loiots.entity.Researcher;
import com.mnu.loiots.repository.ICustomRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IResearcherDao extends ICustomRepository<Researcher,Long> {


    @Query(value = "from Researcher where id in :ids")
    List<Menu> findByIdIn(List<Long> ids);

    boolean existsById(Long id);


    //查询serial处于参数serial上方（小于参数serial）的且最接近参数serial的一条数据
    @Query(nativeQuery = true,value = "select * from mnu_loiots_researcher r where r.seq < :seq" +
            " order by seq desc limit 1")
    Researcher findBySerialUp(Integer seq);

    //查询serial处于参数serial下方（大于参数serial）的且最接近参数serial的一条数据
    @Query(nativeQuery = true,value = "select * from mnu_loiots_researcher r where r.seq > :seq" +
            " order by seq asc limit 1")
    Researcher findBySerialDown(Integer seq);

}
