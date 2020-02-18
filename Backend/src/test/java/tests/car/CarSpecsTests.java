package tests.car;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import pw.react.carly.CarlyApplication;
import pw.react.carly.car.Car;
import pw.react.carly.car.CarRepository;
import pw.react.carly.status.Status;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static pw.react.carly.car.CarSpecification.isDeniedByStatuses;
import static pw.react.carly.car.CarSpecification.isNotDeniedByStatuses;
import static utilities.CarsTestsUtility.getCarsWithoutId;
import static utilities.CarsTestsUtility.getDummyCar;

@RunWith(SpringRunner.class)
@Transactional
@ActiveProfiles("test")
@SpringBootTest(classes = CarlyApplication.class)
public class CarSpecsTests {

    @Autowired
    private CarRepository carRepository;



    @Before
    public void init(){
        carRepository.deleteAll();
    }



    @Test
    public void isNotDeniedByStatuses_givenNullList_returnsAllCars(){
        List<Car> allCars = getCarsWithoutId();
        carRepository.saveAll(getCarsWithoutId());
        List<Car> foundCars = carRepository.findAll(isNotDeniedByStatuses(null));
        assertEquals(allCars.size(),foundCars.size());
    }
    @Test
    public void isNotDeniedByStatuses_givenEmptyList_returnsAllCars(){
        List<Car> allCars = getCarsWithoutId();
        carRepository.saveAll(getCarsWithoutId());
        List<Car> foundCars = carRepository.findAll(isNotDeniedByStatuses(new ArrayList<Status>()));
        assertEquals(allCars.size(),foundCars.size());
    }
    @Test
    public void isDeniedByStatuses_givenNullList_returnsEmptyList(){
        List<Car> allCars = getCarsWithoutId();
        carRepository.saveAll(getCarsWithoutId());
        List<Car> foundCars = carRepository.findAll(isDeniedByStatuses(null));
        assertEquals(0,foundCars.size());
    }
    @Test
    public void isDeniedByStatuses_givenEmptyList_returnsEmptyList(){
        List<Car> allCars = getCarsWithoutId();
        carRepository.saveAll(getCarsWithoutId());
        List<Car> foundCars = carRepository.findAll(isDeniedByStatuses(new ArrayList<Status>()));
        assertEquals(0,foundCars.size());
    }
    @Test
    public void isNotDeniedByStatuses_givenStatusesWhichDontDenyAnyCar_returnsAllCars(){
        List<Car> testCars = getCarsWithoutId();
        for(int i = 0 ; i < testCars.size(); i++)
            testCars.get(i).setId((long)(i+1));

        carRepository.saveAll(testCars);

        int statusesCarIndexesStart = testCars.size() + 10;

        Car dummyCar1 = getDummyCar();
        dummyCar1.setId((long)(statusesCarIndexesStart));
        Car dummyCar2 = getDummyCar();
        dummyCar2.setId((long)(statusesCarIndexesStart+1));

        Status status1 = new Status();
        status1.setCar(dummyCar1);
        Status status2 = new Status();
        status2.setCar(dummyCar2);

        List<Status> statusesWithoutTestedCars = new ArrayList<Status>();
        statusesWithoutTestedCars.add(status1);
        statusesWithoutTestedCars.add(status2);

        List<Car> foundCars = carRepository.findAll(isNotDeniedByStatuses(statusesWithoutTestedCars));
        assertEquals(testCars.size(),foundCars.size());
    }
    @Test
    public void isNotDeniedByStatuses_givenStatusesWhichDenyAllCars_returnsEmptyList(){
        List<Car> testCars = getCarsWithoutId();

        carRepository.saveAll(testCars);

        List<Status> statuses = new ArrayList<Status>();
        for(int i = 0 ; i < testCars.size(); i++){
            Status status = new Status();
            status.setCar(testCars.get(i));
            statuses.add(status);
        }

        List<Car> foundCars = carRepository.findAll(isNotDeniedByStatuses(statuses));
        assertEquals(true,foundCars.isEmpty());
    }
    @Test
    public void isNotDeniedByStatuses_givenStatusesWhichDenySomeCars_returnsOnlyNotDeniedCars(){
        List<Car> testCars = getCarsWithoutId();

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

        List<Status> statuses = new ArrayList<Status>();
        statuses.add(denyingStatus1);
        statuses.add(denyingStatus2);
        statuses.add(status1);
        statuses.add(status2);

        List<Car> foundCars = carRepository.findAll(isNotDeniedByStatuses(statuses));
        assertEquals(1,foundCars.size());
    }



}
