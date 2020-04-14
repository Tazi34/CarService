package tests.car.repository;

import com.tazi34.carservice.CarServiceApplication;
import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarRepository;
import com.tazi34.carservice.status.Status;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import static com.tazi34.carservice.car.CarSpecification.isDeniedByStatuses;
import static com.tazi34.carservice.car.CarSpecification.isNotDeniedByStatuses;
import static org.junit.Assert.assertEquals;
import static utilities.CarsTestsUtility.getDummyCarsWithoutId;
import static utilities.CarsTestsUtility.getDummyCar;

@RunWith(SpringRunner.class)
@Transactional
@ActiveProfiles("test")
@SpringBootTest(classes = CarServiceApplication.class)
public class CarRepositorySpecTests {
    @Autowired
    private CarRepository carRepository;

    @Before
    public void init() {
        carRepository.deleteAll();
    }

    @Test
    public void isNotDeniedByStatuses_givenNullList_returnsAllCars() {
        //GIVEN
        List<Car> allCars = getDummyCarsWithoutId();
        carRepository.saveAll(getDummyCarsWithoutId());

        //WHEN
        List<Car> foundCars = carRepository.findAll(isNotDeniedByStatuses(null));

        //THEN
        assertEquals(allCars.size(), foundCars.size());
    }

    @Test
    public void isNotDeniedByStatuses_givenEmptyList_returnsAllCars() {
        //GIVEN
        List<Car> allCars = getDummyCarsWithoutId();
        carRepository.saveAll(getDummyCarsWithoutId());

        //WHEN
        List<Car> foundCars = carRepository.findAll(isNotDeniedByStatuses(new ArrayList<Status>()));

        //THEN
        assertEquals(allCars.size(), foundCars.size());
    }

    @Test
    public void isDeniedByStatuses_givenNullList_returnsEmptyList() {
        //GIVEN
        List<Car> allCars = getDummyCarsWithoutId();
        carRepository.saveAll(allCars);

        //WHEN
        List<Car> foundCars = carRepository.findAll(isDeniedByStatuses(null));

        //THEN
        assertEquals(0, foundCars.size());
    }

    @Test
    public void isDeniedByStatuses_givenEmptyList_returnsEmptyList() {
        //GIVEN
        carRepository.saveAll(getDummyCarsWithoutId());

        //WHEN
        List<Car> foundCars = carRepository.findAll(isDeniedByStatuses(new ArrayList<Status>()));

        //THEN
        assertEquals(0, foundCars.size());
    }

    @Test
    public void isNotDeniedByStatuses_givenStatusesWhichDontDenyAnyCar_returnsAllCars() {
        //GIVEN
        List<Car> testCars = getDummyCarsWithoutId();
        for (int i = 0; i < testCars.size(); i++) {
            testCars.get(i).setId((long) (i + 1));
        }

        carRepository.saveAll(testCars);

        int statusesCarIndexesStart = testCars.size() + 10;

        Car dummyCar1 = getDummyCar();
        dummyCar1.setId((long) (statusesCarIndexesStart));

        Car dummyCar2 = getDummyCar();
        dummyCar2.setId((long) (statusesCarIndexesStart + 1));

        Status status1 = new Status();
        status1.setCar(dummyCar1);

        Status status2 = new Status();
        status2.setCar(dummyCar2);

        List<Status> statusesWithoutTestedCars = List.of(status1, status2);

        //WHEN
        List<Car> foundCars = carRepository.findAll(isNotDeniedByStatuses(statusesWithoutTestedCars));

        //THEN
        assertEquals(testCars.size(), foundCars.size());
    }

    @Test
    public void isNotDeniedByStatuses_givenStatusesWhichDenyAllCars_returnsEmptyList() {
        //GIVEN
        List<Car> testCars = getDummyCarsWithoutId();

        carRepository.saveAll(testCars);

        List<Status> statuses = new ArrayList<Status>();
        for (int i = 0; i < testCars.size(); i++) {
            Status status = new Status();
            status.setCar(testCars.get(i));
            statuses.add(status);
        }

        //WHEN
        List<Car> foundCars = carRepository.findAll(isNotDeniedByStatuses(statuses));

        //THEN
        assertEquals(true, foundCars.isEmpty());
    }

    @Test
    public void isNotDeniedByStatuses_givenStatusesWhichDenySomeCars_returnsOnlyNotDeniedCars() {
        //GIVEN
        List<Car> testCars = getDummyCarsWithoutId();

        carRepository.saveAll(testCars);

        Car dummyCar1 = getDummyCar();
        dummyCar1.setId(Long.MAX_VALUE - 5);

        Car dummyCar2 = getDummyCar();
        dummyCar2.setId(Long.MAX_VALUE - 3);

        //statuses which deny tested cars
        Status denyingStatus1 = new Status();
        denyingStatus1.setCar(testCars.get(0));

        Status denyingStatus2 = new Status();
        denyingStatus2.setCar(testCars.get(1));

        //statuses which dont deny tested cars
        Status status1 = new Status();
        status1.setCar(dummyCar1);

        Status status2 = new Status();
        status2.setCar(dummyCar2);

        List<Status> statuses = List.of(denyingStatus1, denyingStatus2, status1, status2);

        //WHEN
        List<Car> foundCars = carRepository.findAll(isNotDeniedByStatuses(statuses));

        //THEN
        assertEquals(1, foundCars.size());
    }
}
