package com.tazi34.carservice.car;

import com.tazi34.carservice.carlocation.spot.Spot;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@Entity(name = "Cars")
@Table(name = "Cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String model;
    @NotBlank
    private String make;
    @NotNull
    private int seats;
    @NotNull
    private int year;
    @NotNull
    private int doors;
    @NotBlank
    private String licence;

    @ManyToOne
    @JoinColumn(name="spot_id")
    private Spot spot;
    @NotNull
    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal price;
    @Column(name = "is_active")
    private boolean active;







}
