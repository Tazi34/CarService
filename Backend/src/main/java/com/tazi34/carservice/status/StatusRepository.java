package com.tazi34.carservice.status;

import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.clientInfo.ClientInfo;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface StatusRepository extends PagingAndSortingRepository<Status, Long>, JpaSpecificationExecutor<Status> {
    List<Status> deleteAllByCar(Car car);

    List<Status> findByClientInfo(ClientInfo clientInfo);


}
