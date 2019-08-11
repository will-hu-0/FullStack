package com.ibm.controller;

import com.google.code.kaptcha.Constants;

import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author will
 */
public class BaseController {

    final static Logger logger = LoggerFactory.getLogger(BaseController.class);

    public void validateCaptcha(String captcha, HttpSession session) throws Exception {

        String expect = (String) session.getAttribute(Constants.KAPTCHA_SESSION_KEY);

        if (logger.isDebugEnabled()) {
            logger.debug("expected captcha: {}, actual: {}", expect, captcha);
        }

        if (expect == null || !captcha.equalsIgnoreCase(expect)) {
            throw new Exception("Invalid captcha code.");
        }
    }

}