package com.mnu.sosm;

import com.alibaba.fastjson.JSON;
import com.mnu.sosm.utils.JsonModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@Slf4j
public class TestController {

    @RequestMapping(value = "/")
    public JsonModel test1(HttpServletRequest req, HttpSession httpSession){

        try {
            HttpSession session = req.getSession();
            log.info(httpSession.getAttribute("roleCode").toString());;
//        session.getAttribute()
            return new JsonModel(true,"登录成功", JSON.toJSONString(session));
        } catch (Exception e) {
            log.error("这里有错误" ,e);
            return new JsonModel(false,"登录失败");
        }
    }
}
