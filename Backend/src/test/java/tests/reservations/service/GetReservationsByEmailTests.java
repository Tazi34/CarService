package tests.reservations.service;

import com.tazi34.carservice.carReservation.ReservationInfo;
import com.tazi34.carservice.carReservation.ReservationMapper;
import com.tazi34.carservice.carReservation.ReservationService;
import com.tazi34.carservice.clientInfo.ClientInfo;
import com.tazi34.carservice.clientInfo.ClientInfoService;
import com.tazi34.carservice.exceptions.notFound.ResourceNotFoundException;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.instanceOf;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


@RunWith(SpringRunner.class)
public class GetReservationsByEmailTests {
    @Mock
    StatusService statusService;
    @Mock
    ClientInfoService clientInfoService;
    @Mock
    ReservationMapper reservationMapper;
    @InjectMocks
    ReservationService reservationService;

    @Test
    public void givenNonExistingEmail_returnEmptyList() {
        //GIVEN
        String email = "nonexisitingclientinfo@email.com";
        when(clientInfoService.getClientInfoByEmail(email)).thenThrow(ResourceNotFoundException.class);

        //WHEN
        var reservations = reservationService.getUserReservationsByEmail(email);

        //THEN
        Assert.assertTrue(reservations.isEmpty());
    }

    @Test
    public void givenProperEmail_returnList() {
        //GIVEN
        String email = "nonexisitingclientinfo@email.com";
        var clientInfo = mock(ClientInfo.class);
        var list = new ArrayList<Status>();

        when(clientInfoService.getClientInfoByEmail(email)).thenReturn(clientInfo);
        when(statusService.getClientsStatuses(clientInfo)).thenReturn(list);

        //WHEN
        var foundStatuses = reservationService.getUserReservationsByEmail(email);

        //THEN
        Assert.assertThat(foundStatuses, instanceOf(List.class));
    }

    @Test
    public void givenEmptyStatusList_returnsEmptyList() {
        //GIVEN
        String email = "nonexisitingclientinfo@email.com";
        var list = new ArrayList<Status>();

        var clientInfo = mock(ClientInfo.class);

        when(clientInfoService.getClientInfoByEmail(email)).thenReturn(clientInfo);
        when(statusService.getClientsStatuses(clientInfo)).thenReturn(list);

        //WHEN
        var foundReservations = reservationService.getUserReservationsByEmail(email);

        //THEN
        Assert.assertEquals(foundReservations.size(), 0);
    }

    @Test
    public void givenNonEmptyStatusList_returnsList() {
        //GIVEN
        String email = "nonexisitingclientinfo@email.com";
        var clientInfo = mock(ClientInfo.class);

        var statusesList = List.of(mock(Status.class), mock(Status.class), mock(Status.class));
        var reservationInfoList = List.of(mock(ReservationInfo.class), mock(ReservationInfo.class),
                mock(ReservationInfo.class));

        when(clientInfoService.getClientInfoByEmail(email)).thenReturn(clientInfo);
        when(statusService.getClientsStatuses(clientInfo)).thenReturn(statusesList);
        when(reservationMapper.map(statusesList)).thenReturn(reservationInfoList);

        //WHEN
        var foundReservations = reservationService.getUserReservationsByEmail(email);

        //THEN
        Assert.assertEquals(statusesList.size(), foundReservations.size());
    }

}
