package com.tazi34.carservice.user;


import com.tazi34.carservice.authorization.roles.Role;

import java.util.Collection;

public class UserDTO {
    private final String email;
    private final long id;
    private final Collection<Role> roles;


    public UserDTO(long id, String email, Collection<Role> roles) {
        this.email = email;
        this.id = id;
        this.roles = roles;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public String getEmail() {
        return email;
    }

    public long getId() {
        return id;
    }

}


