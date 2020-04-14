package tests.reservations.service;

import com.tazi34.carservice.carReservation.ReservationMapper;
import com.tazi34.carservice.carReservation.ReservationService;
import com.tazi34.carservice.exceptions.notFound.ResourceNotFoundException;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusService;
import com.tazi34.carservice.status.StatusType;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
public class GetReservationTests {
    @Mock
    StatusService statusService;

    @Mock
    ReservationMapper reservationMapper;

    @InjectMocks
    ReservationService reservationService;

    @Test(expected = ResourceNotFoundException.class)
    public void givenNotMatchingId_throwNotFound() {
        //GIVEN
        long id = 1;
        when(statusService.getStatus(id)).thenThrow(new ResourceNotFoundException(Status.class));

        //WHEN
        reservationService.getReservationInfo(id);

        //THEN
    }

    @Test(expected = ResourceNotFoundException.class)
    public void givenUnavailableStatusType_throwNotFound() {
        //GIVEN
        long id = 1;
        var mockedNotBookedStatus = mock(Status.class);
        when(mockedNotBookedStatus.getType()).thenReturn(StatusType.UNAVAILABLE);
        when(statusService.getStatus(id)).thenReturn(mockedNotBookedStatus);

        //WHEN
        reservationService.getReservationInfo(id);

        //THEN
    }

    @Test
    public void givenBookedStatus_returnReservationInfo() {
        //GIVEN
        long id = 1;
        var mockedBookStatus = mock(Status.class);

        when(mockedBookStatus.getId()).thenReturn(id);
        when(mockedBookStatus.getType()).thenReturn(StatusType.BOOKED);
        when(statusService.getStatus(id)).thenReturn(mockedBookStatus);

        //WHEN
        reservationService.getReservationInfo(id);

        //THEN
        verify(reservationMapper, times(1)).map(mockedBookStatus);
    }
}
