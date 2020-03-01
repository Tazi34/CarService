package com.tazi34.carservice.user;

import lombok.AllArgsConstructor;
import lombok.Value;

import javax.validation.constraints.Email;

@Value
@AllArgsConstructor
public class UserDTO {
    @Email
    private final String email;
    private final long id;


    public String getEmail() {
        return email;
    }

    public long getId() {
        return id;
    }
}
