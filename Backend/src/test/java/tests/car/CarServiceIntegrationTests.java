package tests.car;

import com.tazi34.carservice.CarServiceApplication;
import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarRepository;
import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusRepository;
import com.tazi34.carservice.status.StatusType;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

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
public class CarServiceIntegrationTests {

    @Autowired
    private CarService carService;
    @Autowired
    private CarRepository carRepository;
    @Autowired
    StatusRepository statusRepository;

    @Before
    public void init() {
        statusRepository.deleteAll();
        carRepository.deleteAll();
    }

    @Test
    public void getAvailableCars_givenBookedStatus_returnEmptyList() {
        Car car = getDummyCar();
        carRepository.save(car);

        //status booked
        Calendar cal = Calendar.getInstance();
        Date startDate = cal.getTime();
        cal.add(Calendar.DATE, 1);
        Date endDate = cal.getTime();
        StatusType type = StatusType.BOOKED;
        Status status = new Status();
        status.setCar(car);
        status.setDateFrom(startDate);
        status.setDateTo(endDate);
        status.setType(type);

        statusRepository.save(status);
        Page<Car> found = carService.findAvailable(startDate, endDate, null, PageRequest.of(0, Integer.MAX_VALUE));

        assertEquals(true, found.isEmpty());
    }

    @Test
    public void getAvailableCars_givenUnavailableStatus_returnEmptyList() {
        Car car = getDummyCar();
        carRepository.save(car);

        //status booked
        Calendar cal = Calendar.getInstance();
        Date startDate = cal.getTime();
        cal.add(Calendar.DATE, 1);
        Date endDate = cal.getTime();
        StatusType type = StatusType.UNAVAILABLE;
        Status status = new Status();
        status.setCar(car);
        status.setDateFrom(startDate);
        status.setDateTo(endDate);
        status.setType(type);

        statusRepository.save(status);
        Page<Car> found = carService.findAvailable(startDate, endDate, null, PageRequest.of(0, Integer.MAX_VALUE));

        assertEquals(true, found.isEmpty());
    }

    @Test
    public void getAvailableCars_givenCancelledBooking_returnAvailableCar() {
        Car car = getDummyCar();
        carRepository.save(car);

        //status booking canceled
        Calendar cal = Calendar.getInstance();
        Date startDate = cal.getTime();
        cal.add(Calendar.DATE, 1);
        Date endDate = cal.getTime();
        StatusType type = StatusType.BOOKINGCANCELED;
        Status status = new Status();
        status.setCar(car);
        status.setDateFrom(startDate);
        status.setDateTo(endDate);
        status.setType(type);

        statusRepository.save(status);
        Page<Car> found = carService.findAvailable(startDate, endDate, null, PageRequest.of(0, Integer.MAX_VALUE));
        var cars = found.getContent();
        assertEquals(1, cars.size());
        assertEquals(true, cars.contains(car));
    }

    @Test
    public void getAvailable_givenBookingCancelledAndBookedStatuses_returnEmptyList() {
        Car car = getDummyCar();
        carRepository.save(car);

        //booking canceled date span
        Calendar cal = Calendar.getInstance();
        Date canceledBookingStartDate = cal.getTime();
        cal.add(Calendar.DATE, 1);
        Date canceledBookingEndDate = cal.getTime();
        StatusType type = StatusType.BOOKINGCANCELED;

        //booking date span
        Date bookingStartDate = cal.getTime();
        cal.add(Calendar.DATE, 1);
        Date bookingEndDate = cal.getTime();
        StatusType type2 = StatusType.BOOKED;

        Status status = new Status();
        status.setCar(car);
        status.setDateFrom(canceledBookingStartDate);
        status.setDateTo(canceledBookingEndDate);
        status.setType(type);

        Status status2 = new Status();
        status2.setCar(car);
        status2.setDateFrom(bookingStartDate);
        status2.setDateTo(bookingEndDate);
        status2.setType(type2);

        statusRepository.save(status);
        statusRepository.save(status2);
        List<Car> cars = carService.findAvailable(canceledBookingStartDate, canceledBookingEndDate, null,
                PageRequest.of(0, Integer.MAX_VALUE)).getContent();

        assertEquals(true, cars.isEmpty());

    }

    @Test
    public void getAvailableCars_givenStatuses_returnAvailableCars() {
        List<Car> cars = getCarsWithoutId();
        carRepository.saveAll(cars);

        //booked car0
        Calendar cal = Calendar.getInstance();
        Date bookingStartDate = cal.getTime();
        cal.add(Calendar.DATE, 1);
        Date bookingEndDate = cal.getTime();
        StatusType type = StatusType.BOOKED;

        Status status = new Status();
        status.setCar(cars.get(0));
        status.setDateFrom(bookingStartDate);
        status.setDateTo(bookingEndDate);
        status.setType(type);


        //booking canceled for car1
        Date canceledBookingStartDate = cal.getTime();
        cal.add(Calendar.DATE, 1);
        Date canceledBooingEndDate = cal.getTime();
        StatusType type2 = StatusType.BOOKINGCANCELED;


        Status status2 = new Status();
        status2.setCar(cars.get(1));
        status2.setDateFrom(canceledBookingStartDate);
        status2.setDateTo(canceledBooingEndDate);
        status2.setType(type2);

        statusRepository.save(status);
        statusRepository.save(status2);
        List<Car> found = carService.findAvailable(bookingStartDate, bookingEndDate, null, PageRequest.of(0,
                Integer.MAX_VALUE)).getContent();

        assertEquals(2, found.size());
        assertEquals(true, found.contains(cars.get(1)));
        assertEquals(true, found.contains(cars.get(2)));
    }
}
