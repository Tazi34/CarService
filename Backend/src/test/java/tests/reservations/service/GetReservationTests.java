package tests.reservations.service;

import com.tazi34.carservice.carReservation.ReservationInfo;
import com.tazi34.carservice.carReservation.ReservationMapper;
import com.tazi34.carservice.carReservation.ReservationService;
import com.tazi34.carservice.clientInfo.ClientInfoService;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusService;
import com.tazi34.carservice.status.StatusType;
import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class GetReservationTests {

    @Mock
    StatusService statusService;

    @Mock
    ClientInfoService clientInfoService;

    @InjectMocks
    ReservationService reservationService;
    @Rule
    public ExpectedException expectedException = ExpectedException.none();
    @Test
    public void givenNotMatchingId_throwNotFound(){
        long id = 1;
        //status not found - not the one we are looking for
        when(statusService.getStatus(id)).thenThrow(new ResourceNotFoundException());

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("Reservation not found.");

        reservationService.getReservationInfo(id);
    }
    @Test
    public void givenUnavailableStatusType_throwNotFound(){
        long id = 1;
        var mockedNotBookedStatus = mock(Status.class);
        when(mockedNotBookedStatus.getType()).thenReturn(StatusType.UNAVAILABLE);
        when(statusService.getStatus(id)).thenReturn(mockedNotBookedStatus);

        expectedException.expect(ResourceNotFoundException.class);
        var reservation = reservationService.getReservationInfo(id);
    }

    @Test
    public void givenBookedStatus_returnReservationInfo(){
        long id = 1;
        var mockedBookStatus = mock(Status.class);
        when(mockedBookStatus.getType()).thenReturn(StatusType.BOOKED);
        when(statusService.getStatus(id)).thenReturn(mockedBookStatus);


        var mockedMapper = mock(ReservationMapper.class);
        when(mockedMapper.mapStatusToReservation(mockedBookStatus)).thenReturn(mock(ReservationInfo.class));
        reservationService.setReservationMapper(mockedMapper);

        var reservation = reservationService.getReservationInfo(id);
        Assert.assertTrue(reservation instanceof ReservationInfo);
        Assert.assertNotNull(reservation);
    }
}
