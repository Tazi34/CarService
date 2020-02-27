package com.tazi34.carservice.reservation;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tazi34.carservice.clientInfo.ClientInfoDTO;
import lombok.Value;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Value
public class ReservationData {
    @NotNull
    private long carId;
    @NotNull
    private long startSpotId;
    @NotNull
    private long endSpotId;
    @JsonProperty("clientInfo")
    @NotNull
    private ClientInfoDTO clientInfoDTO;
    @NotNull
    private Date fromDate;
    @NotNull
    private Date toDate;
}

