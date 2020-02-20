package tests.status;

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
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusRepository;
import com.tazi34.carservice.status.StatusType;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static com.tazi34.carservice.status.StatusSpecifications.collidesWithDateSpan;

@RunWith(SpringRunner.class)
@Transactional
@ActiveProfiles("test")
@SpringBootTest(classes = CarServiceApplication.class)
public class StatusSpecTests {

    @Autowired
    StatusRepository statusRepository;
    @Autowired
    CarRepository carRepository;

    private Status getDummyStatus(){
        return getDummyStatus(null,null);
    }
    private Status getDummyStatus(Date from, Date to){
        Status status = new Status();
        Calendar cal = Calendar.getInstance();
        status.setDateFrom(from == null ? cal.getTime() : from);
        cal.add(Calendar.DATE,1);
        status.setDateTo(to == null ? cal.getTime() : to);

        status.setType(StatusType.BOOKED);
        Car car = getDummyCar();
        status.setCar(car);
        status.setBookingUserInfo(null);
        carRepository.save(car);
        return status;
    }
    private Car getDummyCar(){
        Car car = new Car();
        car.setMake("TEST");
        car.setLicence("TEST");
        car.setLocation("TEST");
        car.setSeats(5);
        car.setPrice(new BigDecimal(100));
        car.setModel("TEST");
        return car;
    }

    @Before
    public void init(){
        statusRepository.deleteAll();
        carRepository.deleteAll();
    }

    @Test
    public void colidesWithDateSpan_givenDateWhichDoesntColideWithAnyStatus_returnsEmptyList(){
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
        calendar.add(Calendar.MONTH,2);
        Date start = calendar.getTime();
        calendar.add(Calendar.DATE,1);
        Date end = calendar.getTime();


        List<Status> statuses = new ArrayList<Status>();
        statuses.add(getDummyStatus(statusFrom1,statusTo1));
        statuses.add(getDummyStatus(statusFrom2,statusTo2));

        statusRepository.saveAll(statuses);
        List<Status> found = statusRepository.findAll(collidesWithDateSpan(start,end));
        assertEquals(true,found.isEmpty());
    }

    @Test
    public void colidesWithDateSpan_givenDateWhichStartsBeforeStatusAndEndsInItsDateSpan_returnsGivenStatus(){
        Calendar calendar = Calendar.getInstance();
        //Start date
        Date start = calendar.getTime();

        //Status fromDate
        calendar.add(Calendar.DATE,2);
        Date statusFrom = calendar.getTime();

        //End date in the middle of status dates
        calendar.add(Calendar.DATE,2);
        Date end = calendar.getTime();

        //status toDate
        calendar.add(Calendar.DATE,2);
        Date statusTo = calendar.getTime();

        List<Status> statuses = new ArrayList<Status>();
        statuses.add(getDummyStatus(statusFrom,statusTo));
        statusRepository.saveAll(statuses);

        List<Status> found = statusRepository.findAll(collidesWithDateSpan(start,end));

        assertEquals(1,found.size());
    }

    @Test
    public void colidesWithDateSpan_givenDateWhichStartsBeforeStatusAndEndsAfterDateSpan_returnsGivenStatus(){
        Calendar calendar = Calendar.getInstance();
        //Start date
        Date start = calendar.getTime();

        //Status fromDate
        calendar.add(Calendar.DATE,2);
        Date statusFrom = calendar.getTime();

        //status toDate
        calendar.add(Calendar.DATE,2);
        Date statusTo = calendar.getTime();

        //End date after status toDate
        calendar.add(Calendar.DATE,2);
        Date end = calendar.getTime();

        List<Status> statuses = new ArrayList<Status>();
        statuses.add(getDummyStatus(statusFrom,statusTo));
        statusRepository.saveAll(statuses);

        List<Status> found = statusRepository.findAll(collidesWithDateSpan(start,end));

        assertEquals(1,found.size());
    }

    @Test
    public void colidesWithDateSpan_givenDateWhichStartsInTheMiddleOfDateSpanAndEndsAfterStatusToDate_returnsGivenStatus(){
        Calendar calendar = Calendar.getInstance();

        //Status fromDate
        Date statusFrom = calendar.getTime();

        //Start date
        calendar.add(Calendar.DATE,2);
        Date start = calendar.getTime();

        //status toDate
        calendar.add(Calendar.DATE,2);
        Date statusTo = calendar.getTime();

        //End date after status toDate
        calendar.add(Calendar.DATE,2);
        Date end = calendar.getTime();

        List<Status> statuses = new ArrayList<Status>();
        statuses.add(getDummyStatus(statusFrom,statusTo));
        statusRepository.saveAll(statuses);

        List<Status> found = statusRepository.findAll(collidesWithDateSpan(start,end));

        assertEquals(1,found.size());
    }

    @Test
    public void colidesWithDateSpan_givenDateWhichIsInTheMiddleOfStatusDateSpan_returnsGivenStatus(){
        Calendar calendar = Calendar.getInstance();

        //Status fromDate
        Date statusFrom = calendar.getTime();

        //Start date
        calendar.add(Calendar.DATE,2);
        Date start = calendar.getTime();


        //End date after status toDate
        calendar.add(Calendar.DATE,2);
        Date end = calendar.getTime();

        //status toDate
        calendar.add(Calendar.DATE,2);
        Date statusTo = calendar.getTime();


        List<Status> statuses = new ArrayList<Status>();
        statuses.add(getDummyStatus(statusFrom,statusTo));
        statusRepository.saveAll(statuses);

        List<Status> found = statusRepository.findAll(collidesWithDateSpan(start,end));

        assertEquals(1,found.size());
    }

    @Test
    public void colidesWithDateSpan_givenDateWhichColidesWithEveryStatus_returnsAllStatuses(){
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
        calendar.add(Calendar.MONTH,-2);
        Date start = calendar.getTime();
        calendar.add(Calendar.MONTH,4);
        Date end = calendar.getTime();


        List<Status> statuses = new ArrayList<Status>();
        statuses.add(getDummyStatus(statusFrom1,statusTo1));
        statuses.add(getDummyStatus(statusFrom2,statusTo2));

        statusRepository.saveAll(statuses);
        List<Status> found = statusRepository.findAll(collidesWithDateSpan(start,end));
        assertEquals(statuses.size(),found.size());
    }

    @Test
    public void colidesWithDateSpan_givenDateWhichColidesWithNotEveryStatus_returnsListOfColidingStatuses(){
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


        List<Status> statuses = new ArrayList<Status>();
        Status status1 = getDummyStatus(statusFrom1,statusTo1);
        Status status2 = getDummyStatus(statusFrom2,statusTo2);
        Status status3 = getDummyStatus(statusFrom3,statusTo3);
        Status status4 = getDummyStatus(statusFrom4,statusTo4);

        statuses.add(status1);
        statuses.add(status2);
        statuses.add(status3);
        statuses.add(status4);

        statusRepository.saveAll(statuses);
        List<Status> found = statusRepository.findAll(collidesWithDateSpan(start,end));
        assertEquals(2,found.size());
        assertEquals(true,found.contains(status2));
        assertEquals(true,found.contains(status3));
    }


}
