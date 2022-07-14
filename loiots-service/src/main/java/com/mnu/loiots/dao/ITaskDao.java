package com.mnu.loiots.dao;

import com.mnu.loiots.entity.Task;
import com.mnu.loiots.repository.ICustomRepository;

public interface ITaskDao extends ICustomRepository<Task,Long> {

    boolean existsByIdAndIsHandle(Long id, Boolean isHandle);


}
