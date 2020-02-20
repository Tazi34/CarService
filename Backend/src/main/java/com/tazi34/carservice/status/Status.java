package com.tazi34.carservice.status;

import com.tazi34.carservice.bookingUserInfo.BookingUserInfo;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;
import com.tazi34.carservice.car.Car;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
@Data
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




}
