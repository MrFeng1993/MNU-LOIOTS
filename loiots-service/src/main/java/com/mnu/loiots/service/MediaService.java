package com.mnu.loiots.service;

import com.mnu.loiots.dao.IMediaDao;
import com.mnu.loiots.dao.IMyUserDao;
import com.mnu.loiots.dto.MediaSaveReturnDto;
import com.mnu.loiots.dto.MediaUploadDto;
import com.mnu.loiots.entity.MediaInfo;
import com.mnu.loiots.utils.MediaUpOrDownloadUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.Date;

@Slf4j
@Service
public class MediaService {


    @Value("${loiots.config.oss.media.path}")
    private String mediaPath;

    @Value("${loiots.config.oss.host}")
    private String urlHost;



    @Resource
    private IMediaDao mediaDao;



    /**
     * 保存文件并且返回文件访问链接
     * @param param
     * @return
     */
    public String uploadMedia(MediaUploadDto param) throws IOException {

        Assert.notNull(param,"文件上传参数错误");
        MultipartFile file = param.getFile();
        Assert.notNull(file,"上传文件不能为空");
        String mark = param.getMark();
        MediaSaveReturnDto result = MediaUpOrDownloadUtil.saveMedia(file, mediaPath);
        if (result != null){
            MediaInfo info = new MediaInfo();
            info.setFileName(result.getFileName());
            info.setUploadTime(new Date());
            info.setFileExt(result.getFileExt());
            info.setMark(StringUtils.hasLength(mark) ? mark + "_" + result.getFileName() : result.getFileName());
            String url = urlHost + result.getFileName() + result.getFileExt();
            info.setFileLink(url);
            mediaDao.save(info);
            return url;
        }else {
            throw new IllegalArgumentException("文件上传未知错误！");
        }

    }

    /**
     * 单个媒体删除
     * @param id
     */
    @Transactional
    public void deleteOne(Long id) {

        if (mediaDao.existsById(id)){
            MediaInfo info = mediaDao.findOne(id);
            //先从数据库删除
            mediaDao.deleteById(id);
            //再从文件系统中删除
            String fileParentPath = mediaPath;
            File parentFile = new File(fileParentPath);
            MediaUpOrDownloadUtil.deleteFile(parentFile,info.getFileName());
            log.info(info.getFileName() + info.getFileExt() + "文件删除成功");
        }
    }
}
