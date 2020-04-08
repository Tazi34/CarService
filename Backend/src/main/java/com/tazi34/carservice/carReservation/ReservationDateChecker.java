package com.tazi34.carservice.carReservation;

import java.util.Date;

public class ReservationDateChecker {
    public boolean checkIfCorrectDate(Date from, Date to) {
        return  !from.after(to);
    }
}
