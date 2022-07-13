package com.mnu.loiots;

import com.mnu.loiots.repository.impl.CustomRepositoryImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(repositoryBaseClass = CustomRepositoryImpl.class)
public class LoiotsApplication {

    public static void main(String[] args) {
        SpringApplication.run(LoiotsApplication.class, args);
    }

}
