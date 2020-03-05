package com.tazi34.carservice.carReservation;

import java.util.Calendar;
import java.util.Date;

public class ReservationDateChecker {
    public boolean checkIfCorrectDate(Date from, Date to) {
        var minimalTimeBeforeBookingInMinutes = 120;
        Calendar cal = Calendar.getInstance();
        //todo change to constant value
        cal.add(Calendar.MINUTE, minimalTimeBeforeBookingInMinutes);
        Date lowerBoundaryForStartDate = cal.getTime();
        if (from.before(lowerBoundaryForStartDate) || from.after(to)) {
            return false;
        }
        return true;
    }
}
