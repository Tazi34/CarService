package com.tazi34.carservice.car;

import com.fasterxml.jackson.annotation.JsonRootName;

import java.math.BigDecimal;

@JsonRootName(value = "Car")
public class CarDTO {

    private Long id;

    private String model;
    private String make;
    private int seats;
    private int year;
    private int doors;
    private String licence;
    private String location;
    private BigDecimal price;
    private boolean available;


    public CarDTO(Long id, String model, String make, int seats, int year, int doors, String licence, String location
            , BigDecimal price, boolean available) {
        this.id = id;
        this.model = model;
        this.make = make;
        this.seats = seats;
        this.year = year;
        this.doors = doors;
        this.licence = licence;
        this.location = location;
        this.price = price;
        this.available = available;
    }

    public int getDoors() {
        return doors;
    }

    public boolean isAvailable() {
        return available;
    }

    public Long getId() {
        return id;
    }

    public String getModel() {
        return model;
    }

    public String getMake() {
        return make;
    }

    public int getSeats() {
        return seats;
    }

    public int getYear() {
        return year;
    }

    public String getLicence() {
        return licence;
    }

    public String getLocation() {
        return location;
    }

    public BigDecimal getPrice() {
        return price;
    }


}
