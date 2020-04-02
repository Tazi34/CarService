package tests.status.service;

import com.tazi34.carservice.exceptions.notFound.ResourceNotFoundException;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusRepository;
import com.tazi34.carservice.status.StatusService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
public class GetStatusTests {
    @Mock
    StatusRepository statusRepository;

    @InjectMocks
    StatusService statusService;

    @Test(expected = ResourceNotFoundException.class)
    public void givenNonExistingStatus_throw404(){
        //GIVEN
        //mock returns optional by default, added for readability
        when(statusRepository.findById(any())).thenReturn(Optional.empty());
        //WHEN
        statusService.getStatus(1l);

        //THEN
    }

    @Test
    public void givenExistingStatus_returnStatus(){
        //GIVEN
        long id = 1;
        Status mockedStatus = mock(Status.class);
        when(mockedStatus.getId()).thenReturn(id);
        when(statusRepository.findById(id)).thenReturn(Optional.of(mockedStatus));

        //WHEN
        var resultStatus = statusService.getStatus(id);

        //THEN
        Assert.assertEquals(mockedStatus,resultStatus);
        Assert.assertEquals(id,(long) resultStatus.getId());
    }
}
