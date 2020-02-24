package com.tazi34.carservice.clientInfo.address;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "addresses")
@Data
public class Address {
    @Id
    private long id;
    @NotBlank
    private String city;
    @NotBlank
    private String postalCode;
    @NotBlank
    private String country;
    @NotBlank
    private String street;
    private String houseNumber;
}
