package tests.car;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import com.tazi34.carservice.CarServiceApplication;
import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarRepository;
import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusRepository;
import com.tazi34.carservice.status.StatusType;

import javax.transaction.Transactional;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static utilities.CarsTestsUtility.getCarsWithoutId;
import static utilities.CarsTestsUtility.getDummyCar;

@RunWith(SpringRunner.class)
@Transactional
@ActiveProfiles("test")
@SpringBootTest(classes = CarServiceApplication.class)
public class CarTests {


    @Autowired
    private CarService carService;
    @Autowired
    private CarRepository carRepository;
    @Autowired
    StatusRepository statusRepository;
    @Before
    public void init(){
        statusRepository.deleteAll();
        carRepository.deleteAll();
    }

    @Test
    public void getAvailabilitySpec_givenBookedStatusWhichCollidesWithCarAvailabilityDateSpan_returnEmptyList(){
        Car car = getDummyCar();
        carRepository.save(car);

        //status booked
        Calendar cal =Calendar.getInstance();
        Date from = cal.getTime();
        cal.add(Calendar.DATE,1);
        Date to = cal.getTime();
        StatusType type = StatusType.BOOKED;
        Status status = new Status();
        status.setCar(car);
        status.setDateFrom(from);
        status.setDateTo(to);
        status.setType(type);

        statusRepository.save(status);
        List<Car> found = carRepository.findAll(carService.getAvailabilitySpec(from,to,true));

        assertEquals(true,found.isEmpty());
    }
    @Test
    public void getAvailabilitySpec_givenUnavailableStatusWhichCollidesWithCarAvailabilityDateSpan_returnEmptyList(){
        Car car = getDummyCar();
        carRepository.save(car);

        //status booked
        Calendar cal =Calendar.getInstance();
        Date from = cal.getTime();
        cal.add(Calendar.DATE,1);
        Date to = cal.getTime();
        StatusType type = StatusType.UNAVAILABLE;
        Status status = new Status();
        status.setCar(car);
        status.setDateFrom(from);
        status.setDateTo(to);
        status.setType(type);

        statusRepository.save(status);
        List<Car> found = carRepository.findAll(carService.getAvailabilitySpec(from,to,true));

        assertEquals(true,found.isEmpty());
    }

    @Test
    public void getAvailabilitySpec_givenBookingCanceledStatusWhichCollidesWithCarAvailabilityDateSpan_returnAvailableCar(){
        Car car = getDummyCar();
        carRepository.save(car);

        //status booked
        Calendar cal =Calendar.getInstance();
        Date from = cal.getTime();
        cal.add(Calendar.DATE,1);
        Date to = cal.getTime();
        StatusType type = StatusType.BOOKINGCANCELED;
        Status status = new Status();
        status.setCar(car);
        status.setDateFrom(from);
        status.setDateTo(to);
        status.setType(type);

        statusRepository.save(status);
        List<Car> found = carRepository.findAll(carService.getAvailabilitySpec(from,to,true));

        assertEquals(1,found.size());
        assertEquals(true,found.contains(car));
    }

    @Test
    public void getAvailabilitySpec_givenBookingCanceledAndBookedStatusesWhichCollideWithCarAvailabilityDateSpan_returnEmptyList(){
        Car car = getDummyCar();
        carRepository.save(car);

        //status booked
        Calendar cal =Calendar.getInstance();
        Date from = cal.getTime();
        cal.add(Calendar.DATE,1);
        Date to = cal.getTime();
        StatusType type = StatusType.BOOKINGCANCELED;

        Date from2 = cal.getTime();
        cal.add(Calendar.DATE,1);
        Date to2 = cal.getTime();
        StatusType type2 = StatusType.BOOKED;


        Status status = new Status();
        status.setCar(car);
        status.setDateFrom(from);
        status.setDateTo(to);
        status.setType(type);

        Status status2 = new Status();
        status2.setCar(car);
        status2.setDateFrom(from2);
        status2.setDateTo(to2);
        status2.setType(type2);

        statusRepository.save(status);
        statusRepository.save(status2);
        List<Car> found = carRepository.findAll(carService.getAvailabilitySpec(from,to2,true));

        assertEquals(true,found.isEmpty());

    }

    @Test
    public void getAvailabilitySpec_givenListOfAllTypesOfStatuses_returnListOfAvailableCars(){
        List<Car> cars = getCarsWithoutId();
        carRepository.saveAll(cars);

        //booked car0
        Calendar cal =Calendar.getInstance();
        Date from = cal.getTime();
        cal.add(Calendar.DATE,1);
        Date to = cal.getTime();
        StatusType type = StatusType.BOOKED;

        Status status = new Status();
        status.setCar(cars.get(0));
        status.setDateFrom(from);
        status.setDateTo(to);
        status.setType(type);


        //booking canceled for car1
        Date from2 = cal.getTime();
        cal.add(Calendar.DATE,1);
        Date to2 = cal.getTime();
        StatusType type2 = StatusType.BOOKINGCANCELED;



        Status status2 = new Status();
        status2.setCar(cars.get(1));
        status2.setDateFrom(from2);
        status2.setDateTo(to2);
        status2.setType(type2);

        statusRepository.save(status);
        statusRepository.save(status2);
        List<Car> found = carRepository.findAll(carService.getAvailabilitySpec(from,to2,true));

        assertEquals(2,found.size());
        assertEquals(true,found.contains(cars.get(1)));
        assertEquals(true,found.contains(cars.get(2)));

    }
}
