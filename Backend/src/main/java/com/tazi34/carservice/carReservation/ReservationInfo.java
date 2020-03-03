package com.tazi34.carservice.carReservation;

import com.tazi34.carservice.car.CarDTO;
import com.tazi34.carservice.clientInfo.ClientInfo;
import com.tazi34.carservice.clientInfo.ClientInfoDTO;

import java.util.Date;

public class ReservationInfo {
    public final CarDTO carDTO;
    public final ClientInfoDTO clientInfoDTO;
    public final Date dateFrom;
    public final Date dateTo;

    public ReservationInfo(CarDTO carDTO, Date dateFrom, Date dateTo,ClientInfoDTO clientInfoDTO) {
        this.carDTO = carDTO;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.clientInfoDTO = clientInfoDTO;
    }
}
