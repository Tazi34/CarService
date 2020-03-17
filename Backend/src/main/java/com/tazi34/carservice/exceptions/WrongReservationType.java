package com.tazi34.carservice.exceptions;

public class WrongReservationType extends RuntimeException {
    public WrongReservationType(String message) {
        super(message);
    }
}
