package tests.car.availabilityChecker;

import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarAvailabilityChecker;
import com.tazi34.carservice.exceptions.IncorrectDateSpanException;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import static java.util.Calendar.HOUR;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class CheckTests {
    @Mock
    StatusService statusService;

    @InjectMocks
    CarAvailabilityChecker availabilityChecker;

    @Test(expected = IncorrectDateSpanException.class)
    public void check_givenEndDateGreaterThanStartDate_throwIncorrectDateSpanException() {
        //GIVEN
        Calendar calendar = Calendar.getInstance();
        var start = calendar.getTime();
        calendar.add(HOUR, -1);
        var end = calendar.getTime();

        //WHEN
        availabilityChecker.check(mock(Car.class), start, end);

        //THEN
    }

    @Test
    public void check_givenEmptyStatuses_returnTrue() {
        //GIVEN
        Calendar calendar = Calendar.getInstance();
        var car = mock(Car.class);
        var start = calendar.getTime();
        calendar.add(HOUR, 1);
        var end = calendar.getTime();
        when(statusService.findCarsAvailabilityStatuses(car, start, end)).thenReturn(new ArrayList<Status>());

        //WHEN
        boolean available = availabilityChecker.check(car, start, end);

        //THEN
        Assert.assertTrue(available);
    }

    @Test
    public void check_givenNonEmptyStatuses_returnFalse() {
        //GIVEN
        Calendar calendar = Calendar.getInstance();
        var car = mock(Car.class);
        var start = calendar.getTime();
        calendar.add(HOUR, 1);
        var end = calendar.getTime();
        when(statusService.findCarsAvailabilityStatuses(car, start, end)).thenReturn(List.of(mock(Status.class)));

        //WHEN
        boolean available = availabilityChecker.check(car, start, end);

        //THEN
        Assert.assertFalse(available);
    }
}
