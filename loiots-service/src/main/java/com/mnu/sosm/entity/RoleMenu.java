package com.mnu.sosm.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
public class RoleMenu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private Long roleId;

    private Long menuId;

    public RoleMenu(){

    }

    public RoleMenu(Long roleId, Long menuId){
        this.roleId = roleId;
        this.menuId = menuId;
    }

}
