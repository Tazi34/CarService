package com.tazi34.carservice.carReservation;

import com.tazi34.carservice.car.CarDTO;

import java.util.Date;

public class ReservationInfo {
    private final CarDTO carDTO;
    private final Date dateFrom;
    private final Date dateTo;

    public ReservationInfo(CarDTO carDTO, Date dateFrom, Date dateTo) {
        this.carDTO = carDTO;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }
}
