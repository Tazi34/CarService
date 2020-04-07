package com.tazi34.carservice.car;


import com.tazi34.carservice.exceptions.IncorrectDateSpanException;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Component
public class CarAvailabilityChecker {

    private StatusService statusService;

    @Autowired
    public CarAvailabilityChecker(StatusService statusService) {
        this.statusService = statusService;
    }

    public boolean check(Car car, Date start, Date end) {
        if (start.after(end)) {
            throw new IncorrectDateSpanException("Start date after end date");
        }
        List<Status> statuses = statusService.findCarsAvailabilityStatuses(car, start, end);
        return statuses.isEmpty();
    }

    public boolean check(Car car) {
        Calendar cal = Calendar.getInstance();
        var currentTime = cal.getTime();
        cal.add(1, Calendar.HOUR);
        var endDateOneHourLater = cal.getTime();
        return check(car, currentTime, endDateOneHourLater);
    }
}
