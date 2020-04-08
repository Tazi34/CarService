package tests.status.service;


import com.tazi34.carservice.carReservation.ReservationService;
import com.tazi34.carservice.exceptions.badRequest.BadRequestException;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusService;
import com.tazi34.carservice.status.StatusType;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
public class CancelReservationTests {
    @Mock
    StatusService statusService;

    @InjectMocks
    ReservationService reservationService;

    @Test(expected = BadRequestException.class)
    public void cancelReservation_givenBookingCanceledStatus_throwBadRequestException() {
        //GIVEN
        Long id = 1L;
        var status = mock(Status.class);
        when(status.getType()).thenReturn(StatusType.BOOKINGCANCELED);
        when(status.getId()).thenReturn(id);
        when(statusService.getStatus(any())).thenReturn(status);

        //WHEN
        reservationService.cancelReservation(id);

        //THEN
    }

    @Test(expected = BadRequestException.class)
    public void cancelReservation_givenUnavailableStatus_throwBadRequestException() {
        //GIVEN
        Long id = 1L;
        var status = mock(Status.class);
        when(status.getType()).thenReturn(StatusType.UNAVAILABLE);
        when(status.getId()).thenReturn(id);
        when(statusService.getStatus(any())).thenReturn(status);

        //WHEN
        reservationService.cancelReservation(id);

        //THEN
    }

    @Test
    public void cancelReservation_givenReservation_saveBookingCanceledStatus() {
        //GIVEN

        Long id = 1L;
        var status = mock(Status.class);
        when(statusService.getStatus(id)).thenReturn(status);
        when(status.getType()).thenCallRealMethod();
        doCallRealMethod().when(status).setType(any());
        status.setType(StatusType.BOOKED);

        //WHEN
        reservationService.cancelReservation(id);

        //THEN
        verify(statusService, times(1)).updateStatus(argThat(s -> s.getType() == StatusType.BOOKINGCANCELED));
    }
}
