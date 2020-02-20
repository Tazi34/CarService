package com.tazi34.carservice.status;

import com.tazi34.carservice.bookingUserInfo.BookingUserInfo;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;
import com.tazi34.carservice.car.Car;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "status")
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne//(fetch=FetchType.LAZY,optional = false)
    private Car car;
    @ManyToOne(cascade = CascadeType.ALL)
    private BookingUserInfo bookingUserInfo;
    private String comment;
    @CreationTimestamp
    private Date createdAt;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date dateFrom;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date dateTo;

    @NotNull
    @Enumerated(EnumType.STRING)
    private StatusType type;



    public Status() {
    }

    public Status(@NotNull Car car, BookingUserInfo bookingUserInfo, String comment,@NotNull Date dateFrom, @NotNull Date dateTo, @NotNull StatusType type) {
        this.car = car;
        this.bookingUserInfo = bookingUserInfo;
        this.comment = comment;

        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.type = type;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public BookingUserInfo getBookingUserInfo() {
        return bookingUserInfo;
    }

    public void setBookingUserInfo(BookingUserInfo bookingUserInfo) {
        this.bookingUserInfo = bookingUserInfo;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public StatusType getType() {
        return type;
    }

    public void setType(StatusType type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(Date dateFrom) {
        this.dateFrom = dateFrom;
    }

    public Date getDateTo() {
        return dateTo;
    }

    public void setDateTo(Date dateTo) {
        this.dateTo = dateTo;
    }
    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

}
