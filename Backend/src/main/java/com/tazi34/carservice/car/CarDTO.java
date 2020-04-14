package com.tazi34.carservice.car;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@JsonRootName(value = "car")
public class CarDTO {
    private Long id;
    private int doors;
    private String model;
    private String make;
    private int seats;
    private int year;
    private boolean active;
    private boolean available;
    private String licence;
    private String location;
    @NotNull
    private BigDecimal price;

    public CarDTO() {
    }
}
