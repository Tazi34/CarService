package com.tazi34.carservice.carReservation;

import java.util.Calendar;
import java.util.Date;

public class ReservationDateChecker {
    public boolean checkIfCorrectDate(Date from, Date to) {
        var minimalTimeBeforeBookingInMinutes = -100;
        Calendar cal = Calendar.getInstance();
        //todo change to constant value
        cal.add(Calendar.MINUTE, minimalTimeBeforeBookingInMinutes);
        Date lowerBoundaryForStartDate = cal.getTime();
        return !from.before(lowerBoundaryForStartDate) && !from.after(to);
    }
}
