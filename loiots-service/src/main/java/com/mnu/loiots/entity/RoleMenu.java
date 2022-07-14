package com.mnu.loiots.entity;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "mnu_loiots_role_menu")
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
