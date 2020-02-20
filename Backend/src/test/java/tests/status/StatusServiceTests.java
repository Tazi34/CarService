package tests.status;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.server.ResponseStatusException;
import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.reservation.ReservationData;
import com.tazi34.carservice.status.StatusRepository;
import com.tazi34.carservice.status.StatusService;

import java.util.Calendar;
import java.util.Date;

import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
public class StatusServiceTests {
    @Mock
    StatusRepository statusRepository;

    @Mock
    CarService carService;

    @InjectMocks
    private StatusService statusService;


    @Rule
    public final ExpectedException expectedException = ExpectedException.none();




    @Test
    public void saveReservation_givenReservationWithFromDateBeforeCurrentDate_throwsBadRequest(){
        //Create reservation with date before current date
        Car car = new Car();
        car.setId(3l);
        ReservationData reservationData = new ReservationData();
        reservationData.setCarId(car.getId());
        Calendar cal  = Calendar.getInstance();
        cal.add(Calendar.DATE,(-1));
        System.out.println(cal.getTime());
        Date badDate = cal.getTime();

        reservationData.setFromDate(badDate);
        when(carService.getCar(car.getId())).thenReturn(car);

        expectedException.expect(ResponseStatusException.class);
        expectedException.expectMessage("400 BAD_REQUEST \"Wrong date\"");

        statusService.saveReservation(reservationData);
    }
    @Test
    public void saveReservation_givenReservationWithUnavailableCar_throwsNotFound(){
        Car car = new Car();
        car.setId(3l);
        ReservationData reservationData = new ReservationData();
        reservationData.setCarId(car.getId());
        Calendar cal  = Calendar.getInstance();
        cal.add(Calendar.DATE,(1));
        Date fromDate = cal.getTime();
        cal.add(Calendar.DATE,(1));
        Date toDate = cal.getTime();

        reservationData.setFromDate(fromDate);
        reservationData.setToDate(toDate);
        when(carService.getCar(car.getId())).thenReturn(car);
        when(carService.checkIfAvailable(car,reservationData.getFromDate(), reservationData.getToDate())).thenReturn(false);

        expectedException.expect(ResponseStatusException.class);
        expectedException.expectMessage("404 NOT_FOUND \"Car is not available or does not exist.\"");

        statusService.saveReservation(reservationData);
    }
}
