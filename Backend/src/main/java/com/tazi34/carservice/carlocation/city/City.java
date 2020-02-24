package com.tazi34.carservice.carlocation.city;

import com.tazi34.carservice.carlocation.spot.Spot;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "cities")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @OneToMany(mappedBy="city")
    private List<Spot> spots;


}
