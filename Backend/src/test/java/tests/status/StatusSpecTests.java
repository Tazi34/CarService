package tests.status;

import com.tazi34.carservice.CarServiceApplication;
import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarRepository;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusRepository;
import com.tazi34.carservice.status.StatusType;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static com.tazi34.carservice.status.StatusSpecifications.collidesWithDateSpan;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@Transactional
@ActiveProfiles("test")
@SpringBootTest(classes = CarServiceApplication.class)
public class StatusSpecTests {
    @Autowired
    StatusRepository statusRepository;
    @Autowired
    CarRepository carRepository;

    @Before
    public void init() {
        statusRepository.deleteAll();
        carRepository.deleteAll();
    }

    @Test
    public void collidesWithDateSpan_givenDateWhichDoesntColideWithAnyStatus_returnsEmptyList() {
        //GIVEN
        Calendar calendar = Calendar.getInstance();

        //statuses dates
        Date statusFrom1 = calendar.getTime();
        calendar.add(Calendar.DATE, 1);
        Date statusTo1 = calendar.getTime();

        calendar.add(Calendar.DATE, 1);
        Date statusFrom2 = calendar.getTime();
        calendar.add(Calendar.DATE, 1);
        Date statusTo2 = calendar.getTime();

        // Start, end dates
        calendar.add(Calendar.MONTH, 2);
        Date start = calendar.getTime();
        calendar.add(Calendar.DATE, 1);
        Date end = calendar.getTime();


        List<Status> statuses = List.of(getDummyStatus(statusFrom1, statusTo2), getDummyStatus(statusFrom2, statusTo2));
        statusRepository.saveAll(statuses);

        //WHEN
        List<Status> found = statusRepository.findAll(collidesWithDateSpan(start, end));

        //THEN
        assertTrue(found.isEmpty());
    }

    @Test
    public void collidesWithDateSpan_givenDateWhichStartsBeforeStatusAndEndsInItsDateSpan_returnsGivenStatus() {
        //GIVEN
        Calendar calendar = Calendar.getInstance();
        //Start date
        Date start = calendar.getTime();

        //Status fromDate
        calendar.add(Calendar.DATE, 2);
        Date statusFrom = calendar.getTime();

        //End date in the middle of status dates
        calendar.add(Calendar.DATE, 2);
        Date end = calendar.getTime();

        //status toDate
        calendar.add(Calendar.DATE, 2);
        Date statusTo = calendar.getTime();

        List<Status> statuses = List.of(getDummyStatus(statusFrom, statusTo));
        statusRepository.saveAll(statuses);

        //WHEN
        List<Status> found = statusRepository.findAll(collidesWithDateSpan(start, end));

        //THEN
        assertEquals(1, found.size());
    }

    @Test
    public void collidesWithDateSpan_givenDateWhichStartsBeforeStatusAndEndsAfterDateSpan_returnsGivenStatus() {
        //GIVEN
        Calendar calendar = Calendar.getInstance();
        //Start date
        Date start = calendar.getTime();

        //Status fromDate
        calendar.add(Calendar.DATE, 2);
        Date statusFrom = calendar.getTime();

        //status toDate
        calendar.add(Calendar.DATE, 2);
        Date statusTo = calendar.getTime();

        //End date after status toDate
        calendar.add(Calendar.DATE, 2);
        Date end = calendar.getTime();

        List<Status> statuses = List.of(getDummyStatus(statusFrom, statusTo));
        statusRepository.saveAll(statuses);

        //WHEN
        List<Status> found = statusRepository.findAll(collidesWithDateSpan(start, end));

        //THEN
        assertEquals(1, found.size());
    }

    @Test
    public void collidesWithDateSpan_givenDateWhichStartsInTheMiddleOfDateSpanAndEndsAfterStatusToDate_returnsGivenStatus() {
        //GIVEN
        Calendar calendar = Calendar.getInstance();

        //Status fromDate
        Date statusFrom = calendar.getTime();

        //Start date
        calendar.add(Calendar.DATE, 2);
        Date start = calendar.getTime();

        //status toDate
        calendar.add(Calendar.DATE, 2);
        Date statusTo = calendar.getTime();

        //End date after status toDate
        calendar.add(Calendar.DATE, 2);
        Date end = calendar.getTime();

        List<Status> statuses = List.of(getDummyStatus(statusFrom, statusTo));
        statusRepository.saveAll(statuses);

        //WHEN
        List<Status> found = statusRepository.findAll(collidesWithDateSpan(start, end));

        //THEN
        assertEquals(1, found.size());
    }

    @Test
    public void collidesWithDateSpan_givenDateWhichIsInTheMiddleOfStatusDateSpan_returnGivenStatus() {
        //GIVEN
        Calendar calendar = Calendar.getInstance();

        //Status fromDate
        Date statusFrom = calendar.getTime();

        //Start date
        calendar.add(Calendar.DATE, 2);
        Date start = calendar.getTime();

        //End date after status toDate
        calendar.add(Calendar.DATE, 2);
        Date end = calendar.getTime();

        //status toDate
        calendar.add(Calendar.DATE, 2);
        Date statusTo = calendar.getTime();

        List<Status> statuses = List.of(getDummyStatus(statusFrom, statusTo));
        statusRepository.saveAll(statuses);

        //WHEN
        List<Status> found = statusRepository.findAll(collidesWithDateSpan(start, end));

        //THEN
        assertEquals(1, found.size());
    }

    @Test
    public void collidesWithDateSpan_givenDateWhichCollidesWithEveryStatus_returnAllStatuses() {
        //GIVEN
        Calendar calendar = Calendar.getInstance();

        //statuses dates
        Date statusFrom1 = calendar.getTime();
        calendar.add(Calendar.DATE, 1);
        Date statusTo1 = calendar.getTime();

        calendar.add(Calendar.DATE, 1);
        Date statusFrom2 = calendar.getTime();
        calendar.add(Calendar.DATE, 1);
        Date statusTo2 = calendar.getTime();

        // Start, end dates
        calendar.add(Calendar.MONTH, -2);
        Date start = calendar.getTime();
        calendar.add(Calendar.MONTH, 4);
        Date end = calendar.getTime();


        List<Status> statuses = List.of(getDummyStatus(statusFrom1, statusTo1), getDummyStatus(statusFrom2, statusTo2));
        statusRepository.saveAll(statuses);

        //WHEN
        List<Status> found = statusRepository.findAll(collidesWithDateSpan(start, end));

        //THEN
        assertEquals(statuses.size(), found.size());
    }

    @Test
    public void collidesWithDateSpan_givenDateWhichCollidesWithNotEveryStatus_returnsListOfCollidingStatuses() {
        //GIVEN
        Calendar calendar = Calendar.getInstance();

        //statuses dates
        Date statusFrom1 = calendar.getTime();
        calendar.add(Calendar.DATE, 1);
        Date statusTo1 = calendar.getTime();
        calendar.add(Calendar.DATE, 1);

        //START
        Date start = calendar.getTime();

        calendar.add(Calendar.DATE, 1);
        Date statusFrom2 = calendar.getTime();
        calendar.add(Calendar.DATE, 1);
        Date statusTo2 = calendar.getTime();

        Date statusFrom3 = calendar.getTime();

        //END
        calendar.add(Calendar.DATE, 1);
        Date end = calendar.getTime();

        calendar.add(Calendar.DATE, 1);
        Date statusTo3 = calendar.getTime();

        calendar.add(Calendar.DATE, 1);
        Date statusFrom4 = calendar.getTime();
        calendar.add(Calendar.DATE, 1);
        Date statusTo4 = calendar.getTime();

        Status status1 = getDummyStatus(statusFrom1, statusTo1);
        Status status2 = getDummyStatus(statusFrom2, statusTo2);
        Status status3 = getDummyStatus(statusFrom3, statusTo3);
        Status status4 = getDummyStatus(statusFrom4, statusTo4);

        List<Status> statuses = List.of(status1, status2, status3, status4);
        statusRepository.saveAll(statuses);

        //WHEN
        List<Status> found = statusRepository.findAll(collidesWithDateSpan(start, end));

        //THEN
        assertEquals(2, found.size());
        assertEquals(true, found.contains(status2));
        assertEquals(true, found.contains(status3));
    }

    private Status getDummyStatus(Date from, Date to) {
        Status status = new Status();
        Calendar cal = Calendar.getInstance();
        status.setDateFrom(from == null ? cal.getTime() : from);
        cal.add(Calendar.DATE, 1);
        status.setDateTo(to == null ? cal.getTime() : to);

        status.setType(StatusType.BOOKED);
        Car car = getDummyCar();
        status.setCar(car);
        status.setClientInfo(null);
        carRepository.save(car);
        return status;
    }

    private Car getDummyCar() {
        Car car = new Car();
        car.setMake("TEST");
        car.setLicence("TEST");

        car.setSeats(5);
        car.setPrice(new BigDecimal(100));
        car.setModel("TEST");
        return car;
    }
}
