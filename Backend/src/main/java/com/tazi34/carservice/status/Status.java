package com.tazi34.carservice.status;

import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.carlocation.spot.Spot;
import com.tazi34.carservice.clientInfo.ClientInfo;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
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
    @ManyToOne
    private ClientInfo clientInfo;
    private String comment;
    @CreationTimestamp
    private Date createdAt;

    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal priceTotal;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date dateFrom;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date dateTo;

    @NotNull
    @Enumerated(EnumType.STRING)
    private StatusType type;

    @ManyToOne
    private Spot startSpot;
    @ManyToOne
    private Spot endSpot;

    public Status(@NotNull Car car, ClientInfo clientInfo, String comment, @NotNull Date dateFrom, @NotNull Date dateTo, @NotNull StatusType type, Spot startSpot, Spot endSpot, BigDecimal priceTotal) {
        this.car = car;
        this.clientInfo = clientInfo;
        this.comment = comment;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.type = type;
        this.startSpot = startSpot;
        this.endSpot = endSpot;
        this.priceTotal = priceTotal;
    }

    public Status() {

    }


}
