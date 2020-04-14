package com.tazi34.carservice.status;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import java.util.Date;

public class StatusDTO {
    @NotNull
    private Long carId;
    private Long clientInfoId;
    private String comment;

    @NotNull
    private Date dateFrom;

    @NotNull
    private Date dateTo;

    @Enumerated(EnumType.STRING)
    private StatusType type;

    public StatusDTO(@NotNull Long carId, Long clientInfoId, String comment, @NotNull Date dateFrom,
                     @NotNull Date dateTo, StatusType type) {
        this.carId = carId;
        this.clientInfoId = clientInfoId;
        this.comment = comment;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.type = type;
    }

    public StatusDTO() {
    }

    public Long getCarId() {
        return carId;
    }

    public Long getClientInfoId() {
        return clientInfoId;
    }

    public String getComment() {
        return comment;
    }

    public void setCarId(Long carId) {
        this.carId = carId;
    }

    public Date getDateFrom() {
        return dateFrom;
    }

    public Date getDateTo() {
        return dateTo;
    }

    public StatusType getType() {
        return type;
    }
}
