package com.tazi34.carservice.clientInfo.address;

public class AddressDTO {
    private String city;
    private String postalCode;
    private String country;
    private String street;
    private String houseNumber;
    private Long id;

    public AddressDTO() {
    }

    public AddressDTO(long id, String city, String postalCode, String country, String street, String houseNumber) {
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
        this.street = street;
        this.houseNumber = houseNumber;
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }
}
