package com.tazi34.carservice.status;

import com.tazi34.carservice.clientInfo.ClientInfo;
import com.tazi34.carservice.car.Car;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import java.util.Date;

@StaticMetamodel(Status.class)
public class Status_ {
    public static volatile SingularAttribute<Status,Long> id;
    public static volatile SingularAttribute<Status, Car> car;
    public static volatile SingularAttribute<Status, Date> dateFrom;
    public static volatile SingularAttribute<Status, ClientInfo> clientInfo;
    public static volatile SingularAttribute<Status, Date> dateTo;
    public static volatile SingularAttribute<Status, StatusType> type;
    public static volatile SingularAttribute<Status,String> comment;
    public static volatile SingularAttribute<Status,Date> createdAt;


}
