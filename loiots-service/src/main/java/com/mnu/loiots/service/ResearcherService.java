package com.mnu.loiots.service;

import com.mnu.loiots.dao.IResearcherDao;
import com.mnu.loiots.entity.Researcher;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;

@Slf4j
@Service
public class ResearcherService {


    @Value("${loiots.config.oss.media.path}")
    private String mediaPath;

    @Value("${loiots.config.oss.host}")
    private String urlHost;



    @Resource
    private IResearcherDao researcherDao;


    /**
     * 调整顺序上移或者下移
     * @param id
     * @param direction
     */
    @Transactional
    public void move(Long id, String direction) {
        Researcher r1 = researcherDao.findOne(id);
        Researcher r2;
        switch (direction){
            case "up":
                r2 = researcherDao.findBySerialUp(r1.getSeq());

                break;
            case "down":
                r2 = researcherDao.findBySerialDown(r1.getSeq());
                break;
            default:
                log.warn("未知的参数:direction = " + direction);
                log.warn("科研信息排序操作无效");
                return;

        }
        if (r2 != null){
            Integer temp = r1.getSeq();
            r1.setSeq(r2.getSeq());
            r2.setSeq(temp);
            researcherDao.update(r1.getId(),r1);
            researcherDao.update(r2.getId(),r2);
        }

    }
}
