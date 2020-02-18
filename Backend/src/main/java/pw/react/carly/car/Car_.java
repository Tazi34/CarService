package pw.react.carly.car;


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
    public static volatile SingularAttribute<Car,String> location;
    public static volatile SingularAttribute<Car,Boolean> isActive;
    public static volatile SingularAttribute<Car, BigDecimal> price;

}
