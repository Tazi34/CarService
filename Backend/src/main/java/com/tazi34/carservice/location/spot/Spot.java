package com.tazi34.carservice.location.spot;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tazi34.carservice.location.city.City;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@Table(name = "spot")
public class Spot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotNull
    @ManyToOne
    @JoinColumn(name="city_id", nullable=false)
    @JsonIgnore
    private City city;
    @NotNull
    private String name;
}
