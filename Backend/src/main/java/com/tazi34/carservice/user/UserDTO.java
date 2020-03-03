package com.tazi34.carservice.user;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserDTO {
    private final String email;
    private final long id;

    @JsonCreator(mode=JsonCreator.Mode.PROPERTIES)
    public UserDTO(@JsonProperty("id") long id,@JsonProperty("email") String email) {
        this.email = email;
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public long getId() {
        return id;
    }

}


