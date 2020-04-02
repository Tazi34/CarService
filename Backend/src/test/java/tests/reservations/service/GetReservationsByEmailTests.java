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
import org.mockito.Mockito;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.instanceOf;


@RunWith(SpringJUnit4ClassRunner.class)
public class GetReservationsByEmailTests {
    @Mock
    StatusService statusService;
    @Mock
    ClientInfoService clientInfoService;
    @InjectMocks
    ReservationService reservationService;

    @Test
    public void givenNonExistingEmail_returnEmptyList() {
        //GIVEN
        String email = "nonexisitingclientinfo@email.com";
        Mockito.when(clientInfoService.getClientInfoByEmail(email)).thenThrow(ResourceNotFoundException.class);

        //WHEN
        var reservations = reservationService.getUserReservationsByEmail(email);

        //THEN
        Assert.assertTrue(reservations.isEmpty());
    }

    @Test
    public void givenProperEmail_returnList() {
        //GIVEN
        String email = "nonexisitingclientinfo@email.com";
        var clientInfo = Mockito.mock(ClientInfo.class);
        var list = new ArrayList<Status>();
        Mockito.when(clientInfoService.getClientInfoByEmail(email)).thenReturn(clientInfo);
        Mockito.when(statusService.getClientsStatuses(clientInfo)).thenReturn(list);

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

        //WHEN
        var clientInfo = Mockito.mock(ClientInfo.class);
        Mockito.when(clientInfoService.getClientInfoByEmail(email)).thenReturn(clientInfo);
        Mockito.when(statusService.getClientsStatuses(clientInfo)).thenReturn(list);

        var foundReservations = reservationService.getUserReservationsByEmail(email);

        //THEN
        Assert.assertEquals(foundReservations.size(), 0);
    }

    @Test
    public void givenNonEmptyStatusList_returnsList() {
        //GIVEN
        String email = "nonexisitingclientinfo@email.com";
        var clientInfo = Mockito.mock(ClientInfo.class);
        var statusNumber = 3;


        var mockedMapper = Mockito.mock(ReservationMapper.class);
        reservationService.setReservationMapper(mockedMapper);

        var list = new ArrayList<Status>();
        for (int i = 0; i < statusNumber; i++) {
            var mockedStatus = Mockito.mock(Status.class);
            var mockedReservationInfo = Mockito.mock(ReservationInfo.class);
            Mockito.when(mockedMapper.mapStatusToReservation(mockedStatus)).thenReturn(mockedReservationInfo);
            list.add(mockedStatus);
        }

        Mockito.when(clientInfoService.getClientInfoByEmail(email)).thenReturn(clientInfo);
        Mockito.when(statusService.getClientsStatuses(clientInfo)).thenReturn(list);

        //WHEN
        var foundReservations = reservationService.getUserReservationsByEmail(email);

        //THEN
        Assert.assertEquals(statusNumber, foundReservations.size());
    }

}
