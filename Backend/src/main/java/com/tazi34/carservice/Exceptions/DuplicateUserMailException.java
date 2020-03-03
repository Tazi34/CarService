package com.tazi34.carservice.Exceptions;

public class DuplicateUserMailException extends  RuntimeException {
    public DuplicateUserMailException(String email) {
        super("Found more than one user with given email. Email =" + email);
    }

}
