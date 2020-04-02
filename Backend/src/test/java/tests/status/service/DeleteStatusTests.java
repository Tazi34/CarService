package tests.status.service;

import com.tazi34.carservice.exceptions.notFound.ResourceNotFoundException;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusRepository;
import com.tazi34.carservice.status.StatusService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
public class DeleteStatusTests {
    @Mock
    StatusRepository statusRepository;

    @InjectMocks
    StatusService statusService;

    @Test(expected = ResourceNotFoundException.class)
    public void givenNonExistingStatus_throw404(){
        //GIVEN
        long id = 1;
        Status mockedStatus = mock(Status.class);
        when(mockedStatus.getId()).thenReturn(id);
        when(statusRepository.existsById(id)).thenReturn(false);

        //WHEN
        statusService.deleteStatus(mockedStatus);

        //THEN
    }

    @Test
    public void givenExistingStatus_delete(){
        //GIVEN
        long id = 1;
        Status mockedStatus = mock(Status.class);
        when(mockedStatus.getId()).thenReturn(id);
        when(statusRepository.existsById(id)).thenReturn(true);

        //WHEN
        statusService.deleteStatus(mockedStatus);

        //THEN
        verify(statusRepository,times(1)).delete(mockedStatus);
    }
}
