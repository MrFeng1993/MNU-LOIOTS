package com.mnu.sosm.dao;

import com.mnu.sosm.entity.Menu;
import com.mnu.sosm.repository.ICustomRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IMenuDao extends ICustomRepository<Menu,Long> {


    @Query(value = "from Menu where id in :ids")
    List<Menu> findByIdIn(List<Long> ids);
}
