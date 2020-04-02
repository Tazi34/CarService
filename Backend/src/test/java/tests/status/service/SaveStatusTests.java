package tests.status.service;

import com.tazi34.carservice.exceptions.BadRequestException;
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
public class SaveStatusTests {
    @Mock
    StatusRepository statusRepository;

    @InjectMocks
    StatusService statusService;

    @Test
    public void givenNullStatus_save() {
        //GIVEN
        Status mockedStatus = mock(Status.class);
        when(mockedStatus.getId()).thenReturn(null);

        //WHEN
        statusService.saveStatus(mockedStatus);

        //THEN
        verify(statusRepository, times(1)).save(mockedStatus);
    }

    @Test(expected = BadRequestException.class)
    public void givenExistingStatus_throwBadRequest() {
        //GIVEN
        long id = 1;
        Status mockedStatus = mock(Status.class);
        when(mockedStatus.getId()).thenReturn(id);
        when(statusRepository.existsById(id)).thenReturn(true);

        //WHEN
        statusService.saveStatus(mockedStatus);

        //THEN
    }

    @Test
    public void givenNonExistingId_save() {
        //GIVEN
        long id = 1;
        Status mockedStatus = mock(Status.class);
        when(mockedStatus.getId()).thenReturn(id);
        when(statusRepository.existsById(id)).thenReturn(false);

        //WHEN
        statusService.saveStatus(mockedStatus);

        //THEN
        verify(statusRepository, times(1)).save(mockedStatus);
    }
}
