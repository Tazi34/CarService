package tests.car.service;

import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarRepository;
import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.exceptions.badRequest.NullIdException;
import com.tazi34.carservice.exceptions.notFound.ResourceNotFoundException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
public class DeleteCarTests {
    @Mock
    CarRepository carRepository;

    @InjectMocks
    CarService carService;

    @Test(expected = ResourceNotFoundException.class)
    public void givenNonExistingId_throwResourceNotFoundException() {
        //GIVEN
        Long nonExistingId = 1L;

        //WHEN
        carService.deleteCar(nonExistingId);

        //THEN
    }

    @Test(expected = NullIdException.class)
    public void givenNullId_throwNullIdException() {
        //GIVEN
        Long nullId = null;

        //WHEN
        carService.deleteCar(nullId);

        //THEN
    }

    @Test
    public void givenValidId_saveInactiveCar() {
        //GIVEN
        Long id = 1L;
        when(carRepository.findById(id)).thenReturn(Optional.of(mock(Car.class)));

        //WHEN
        carService.deleteCar(id);

        //THEN
        verify(carRepository, times(1)).save(argThat(car -> !car.isActive()));
    }
}
