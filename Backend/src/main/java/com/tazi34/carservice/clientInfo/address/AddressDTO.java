package com.tazi34.carservice.clientInfo.address;

import lombok.Value;

@Value
public class AddressDTO {
    private String city;
    private String postalCode;
    private String country;
    private String street;
    private String houseNumber;
}
