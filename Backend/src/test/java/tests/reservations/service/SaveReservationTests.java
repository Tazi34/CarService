package tests.reservations.service;

import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.carReservation.CarReservation;
import com.tazi34.carservice.carReservation.ReservationDateChecker;
import com.tazi34.carservice.carReservation.ReservationService;
import com.tazi34.carservice.carReservation.price.PriceCalculator;
import com.tazi34.carservice.carlocation.spot.Spot;
import com.tazi34.carservice.carlocation.spot.SpotService;
import com.tazi34.carservice.clientInfo.ClientInfo;
import com.tazi34.carservice.clientInfo.ClientInfoService;
import com.tazi34.carservice.exceptions.InvalidReservationPriceReceivedException;
import com.tazi34.carservice.exceptions.badRequest.BadRequestException;
import com.tazi34.carservice.status.StatusService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigDecimal;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
public class SaveReservationTests {
    @Mock
    ReservationDateChecker reservationDateChecker;
    @Mock
    CarService carService;
    @Mock
    Car mockedCar;
    @Mock
    ClientInfoService clientInfoService;
    @Mock
    StatusService statusService;
    @Mock
    SpotService spotService;
    @Mock
    CarReservation mockedReservation;
    @Mock
    PriceCalculator priceCalculator;
    @InjectMocks
    private ReservationService reservationService;

    @Before
    public void init() {
        long mockedCarId = 1;
        when(mockedReservation.getCarId()).thenReturn(mockedCarId);
        when(carService.getCar(mockedCarId)).thenReturn(mockedCar);
    }

    @Test(expected = BadRequestException.class)
    public void givenReservationWithInvalidDate_throwsBadRequest() {
        //GIVEN
        when(reservationDateChecker.checkIfCorrectDate(any(), any())).thenReturn(false);

        //WHEN
        reservationService.saveReservation(mockedReservation);

        //THEN
    }

    @Test(expected = BadRequestException.class)
    public void givenReservationWithUnavailableCar_throwsBadRequest() {
        //GIVEN
        when(reservationDateChecker.checkIfCorrectDate(any(), any())).thenReturn(true);
        when(carService.checkIfCarAvailable(any(), any(), any())).thenReturn(false);

        //WHEN
        reservationService.saveReservation(mockedReservation);

        //THEN
    }

    @Test(expected = InvalidReservationPriceReceivedException.class)
    public void givenReservationWithInvalidPrice_throwsInvalidPriceReceivedException() {
        //GIVEN
        BigDecimal receivedPrice = BigDecimal.valueOf(1000l);
        BigDecimal expectedPrice = BigDecimal.valueOf(3500l);

        when(mockedReservation.getPriceTotal()).thenReturn(receivedPrice);
        when(priceCalculator.CalculateReservationPrice(any(), any(), any())).thenReturn(expectedPrice);

        when(reservationDateChecker.checkIfCorrectDate(any(), any())).thenReturn(true);
        when(carService.checkIfCarAvailable(any(), any(), any())).thenReturn(true);

        //WHEN
        reservationService.saveReservation(mockedReservation);

        //THEN
    }

    @Test
    public void givenValidData_saveStatus() {
        //GIVEN
        BigDecimal receivedPrice = BigDecimal.valueOf(1000l);
        BigDecimal expectedPrice = BigDecimal.valueOf(1000l);
        long startSpotId = 1;
        long endSpotId = 2;
        when(mockedReservation.getEndSpotId()).thenReturn(endSpotId);
        when(mockedReservation.getStartSpotId()).thenReturn(startSpotId);
        when(mockedReservation.getPriceTotal()).thenReturn(receivedPrice);
        when(priceCalculator.CalculateReservationPrice(any(), any(), any())).thenReturn(expectedPrice);

        when(reservationDateChecker.checkIfCorrectDate(any(), any())).thenReturn(true);
        when(carService.checkIfCarAvailable(any(), any(), any())).thenReturn(true);


        var mockedStartSpot = mock(Spot.class);
        var mockedEndSpot = mock(Spot.class);
        when(spotService.getSpot(startSpotId)).thenReturn(mockedStartSpot);
        when(spotService.getSpot(endSpotId)).thenReturn(mockedEndSpot);
        when(clientInfoService.updateClientInfo(any(ClientInfo.class))).thenReturn(mock(ClientInfo.class));

        //WHEN
        reservationService.saveReservation(mockedReservation);

        //THEN
        verify(statusService, times(1)).saveStatus(any());
    }


}
