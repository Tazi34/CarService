package tests.status.service;

import com.tazi34.carservice.clientInfo.ClientInfo;
import com.tazi34.carservice.status.StatusRepository;
import com.tazi34.carservice.status.StatusService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
public class GetClientsStatusesTests {
    @Mock
    StatusRepository statusRepository;

    @InjectMocks
    StatusService statusService;

    @Test
    public void givenValidClientInfo_callsRepository() {
        //GIVEN
        var clientInfo = mock(ClientInfo.class);
        //WHEN
        statusService.getClientsStatuses(clientInfo);

        //THEN
        verify(statusRepository, times(1)).findByClientInfo(any(), any());
    }
}
