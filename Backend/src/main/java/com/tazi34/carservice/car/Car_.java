package com.tazi34.carservice.car;


import com.tazi34.carservice.carlocation.spot.Spot;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import java.math.BigDecimal;

@StaticMetamodel(Car.class)
public class Car_ {
    public static volatile SingularAttribute<Car,Long> id;
    public static volatile SingularAttribute<Car, String> model;
    public static volatile SingularAttribute<Car, String> make;
    public static volatile SingularAttribute<Car, Integer> seats;
    public static volatile SingularAttribute<Car,Integer> year;
    public static volatile SingularAttribute<Car, String> licence;
    public static volatile SingularAttribute<Car, Spot> spot;
    public static volatile SingularAttribute<Car,Boolean> active;
    public static volatile SingularAttribute<Car, BigDecimal> price;

}
