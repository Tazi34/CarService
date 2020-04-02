package tests.status.service;

import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.carReservation.CarReservation;
import com.tazi34.carservice.carReservation.ReservationDateChecker;
import com.tazi34.carservice.exceptions.BadRequestException;
import com.tazi34.carservice.status.StatusService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class SaveReservationTests {
    @Mock
    ReservationDateChecker reservationDateChecker;
    @Mock
    CarService carService;
    @Mock
    Car mockedCar;
    @Mock
    CarReservation mockedReservation;
    @InjectMocks
    private StatusService statusService;

    @Before
    public void init(){
        long mockedCarId = 1;
        when(mockedReservation.getCarId()).thenReturn(mockedCarId);
        when(carService.getCar(mockedCarId)).thenReturn(mockedCar);
    }

    @Test(expected = BadRequestException.class)
    public void givenReservationWithInvalidDate_throwsBadRequest() {
        //GIVEN
        when(reservationDateChecker.checkIfCorrectDate(any(),any())).thenReturn(false);

        //WHEN
        statusService.saveReservation(mockedReservation);

        //THEN
    }

    @Test(expected = BadRequestException.class)
    public void givenReservationWithUnavailableCar_throwsBadRequest() {
        //GIVEN
        when(reservationDateChecker.checkIfCorrectDate(any(),any())).thenReturn(true);
        when(carService.checkIfAvailable(any(),any(),any())).thenReturn(false);

        //WHEN
        statusService.saveReservation(mockedReservation);

        //THEN
    }


}
