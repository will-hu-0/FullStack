package com.ibm.demo.exception;

public class UserNotExistException extends RuntimeException {

    public UserNotExistException(String userName) {
        super("Username " + userName + " does not exist from database, please register first.");
    }

}
