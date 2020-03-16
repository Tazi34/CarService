package tests.reservations.service;

import com.tazi34.carservice.Exceptions.IncorrectDateSpanException;
import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.carReservation.price.PriceCalculator;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigDecimal;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class PriceCalculatorTests {

    PriceCalculator priceCalculator;

    @Mock
    Date startDate;
    @Mock
    Date endDate;
    @Mock
    Car car;

    @Before
    public void init() {
        priceCalculator = new PriceCalculator();
    }

    @Test(expected = IncorrectDateSpanException.class)
    public void givenStartDateGreaterThanEndDate_throwsException() {
        when(startDate.getTime()).thenReturn(2l);
        when(endDate.getTime()).thenReturn(1l);

        priceCalculator.CalculateReservationPrice(car, startDate, endDate);
    }

    @Test(expected = IncorrectDateSpanException.class)
    public void givenStartEndDateWithSameDay_throwsException() {

        //both dates have same "DAY" for example 20 may 16:30 - 20 may 16:40
        when(startDate.getTime()).thenReturn(1l);
        when(endDate.getTime()).thenReturn(2l);

        priceCalculator.CalculateReservationPrice(car, startDate, endDate);
    }

    @Test
    public void givenCarPriceAndDateSpan_returnsCorrectValue() {

        //both dates have same "DAY" for example 20 may 16:30 - 20 may 16:40
        var carPricePerDay = 100;
        var durationInDays = 3;
        var startTimeInMilliseconds = TimeUnit.MILLISECONDS.convert(1, TimeUnit.DAYS);
        var endTimeInMilliseconds = TimeUnit.MILLISECONDS.convert(1 + durationInDays, TimeUnit.DAYS);

        when(car.getPrice()).thenReturn(new BigDecimal(carPricePerDay));
        when(startDate.getTime()).thenReturn(startTimeInMilliseconds);
        when(endDate.getTime()).thenReturn(endTimeInMilliseconds);

        var price = priceCalculator.CalculateReservationPrice(car, startDate, endDate);
        var expectedResult = new BigDecimal(durationInDays * carPricePerDay);
        Assert.assertEquals(price.compareTo(expectedResult), 0);
    }
}
