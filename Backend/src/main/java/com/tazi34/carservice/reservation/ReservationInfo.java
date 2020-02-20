package com.tazi34.carservice.reservation;

import com.tazi34.carservice.car.CarDTO;

import java.util.Date;

public class ReservationInfo {
    private CarDTO carDTO;
    private Date dateFrom;
    private Date dateTo;

    public ReservationInfo(CarDTO carDTO, Date dateFrom, Date dateTo) {
        this.carDTO = carDTO;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }

    public CarDTO getCarDTO() {
        return carDTO;
    }

    public Date getDateFrom() {
        return dateFrom;
    }

    public Date getDateTo() {
        return dateTo;
    }
}
