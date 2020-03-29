package tests.car.service;

import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class CheckIfAvailableTests {

    @Mock
    StatusRepository statusRepository;

    @Mock
    Car car;

    @InjectMocks
    CarService carService;

    @Test
    public void givenEmptyStatusList_returnTrue() {
        //GIVEN
        Date from = mock(Date.class);
        Date to = mock(Date.class);
        when(statusRepository.findAll(ArgumentMatchers.<Specification<Status>>any())).thenReturn(new ArrayList<>());

        //WHEN
        boolean isAvailable = carService.checkIfAvailable(car, from, to);

        //THEN
        Assert.assertTrue(isAvailable);
    }

    @Test
    public void givenNotEmptyStatusList_returnFalse() {
        //GIVEN
        Date from = mock(Date.class);
        Date to = mock(Date.class);

        var statusList = List.of(mock(Status.class));
        when(statusRepository.findAll(ArgumentMatchers.<Specification<Status>>any())).thenReturn(statusList);

        //WHEN
        boolean isAvailable = carService.checkIfAvailable(car, from, to);

        //THEN
        Assert.assertFalse(isAvailable);
    }
}
