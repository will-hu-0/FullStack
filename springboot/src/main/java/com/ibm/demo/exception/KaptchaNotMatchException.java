package com.ibm.demo.exception;

public class KaptchaNotMatchException extends RuntimeException {

    public KaptchaNotMatchException() {
        super("Captcha not match, please re enter.");
    }
}
