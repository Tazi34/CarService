package tests.car.service;

import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarRepository;
import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.exceptions.badRequest.NullIdException;
import com.tazi34.carservice.exceptions.notFound.ResourceNotFoundException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class GetCarTests {
    @Mock
    CarRepository carRepository;

    @InjectMocks
    CarService carService;

    @Test(expected = ResourceNotFoundException.class)
    public void givenNonExistingId_throwResourceNotFoundException() {
        //GIVEN
        Long nonExistingId = 1L;

        //WHEN
        carService.getCar(nonExistingId);

        //THEN
    }

    @Test(expected = NullIdException.class)
    public void givenNullId_throwNullIdException() {
        //GIVEN
        Long id = null;

        //WHEN
        carService.getCar(id);

        //THEN
    }

    @Test
    public void givenExistingCar_returnCar() {
        //GIVEN
        Long id = 1L;
        Car car = mock(Car.class);
        when(carRepository.findById(id)).thenReturn(Optional.of(car));

        //WHEN
        Car resultCar = carService.getCar(id);

        //THEN
        Assert.assertEquals(car, resultCar);
        Assert.assertNotNull(resultCar);
    }
}
