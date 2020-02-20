package com.tazi34.carservice.location;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @OneToMany
    private List<Spot> spots;


}
