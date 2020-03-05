package com.tazi34.carservice.carReservation;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tazi34.carservice.car.CarDTO;
import com.tazi34.carservice.carlocation.spot.Spot;
import com.tazi34.carservice.clientInfo.ClientInfo;
import com.tazi34.carservice.clientInfo.ClientInfoDTO;

import java.util.Date;

public class ReservationInfo {
    public final long id;
    @JsonProperty("car")
    public final CarDTO carDTO;
    @JsonProperty("clientInfo")
    public final ClientInfoDTO clientInfoDTO;
    @JsonProperty("startDate")
    public final Date dateFrom;
    @JsonProperty("endDate")
    public final Date dateTo;

    public final Spot startSpot;
    public final Spot endSpot;

    public ReservationInfo(long id,CarDTO carDTO, Date dateFrom, Date dateTo,ClientInfoDTO clientInfoDTO,Spot startSpot,Spot endSpot) {
        this.id = id;
        this.startSpot = startSpot;
        this.endSpot = endSpot;
        this.carDTO = carDTO;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.clientInfoDTO = clientInfoDTO;
    }
}
