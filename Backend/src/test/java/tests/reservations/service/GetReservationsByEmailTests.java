package tests.reservations.service;

import com.tazi34.carservice.carReservation.ReservationInfo;
import com.tazi34.carservice.carReservation.ReservationMapper;
import com.tazi34.carservice.carReservation.ReservationService;
import com.tazi34.carservice.clientInfo.ClientInfo;
import com.tazi34.carservice.clientInfo.ClientInfoService;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusService;
import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.instanceOf;
import static org.mockito.Mockito.doReturn;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class GetReservationsByEmailTests {

    @Rule
    public final ExpectedException expectedException = ExpectedException.none();

    @Configuration
    static class ClientInfoServiceTestContextConfiguration {

        @Bean
        public StatusService statusService() {
            return Mockito.mock(StatusService.class);
        }

        @Bean
        ClientInfoService clientInfoService() {
            return Mockito.mock(ClientInfoService.class);
        }

        @Bean
        ReservationService reservationService() {
            return new ReservationService(statusService(), clientInfoService());
        }
    }

    @Autowired
    StatusService statusService;
    @Autowired
    ClientInfoService clientInfoService;
    @Autowired
    ReservationService reservationService;

    @Test
    public void givenNonExistingEmail_throwNotFound() {
        //GIVEN
        String email = "nonexisitingclientinfo@email.com";
        Mockito.when(clientInfoService.getClientInfoByEmail(email)).thenReturn(null);
        expectedException.expect(ResourceNotFoundException.class);
        reservationService.getUserReservationsByEmail(email);
    }

    @Test
    public void givenProperEmail_returnList() {
        //GIVEN
        String email = "nonexisitingclientinfo@email.com";
        var clientInfo = Mockito.mock(ClientInfo.class);
        var list = new ArrayList<Status>();
        Mockito.when(clientInfoService.getClientInfoByEmail(email)).thenReturn(clientInfo);
        Mockito.when(statusService.getClientsStatuses(clientInfo)).thenReturn(list);


        var foundStatuses = reservationService.getUserReservationsByEmail(email);
        Assert.assertThat(foundStatuses, instanceOf(List.class));
    }

    @Test
    public void givenEmptyStatusList_returnsEmptyList() {
        //GIVEN
        String email = "nonexisitingclientinfo@email.com";
        var list = new ArrayList<Status>();
        //when

        var clientInfo = Mockito.mock(ClientInfo.class);
        Mockito.when(clientInfoService.getClientInfoByEmail(email)).thenReturn(clientInfo);
        Mockito.when(statusService.getClientsStatuses(clientInfo)).thenReturn(list);

        var foundReservations = reservationService.getUserReservationsByEmail(email);

        //then
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

        //when
        Mockito.when(clientInfoService.getClientInfoByEmail(email)).thenReturn(clientInfo);
        Mockito.when(statusService.getClientsStatuses(clientInfo)).thenReturn(list);

        var foundReservations = reservationService.getUserReservationsByEmail(email);
        Assert.assertEquals(statusNumber,foundReservations.size());
    }

}
