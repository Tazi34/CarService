package com.tazi34.carservice.exceptions.duplicateEntity;

public class DuplicateUserMailException extends RuntimeException {
    public DuplicateUserMailException(String email) {
        super("Found more than one user with given email. Email =" + email);
    }

}
