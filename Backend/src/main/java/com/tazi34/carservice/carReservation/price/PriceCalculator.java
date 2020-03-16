package com.tazi34.carservice.carReservation.price;

import com.tazi34.carservice.Exceptions.IncorrectDateSpanException;
import com.tazi34.carservice.car.Car;

import java.math.BigDecimal;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class PriceCalculator {
    public BigDecimal CalculateReservationPrice(Car car, Date startDate, Date endDate) {
        var durationInMs = endDate.getTime() - startDate.getTime();
        if (durationInMs <= 0)
            throw new IncorrectDateSpanException("Reservation start date is greater or equal to end date.");
        var durationInDays = TimeUnit.DAYS.convert(durationInMs, TimeUnit.MILLISECONDS);
        if (durationInDays < 1) throw new IncorrectDateSpanException("Start date and end date both have the same DAY.");
        var price = car.getPrice().multiply(BigDecimal.valueOf(durationInDays));
        return price;
    }
}
