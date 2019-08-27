package com.ibm.demo.exception;

public class UserExistException extends RuntimeException {

    public UserExistException(String userName) {
        super("Username " + userName + " exists from database, please use a different username");
    }

}