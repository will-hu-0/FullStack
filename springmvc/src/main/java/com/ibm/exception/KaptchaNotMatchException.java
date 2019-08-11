package com.ibm.exception;

public class KaptchaNotMatchException extends RuntimeException {

    public KaptchaNotMatchException() {
        super("Captcha not match, please re enter.");
    }
}