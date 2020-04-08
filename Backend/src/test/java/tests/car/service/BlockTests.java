package tests.car.service;

import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarRepository;
import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.exceptions.notFound.ResourceNotFoundException;
import com.tazi34.carservice.status.StatusService;
import com.tazi34.carservice.status.StatusType;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.Optional;

import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
public class BlockTests {
    @Mock
    StatusService statusService;

    @Mock
    CarRepository carRepository;

    @InjectMocks
    CarService carService;

    @Test(expected = ResourceNotFoundException.class)
    public void blockCar_givenNonExisting_throwResourceNotFound() {
        //GIVEN
        Long nonExistingId = 1L;

        //WHEN
        carService.blockCar(nonExistingId, mock(Date.class), mock(Date.class), "");

        //THEN
    }

    @Test
    public void blockCar_givenValidData_cancelReservations() {
        //GIVEN
        Long id = 1L;
        var startDate = mock(Date.class);
        var endDate = mock(Date.class);
        when(carRepository.findById(id)).thenReturn(Optional.of(mock(Car.class)));

        //WHEN
        carService.blockCar(id, startDate, endDate, "");

        //THEN
        verify(statusService, times(1)).cancelCollidingReservations(startDate, endDate, id);
    }

    @Test
    public void blockCar_givenValidData_saveUnavailableStatus() {
        //GIVEN
        Long id = 1L;
        var startDate = mock(Date.class);
        var endDate = mock(Date.class);

        when(carRepository.findById(id)).thenReturn(Optional.of(mock(Car.class)));
        when(statusService.saveStatus(any())).then(returnsFirstArg());

        //WHEN
        carService.blockCar(id, startDate, endDate, "");

        //THEN
        verify(statusService, times(1)).saveStatus(argThat(status -> status.getType() == StatusType.UNAVAILABLE));
    }


}
