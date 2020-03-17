package com.tazi34.carservice.clientInfo;

import com.tazi34.carservice.clientInfo.address.AddressDTO;


public class ClientInfoDTO {
    public Long id;
    public String name;
    public String surname;
    public String email;
    public String pid;
    public String phoneNumber;
    public AddressDTO address;

    public ClientInfoDTO() {
    }

    public ClientInfoDTO(long id, String name, String surname, String email, String pid, String phoneNumber,
                         AddressDTO address) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.pid = pid;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setAddress(AddressDTO address) {
        this.address = address;
    }

    public String getSurname() {
        return surname;
    }

    public String getEmail() {
        return email;
    }

    public String getPid() {
        return pid;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public AddressDTO getAddress() {
        return address;
    }
}
