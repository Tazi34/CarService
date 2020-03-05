package com.tazi34.carservice.Exceptions.notFound;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ResourceNotFoundException extends ResponseStatusException {
    public ResourceNotFoundException(Class classObject) {
        super(HttpStatus.NOT_FOUND, classObject.getName()  + " not found");
    }
}
