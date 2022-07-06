package com.mnu.sosm.dao;

import com.mnu.sosm.entity.Menu;
import com.mnu.sosm.entity.Task;
import com.mnu.sosm.repository.ICustomRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ITaskDao extends ICustomRepository<Task,Long> {

    boolean existsByIdAndIsHandle(Long id, Boolean isHandle);


}
