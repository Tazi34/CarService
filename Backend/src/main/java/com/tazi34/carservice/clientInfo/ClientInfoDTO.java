package com.tazi34.carservice.clientInfo;

public class ClientInfoDTO {

    private String name;
    private String surname;
    private String email;

    public ClientInfoDTO(String name, String surname, String email) {
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    public ClientInfoDTO() {
    }

    public String getName() {
        return name;
    }



    public String getSurname() {
        return surname;
    }



    public String getEmail() {
        return email;
    }


}
