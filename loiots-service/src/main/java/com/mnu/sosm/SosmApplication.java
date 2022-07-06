package com.mnu.sosm;

import com.mnu.sosm.repository.impl.CustomRepositoryImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(repositoryBaseClass = CustomRepositoryImpl.class)
public class SosmApplication {

    public static void main(String[] args) {
        SpringApplication.run(SosmApplication.class, args);
    }

}
