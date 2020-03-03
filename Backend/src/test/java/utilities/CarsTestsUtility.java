package utilities;

import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.carlocation.city.City;
import com.tazi34.carservice.carlocation.spot.Spot;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CarsTestsUtility {
    public static List<Car> getCarsWithoutId(){
        List<Car> cars = new ArrayList<Car>();


        Spot dummySpot = new Spot();


        for(int i = 0 ; i < 3 ; i++){
            Car car = new Car();
            car.setMake("TEST");
            car.setLicence("TEST");

            car.setSeats(5);
            car.setPrice(new BigDecimal(100));
            car.setModel("TEST");
            cars.add(car);
        }
        return cars;
    }
    public static  Car getDummyCar(){
        Car car = new Car();
        car.setMake("TEST");
        car.setLicence("TEST");

        car.setSeats(5);
        car.setPrice(new BigDecimal(100));
        car.setModel("TEST");
        return car;
    }
}
