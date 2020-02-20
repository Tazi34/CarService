package com.tazi34.carservice.bookingUserInfo;

public class BookingUserInfoDTO {

    private String name;
    private String surname;
    private String email;

    public BookingUserInfoDTO(String name, String surname, String email) {
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    public BookingUserInfoDTO() {
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
