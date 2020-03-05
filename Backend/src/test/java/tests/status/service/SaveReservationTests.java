package tests.status.service;

import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.carReservation.CarReservation;
import com.tazi34.carservice.carReservation.ReservationDateChecker;
import com.tazi34.carservice.status.StatusRepository;
import com.tazi34.carservice.status.StatusService;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.server.ResponseStatusException;

import java.util.Calendar;
import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static utilities.DummyValues.getDummyClientInfoDTO;

@RunWith(SpringRunner.class)
public class SaveReservationTests {
    @Rule
    public final ExpectedException expectedException = ExpectedException.none();
    @Mock
    StatusRepository statusRepository;
    @Mock
    CarService carService;
    @InjectMocks
    private StatusService statusService;

    @Mock
    Car mockedCar;

    @Mock
    CarReservation mockedReservation;

    @Before
    public void init(){
        long mockedCarId = 1;
        var mockedDateChecker = Mockito.mock(ReservationDateChecker.class);
        statusService.setReservationDateChecker(mockedDateChecker);
        when(mockedReservation.getCarId()).thenReturn(mockedCarId);
        when(carService.getCar(mockedCarId)).thenReturn(mockedCar);
    }

    @Test
    public void givenReservationWithInvalidDate_throwsBadRequest() {
        //GIVEN
        var mockedDateChecker = statusService.getReservationDateChecker();
        when(mockedDateChecker.checkIfCorrectDate(any(),any())).thenReturn(false);

        expectedException.expect(ResponseStatusException.class);
        statusService.saveReservation(mockedReservation);
    }

    @Test
    public void givenReservationWithUnavailableCar_throwsNotFound() {
        var mockedDateChecker = statusService.getReservationDateChecker();
        when(mockedDateChecker.checkIfCorrectDate(any(),any())).thenReturn(true);
        when(carService.checkIfAvailable(any(),any(),any())).thenReturn(false);

        expectedException.expect(ResponseStatusException.class);
        statusService.saveReservation(mockedReservation);
    }


}
