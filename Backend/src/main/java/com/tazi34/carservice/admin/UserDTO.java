package com.tazi34.carservice.admin;

import javax.validation.constraints.Email;

public class AdminDTO {
    @Email
    private String email;
    private long id;



    public AdminDTO(@Email String email,long id) {
        this.id = id;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public long getId() {
        return id;
    }
}
