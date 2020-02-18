package pw.react.carly.status;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import java.util.Date;

public class StatusDTO {
    @NotNull
    private Long carId;
    private Long bookingUserInfoId;
    private String comment;

    @NotNull
    private Date dateFrom;

    @NotNull
    private Date dateTo;


    @Enumerated(EnumType.STRING)
    private StatusType type;

    public StatusDTO(@NotNull Long carId, Long bookingUserInfoId, String comment, @NotNull Date dateFrom, @NotNull Date dateTo, StatusType type) {
        this.carId = carId;
        this.bookingUserInfoId = bookingUserInfoId;
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

    public Long getBookingUserInfoId() {
        return bookingUserInfoId;
    }

    public String getComment() {
        return comment;
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
