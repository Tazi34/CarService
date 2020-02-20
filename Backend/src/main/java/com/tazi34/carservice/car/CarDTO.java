package com.tazi34.carservice.car;

import com.fasterxml.jackson.annotation.JsonRootName;

import java.math.BigDecimal;

@JsonRootName(value = "Car")
public class CarDTO {

    private String model;
    private String make;
    private int seats;
    private int year;
    private String licence;
    private String location;
    private BigDecimal price;

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

    public void setModel(String model) {
        this.model = model;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public void setLicence(String licence) {
        this.licence = licence;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
