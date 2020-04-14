package utilities;

import com.tazi34.carservice.car.Car;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CarsTestsUtility {
    public static List<Car> getDummyCarsWithoutId() {
        List<Car> cars = new ArrayList<Car>();

        for (int i = 0; i < 3; i++) {
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

    public static Car getDummyCar() {
        Car car = new Car();
        car.setMake("TEST");
        car.setLicence("TEST");
        car.setSeats(5);
        car.setPrice(new BigDecimal(100));
        car.setModel("TEST");
        return car;
    }
}
