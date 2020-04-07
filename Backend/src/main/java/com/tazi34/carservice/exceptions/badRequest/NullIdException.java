package com.tazi34.carservice.exceptions.badRequest;

public class NullIdException extends BadRequestException {

    public NullIdException(String reason) {
        super("Id cannot be null");
    }
}
