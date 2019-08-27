package com.ibm.demo.controller;

import com.google.code.kaptcha.Constants;
import com.ibm.demo.exception.KaptchaNotMatchException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpSession;

/**
 * @author will
 */
public class BaseController {

    final static Logger logger = LoggerFactory.getLogger(BaseController.class);

    public void validateCaptcha(String captcha, HttpSession session) throws Exception {

        String expect = (String) session.getAttribute(Constants.KAPTCHA_SESSION_KEY);

        if (expect == null || !captcha.equalsIgnoreCase(expect)) {
            throw new KaptchaNotMatchException();
        }
    }

}
