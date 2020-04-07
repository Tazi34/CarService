package tests.car.service;

import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarDTO;
import com.tazi34.carservice.car.CarRepository;
import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.exceptions.BadRequestException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
public class AddCarTests {
    @Mock
    CarRepository carRepository;

    @Mock
    ModelMapper modelMapper;

    @InjectMocks
    CarService carService;

    @Test(expected = BadRequestException.class)
    public void addCar_givenCarWithId_throwBadRequest() {
        //GIVEN
        long id = 1l;
        var car = mock(CarDTO.class);
        when(car.getId()).thenReturn(id);

        //WHEN
        carService.addCar(car);

        //THEN
    }

    @Test
    public void addCar_givenCar_save() {
        //GIVEN
        Long id = null;
        var carDTO = mock(CarDTO.class);
        when(carDTO.getId()).thenReturn(id);

        when(modelMapper.map(carDTO, Car.class)).thenReturn(mock(Car.class));
        when(carRepository.save(any())).thenReturn(mock(Car.class));

        //WHEN
        var car = carService.addCar(carDTO);

        //THEN
        Assert.assertNotNull(car);
    }
}
