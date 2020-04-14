package tests.reservations.service;

import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.carReservation.price.PriceCalculator;
import com.tazi34.carservice.exceptions.IncorrectDateSpanException;
import org.junit.Assert;
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
    PriceCalculator priceCalculator = new PriceCalculator();

    @Mock
    Date startDate;
    @Mock
    Date endDate;
    @Mock
    Car car;

    @Test(expected = IncorrectDateSpanException.class)
    public void givenStartDateGreaterThanEndDate_throwsException() {
        //GIVEN
        when(startDate.getTime()).thenReturn(2l);
        when(endDate.getTime()).thenReturn(1l);

        //WHEN
        priceCalculator.CalculateReservationPrice(car, startDate, endDate);

        //THEN
    }

    @Test(expected = IncorrectDateSpanException.class)
    public void givenStartEndDateWithSameDay_throwsException() {
        //GIVEN
        //both dates have same "DAY" for example 20 may 16:30 - 20 may 16:40
        when(startDate.getTime()).thenReturn(1l);
        when(endDate.getTime()).thenReturn(2l);

        //WHEN
        priceCalculator.CalculateReservationPrice(car, startDate, endDate);

        //THEN
    }

    @Test
    public void givenCarPriceAndDateSpan_returnsCorrectValue() {
        //GIVEN
        //both dates have same "DAY" for example 20 may 16:30 - 20 may 16:40
        var carPricePerDay = 100;
        var durationInDays = 3;
        var startTimeInMilliseconds = TimeUnit.MILLISECONDS.convert(1, TimeUnit.DAYS);
        var endTimeInMilliseconds = TimeUnit.MILLISECONDS.convert(1 + durationInDays, TimeUnit.DAYS);

        when(car.getPrice()).thenReturn(new BigDecimal(carPricePerDay));
        when(startDate.getTime()).thenReturn(startTimeInMilliseconds);
        when(endDate.getTime()).thenReturn(endTimeInMilliseconds);

        //WHEN
        var price = priceCalculator.CalculateReservationPrice(car, startDate, endDate);

        //THEN
        var expectedResult = new BigDecimal(durationInDays * carPricePerDay);
        Assert.assertEquals(price.compareTo(expectedResult), 0);
    }
}
