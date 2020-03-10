package com.tazi34.carservice.carReservation;

import com.tazi34.carservice.clientInfo.ClientInfoDTO;
import lombok.Value;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Value
public class CarReservation {
    @NotNull
    private long carId;
    @NotNull
    private long startSpotId;
    @NotNull
    private long endSpotId;

    @NotNull
    private ClientInfoDTO clientInfo;
    @NotNull
    private Date fromDate;
    @NotNull
    private Date toDate;
}

