package com.mnu.sosm.dao;

import com.mnu.sosm.entity.MyRole;
import com.mnu.sosm.repository.ICustomRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IMyRoleDao extends ICustomRepository<MyRole,Long> {

    MyRole findByRoleCode(String roleCode);

    boolean existsByRoleCode(String roleCode);


    boolean existsById(Long id);

    @Query(nativeQuery = true, value = "select * from mnu_sosm_role where role_code = :roleCode order by create_time asc limit 1")
    MyRole findOneByRoleCode(String roleCode);

    @Query(value = "from MyRole where status = 1 order by createTime desc ")
    List<MyRole> findAllAvailableRoles();

    MyRole findMyRoleByIdAndStatus(Long id, Byte status);

}
