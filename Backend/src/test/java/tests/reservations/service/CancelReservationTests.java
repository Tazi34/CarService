package tests.reservations.service;

import com.tazi34.carservice.carReservation.ReservationService;
import com.tazi34.carservice.exceptions.badRequest.BadRequestException;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusService;
import com.tazi34.carservice.status.StatusType;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class CancelReservationTests {
    @Mock
    StatusService statusService;
    @InjectMocks
    ReservationService reservationService;

    @Test(expected = BadRequestException.class)
    public void givenUnavailableStatus_throwBadRequest() {
        //GIVEN
        var id = 1l;
        var mockedStatus = mock(Status.class);
        when(statusService.getStatus(id)).thenReturn(mockedStatus);
        when(mockedStatus.getType()).thenReturn(StatusType.UNAVAILABLE);

        //WHEN
        reservationService.cancelReservation(id);

        //THEN
    }

    @Test(expected = BadRequestException.class)
    public void givenBookingCanceled_throwBadRequest() {
        //GIVEN
        var id = 1l;
        var mockedStatus = mock(Status.class);
        when(statusService.getStatus(id)).thenReturn(mockedStatus);
        when(mockedStatus.getType()).thenReturn(StatusType.BOOKINGCANCELED);

        //WHEN
        reservationService.cancelReservation(id);

        //THEN
    }

    @Test(expected = BadRequestException.class)
    public void givenBookedReservation_throwBadRequest() {
        var id = 1l;
        var mockedStatus = mock(Status.class);
        when(statusService.getStatus(id)).thenReturn(mockedStatus);
        when(mockedStatus.getType()).thenReturn(StatusType.BOOKINGCANCELED);

        reservationService.cancelReservation(id);
    }
}
