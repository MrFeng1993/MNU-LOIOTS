package com.mnu.loiots.utils;

import com.mnu.loiots.dto.MediaSaveReturnDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
public class MediaUpOrDownloadUtil {

    public static List<File> searchFiles(File folder, final String keyword) {
        List<File> result = new ArrayList<File>();
        if (folder.isFile())
            result.add(folder);

        File[] subFolders = folder.listFiles(new FileFilter() {
            @Override public boolean accept(File file) {
                if (file.isDirectory()) {
                    return true;
                }
                if (file.getName().contains(keyword)) {
                    return true;
                }
                return false;
            }
        });
        if (subFolders != null) {
            for (File file : subFolders) {
                if (file.isFile()) {
                    // 如果是文件则将文件添加到结果列表中
                    result.add(file);
                } else {
                    // 如果是文件夹，则递归调用本方法，然后把所有的文件加到结果列表中
                    result.addAll(searchFiles(file, keyword));
                }
            }
        }
        return result;
    }

    /**
     * 删除文件
     * @param file 父级目录
     * @param keyword 文件名
     * @return 是否成功删除
     */
    public static boolean deleteFile(File file, final String keyword) {
        boolean result = false;
        if (file.exists()) {
            List<File> files = searchFiles(file,keyword);
            if (files != null && files.size() > 0){
                for (File file1 : files) {
                    file1.delete();
                }
                result = true;
            }
            log.info(files.size() + "个文件已经被成功删除");
        }
        return result;
    }

    /**
     * 保存图片，返回文件名
     * @param file
     * @param parentPath
     * @return
     */
    public static MediaSaveReturnDto saveMedia(MultipartFile file, String parentPath) throws IOException {
        //为每个文件生成一个新的文件名长度为8
        String mediaName = UUID.randomUUID().toString().replace("-", "").substring(0,8);
        //取文件扩展名
        String oriName = file.getOriginalFilename();
        String extName = oriName.substring(oriName.lastIndexOf("."));

        File parentFile = new File(parentPath);
        if (!parentFile.exists()) {
            parentFile.mkdirs();
        }
        String path =  parentPath+ mediaName + extName;
        //保存文件(把内存中的图片保存到磁盘)
        file.transferTo(new File(path));
        MediaSaveReturnDto ret = new MediaSaveReturnDto(mediaName,extName);
        return ret;
    }
}

    
